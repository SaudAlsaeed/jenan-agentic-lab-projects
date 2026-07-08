/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_PHONE_DISPLAY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
