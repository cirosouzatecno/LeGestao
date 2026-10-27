'use client'

import React from 'react'
import { useFirebase } from './firebase-provider'
import { LogIn, LogOut, CheckCircle2 } from 'lucide-react'

export function GoogleAuthButton() {
  const { user, loading, signInWithGoogle, signOut, connected } = useFirebase()

  if (loading) {
    return (
      <div className="firebase-auth-bar flex items-center gap-2 text-xs text-neutral-400">
        <span>Carregando Firebase...</span>
      </div>
    )
  }

  if (user) {
    return (
      <div className="firebase-auth-pill flex items-center gap-2 bg-[#121814] border border-[#243328] rounded-full px-3 py-1.5 text-xs text-[#f2f5f3] shadow-md">
        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" title="Conectado ao Firebase" />
        <span className="max-w-[130px] truncate font-medium">{user.displayName || user.email}</span>
        <button
          onClick={signOut}
          type="button"
          title="Desconectar do Firebase"
          className="hover:text-amber-400 transition-colors ml-1 p-0.5"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={signInWithGoogle}
      type="button"
      className="firebase-google-login-btn inline-flex items-center gap-2 bg-[#141d17] hover:bg-[#1a261e] text-[#f2f5f3] border border-[#c5a059]/40 hover:border-[#c5a059] px-3 py-1.5 rounded-full text-xs font-semibold shadow-md transition-all active:scale-95"
      title="Conectar com conta Google no Firebase"
    >
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        />
      </svg>
      <span>Google Firebase</span>
    </button>
  )
}
