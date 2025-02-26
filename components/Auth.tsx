import { useSupabase } from '@common/supabaseProvider'
import { useState } from 'react'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const { client: supabaseClient } = useSupabase()

  const handleLogin = async (email: string) => {
    try {
      setLoading(true)
      const { user, error } = await supabaseClient.auth.signIn({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      const e = error as any
      alert(e.error_description || e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h1 className="text-4xl text-center">Ngosi</h1>
      <p className=" mt-5">Sign in via magic link with your email below</p>

      <input
        className="h-9 border border-black text-lg px-2 mt-1 w-80"
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={(e) => {
          e.preventDefault()
          handleLogin(email)
        }}
        className="h-14 bg-accent-primary text-black font-bold text-xl mt-5 w-80 shadow-xl rounded-lg"
        disabled={loading}
      >
        <span>{loading ? 'Loading' : 'Send magic link'}</span>
      </button>
    </>
  )
}
