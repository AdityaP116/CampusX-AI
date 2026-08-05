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

export async function syncUserWithBackend(credential: UserCredential, displayName?: string) {
  const token = await credential.user.getIdToken()
  const res = await fetch(`${BACKEND_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  // If the user doesn't exist in the backend (e.g. newly created via Firebase), register them
  if (!res.ok && res.status !== 500) {
    const email = credential.user.email || ""
    const name = displayName || credential.user.displayName || "New Student"
    const universityName = email.includes("@") ? email.split("@")[1].replace(".edu", "").toUpperCase() : "University"

    await fetch(`${BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ displayName: name, universityName, email }),
    })
  }
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
  await syncUserWithBackend(credential, name)
  setAuthCookie()
  return credential
}

export async function loginWithGoogle(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider()
  const credential = await signInWithPopup(auth, provider)
  
  // Enforce .edu college email check per requirements
  if (!credential.user.email?.endsWith(".edu")) {
    await signOut(auth)
    clearAuthCookie()
    throw new Error("You must use a valid .edu college email account to join CampusX.")
  }

  await syncUserWithBackend(credential)
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
