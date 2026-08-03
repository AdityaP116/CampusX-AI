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
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: env.FIREBASE_PROJECT_ID,
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
        privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
      storageBucket: env.FIREBASE_STORAGE_BUCKET,
    });
    logger.info("Firebase Admin initialized with explicit service account credentials.");
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
