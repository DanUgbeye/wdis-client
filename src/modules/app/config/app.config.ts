import getConfig from "next/config";
import { AppConfig } from "./app.config.types";
import appUtils from "@/modules/app/utils";

function initializeAppConfig(): Readonly<AppConfig> {
  const { publicRuntimeConfig } = getConfig();

  return Object.freeze({
    CLIENT_BASE_URL: appUtils.getBaseUrl(),
    API_BASE_URL: publicRuntimeConfig.API_BASEURL as string,
  });
}

const APP_CONFIG = initializeAppConfig();

export default APP_CONFIG;
