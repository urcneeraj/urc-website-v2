// Keep existing browser/search-engine favicon requests on the URC brand asset.
export function GET() {
  return new Response(null, {
    status: 308,
    headers: { Location: "/assets/urc-brand-logo.png" },
  });
}
