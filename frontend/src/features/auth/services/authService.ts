import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  type UserCredential,
} from "firebase/auth"
import { auth } from "@/lib/firebase"

function setAuthCookie() {
  document.cookie = "campusx-authed=1; path=/; max-age=2592000; SameSite=Lax"
}

function clearAuthCookie() {
  document.cookie = "campusx-authed=; path=/; max-age=0"
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
