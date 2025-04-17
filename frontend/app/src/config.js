const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}api`;
const AUTH_TOKEN_KEY = import.meta.env.VITE_AUTH_TOKEN_KEY || "token";
const APP_NAME = import.meta.env.VITE_APP_NAME || "Neighborrow";
const DEFAULT_LANGUAGE = import.meta.env.VITE_DEFAULT_LANGUAGE || "fr";
const DEBUG_MODE = import.meta.env.VITE_DEBUG_MODE === "true";
const IMAGE_MAX_SIZE = parseInt(import.meta.env.VITE_IMAGE_MAX_SIZE, 10) || 5000000;
const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT || "development";
const LOG_LEVEL = import.meta.env.VITE_LOG_LEVEL || "info";

export {
  API_BASE_URL,
  AUTH_TOKEN_KEY,
  APP_NAME,
  DEFAULT_LANGUAGE,
  DEBUG_MODE,
  IMAGE_MAX_SIZE,
  ENVIRONMENT,
  LOG_LEVEL
};
