import * as admin from "firebase-admin";
import { env } from "./env.config";
import { logger } from "../utils/logger";

let firebaseApp: admin.app.App;

if (admin.apps.length === 0) {
  if (
    env.FIREBASE_PROJECT_ID &&
    env.FIREBASE_CLIENT_EMAIL &&
    env.FIREBASE_PRIVATE_KEY
  ) {
    try {
      // Normalize private key formatting: handle literal \n and quotes if entered in Render web UI
      let formattedKey = env.FIREBASE_PRIVATE_KEY.trim();
      if (
        (formattedKey.startsWith('"') && formattedKey.endsWith('"')) ||
        (formattedKey.startsWith("'") && formattedKey.endsWith("'"))
      ) {
        formattedKey = formattedKey.slice(1, -1);
      }
      formattedKey = formattedKey.replace(/\\n/g, "\n");

      firebaseApp = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: env.FIREBASE_PROJECT_ID,
          clientEmail: env.FIREBASE_CLIENT_EMAIL,
          privateKey: formattedKey,
        }),
        storageBucket: env.FIREBASE_STORAGE_BUCKET,
      });
      logger.info("Firebase Admin initialized with explicit service account credentials.");
    } catch (certError: unknown) {
      logger.error(`Failed to initialize Firebase Admin with service account: ${(certError as Error).message}`);
      firebaseApp = admin.initializeApp({
        projectId: env.FIREBASE_PROJECT_ID || "campusx-ai",
        storageBucket: env.FIREBASE_STORAGE_BUCKET || "campusx-ai.appspot.com",
      });
      logger.warn("Fell back to default Firebase Admin credentials after certificate error.");
    }
  } else {
    // Application Default Credentials or Emulator mode
    firebaseApp = admin.initializeApp({
      projectId: env.FIREBASE_PROJECT_ID || "campusx-ai",
      storageBucket: env.FIREBASE_STORAGE_BUCKET || "campusx-ai.appspot.com",
    });
    logger.info("Firebase Admin initialized with default credentials/project ID.");
  }
} else {
  firebaseApp = admin.app();
}

export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const storage = firebaseApp.storage();

export default firebaseApp;
