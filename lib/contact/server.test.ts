import assert from "node:assert/strict";
import { test, afterEach } from "node:test";
import { handleContactPost } from "./server";

const originalFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = originalFetch; });
const env = { WEB3FORMS_ACCESS_KEY: "test-server-key" };
function request(fields: Record<string, string> = {}, origin = "https://urcrobotics.com") {
  const form = new FormData();
  for (const [key, value] of Object.entries({ name: "Test User", email: "test@example.com", message: "Enquiry test", "h-captcha-response": "test-token", ...fields })) form.set(key, value);
  return new Request("https://urcrobotics.com/api/v1/contact", { method: "POST", headers: { Origin: origin }, body: form });
}
function noUpstream() { globalThis.fetch = async () => { throw new Error("Unexpected upstream request"); }; }

test("requires a configured key and returns JSON", async () => {
  const res = await handleContactPost(request(), {});
  assert.equal(res.status, 503);
  assert.equal((await res.json()).error, "not_configured");
});
test("rejects foreign origins, missing CAPTCHA and honeypot submissions before delivery", async () => {
  noUpstream();
  for (const [req, status, error] of [
    [request({}, "https://untrusted.example"), 403, "forbidden"],
    [request({ "h-captcha-response": "" }), 400, "captcha"],
    [request({ botcheck: "bot" }), 400, "spam"],
    [request({ email: "invalid" }), 400, "validation"],
  ] as const) {
    const res = await handleContactPost(req, env);
    assert.equal(res.status, status);
    assert.equal((await res.json()).error, error);
  }
});
test("caps streamed bodies without relying on Content-Length", async () => {
  noUpstream();
  const oversized = new Request("https://urcrobotics.com/api/v1/contact", {
    method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "message=" + "x".repeat(40000),
  });
  const res = await handleContactPost(oversized, env);
  assert.equal(res.status, 413);
});
test("forwards CAPTCHA and the server key, but never returns credentials", async () => {
  globalThis.fetch = async (url, init) => {
    assert.equal(url, "https://api.web3forms.com/submit");
    const data = init?.body as FormData;
    assert.equal(data.get("access_key"), env.WEB3FORMS_ACCESS_KEY);
    assert.equal(data.get("h-captcha-response"), "test-token");
    assert.equal(data.get("email"), "test@example.com");
    return Response.json({ success: true });
  };
  const res = await handleContactPost(request(), env);
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("Cache-Control"), "no-store");
  assert.deepEqual(await res.json(), { apiVersion: "1", ok: true, message: "Sent." });
});
test("fails closed for CAPTCHA rejection, malformed upstream data, and outages", async () => {
  for (const response of [{ success: false }, {}, "not-json"]) {
    globalThis.fetch = async () => typeof response === "string" ? new Response(response) : Response.json(response);
    const res = await handleContactPost(request(), env);
    assert.equal(res.status, 502);
    assert.equal((await res.json()).ok, false);
  }
  globalThis.fetch = async () => { throw new Error("offline"); };
  assert.equal((await handleContactPost(request(), env)).status, 502);
});
test("Redis outages fail closed with JSON", async () => {
  globalThis.fetch = async () => Response.json({ error: "invalid token" }, { status: 401 });
  const res = await handleContactPost(request(), { ...env, UPSTASH_REDIS_REST_URL: "https://redis.example", UPSTASH_REDIS_REST_TOKEN: "test" });
  assert.equal(res.status, 503);
  assert.equal((await res.json()).error, "unavailable");
});
