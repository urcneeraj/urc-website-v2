import { mediaUrl } from "./media";

/**
 * Multiple MP4 sources — browser picks the first it can decode.
 * Primary: H.264 export from your Serving_bot 360.avi; then legacy files.
 */
export function servingRobotVideoSources(): readonly string[] {
  return [
    mediaUrl("/assets/serving-bot-360-main.mp4"),
    mediaUrl("/assets/Serving-bot-360.mp4"),
    mediaUrl("/assets/serving-bot-demo.mp4"),
  ];
}

/** "Serving Robot in Action" section — from Serving_bot.avi export + fallbacks. */
export function servingInActionVideoSources(): readonly string[] {
  return [
    mediaUrl("/assets/serving-in-action.mp4"),
    mediaUrl("/assets/serving-bot-demo.mp4"),
    mediaUrl("/assets/serving-bot-360-main.mp4"),
  ];
}
