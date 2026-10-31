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
  const isSecure = typeof window !== "undefined" && window.location.protocol === "https:"
  const secureFlag = isSecure ? "; Secure" : ""
  document.cookie = `campusx-authed=1; path=/; max-age=2592000; SameSite=Lax${secureFlag}`
}

function clearAuthCookie() {
  const isSecure = typeof window !== "undefined" && window.location.protocol === "https:"
  const secureFlag = isSecure ? "; Secure" : ""
  document.cookie = `campusx-authed=; path=/; max-age=0; SameSite=Lax${secureFlag}`
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
  const universityName = "University"

  try {
    const res = await fetch(`${BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ displayName: name, universityName, email }),
    })

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      throw new Error(errData.message || "Failed to register profile on backend")
    }
  } catch (backendError) {
    // Clean up Firebase Auth user if backend registration fails to prevent orphaned accounts
    await credential.user.delete().catch(() => {})
    throw backendError
  }

  setAuthCookie()
  return credential
}

export async function loginWithGoogle(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider()
  const credential = await signInWithPopup(auth, provider)

  const token = await credential.user.getIdToken()
  const res = await fetch(`${BACKEND_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (res.status === 404 || res.status === 401) {
    // User does not have a linked backend profile yet
    throw new Error("REQUIRES_VERIFICATION")
  }

  if (!res.ok) {
    throw new Error("Unable to connect to authentication server. Please try again.")
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
