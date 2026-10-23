import { handleContactOptions, handleContactPost } from "../../../lib/contact/server";
import type { ContactHandlerEnv } from "../../../lib/contact/server";

type PagesContext = {
  request: Request;
  env: ContactHandlerEnv & Record<string, string | undefined>;
};

export const onRequestPost = async (context: PagesContext): Promise<Response> => {
  return handleContactPost(context.request, context.env);
};

export const onRequestOptions = async (context: PagesContext): Promise<Response> => {
  return handleContactOptions(context.request, context.env);
};
