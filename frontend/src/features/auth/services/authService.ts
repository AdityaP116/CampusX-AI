import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  type UserCredential,
} from "firebase/auth"
import { auth } from "@/lib/firebase"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1"

function setAuthCookie() {
  document.cookie = "campusx-authed=1; path=/; max-age=2592000; SameSite=Lax"
}

function clearAuthCookie() {
  document.cookie = "campusx-authed=; path=/; max-age=0"
}

export async function syncUserWithBackend(credential: UserCredential): Promise<{ exists: boolean }> {
  const token = await credential.user.getIdToken()
  const res = await fetch(`${BACKEND_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return { exists: res.ok }
}

export async function loginWithEmail(
  email: string,
  password: string
): Promise<UserCredential> {
  const credential = await signInWithEmailAndPassword(auth, email, password)
  setAuthCookie()
  return credential
}

export async function registerWithEmail(
  name: string,
  email: string,
  password: string
): Promise<UserCredential> {
  const credential = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(credential.user, { displayName: name })
  
  const token = await credential.user.getIdToken()
  const universityName = "NHITM"

  const res = await fetch(`${BACKEND_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ displayName: name, universityName, email }),
  })
  
  if (!res.ok) {
    throw new Error("Failed to register on backend")
  }
  
  setAuthCookie()
  return credential
}

export async function loginWithGoogle(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider()
  const credential = await signInWithPopup(auth, provider)

  const { exists } = await syncUserWithBackend(credential)
  
  if (!exists) {
    // We do NOT set the auth cookie yet, because they are not verified.
    // Throw special error so UI can redirect to /register/complete
    throw new Error("REQUIRES_VERIFICATION")
  }

  setAuthCookie()
  return credential
}

export async function logout(): Promise<void> {
  clearAuthCookie()
  return signOut(auth)
}

export async function resetPassword(email: string): Promise<void> {
  return sendPasswordResetEmail(auth, email)
}
