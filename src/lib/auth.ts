import { createClient } from './supabase'

export async function signUpWithEmail(email: string, pass: string, fullName: string, role: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password: pass,
    options: {
      // This 'data' block is what the Trigger above looks for
      data: {
        full_name: fullName,
        role: role, 
      },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  })
  return { data, error }
}