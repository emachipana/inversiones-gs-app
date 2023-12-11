const API_BASE_URI = import.meta.env.VITE_API_BASE_URI;
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
const RENIEC_TOKEN = import.meta.env.VITE_RENIEC_TOKEN;
const RENIEC_BASE_URI = import.meta.env.VITE_RENIEC_BASE_URI;

const FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

export { API_BASE_URI, TOKEN_KEY, RENIEC_TOKEN, RENIEC_BASE_URI, FIREBASE_CONFIG };
