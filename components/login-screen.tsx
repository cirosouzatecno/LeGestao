'use client'

import { FormEvent, useState } from 'react'
import { FirebaseError } from 'firebase/app'
import { ArrowRight, Eye, EyeOff, LockKeyhole } from 'lucide-react'
import { DashboardOverview } from './dashboard-overview'
import { useFirebase } from './firebase-provider'

function getAuthMessage(error: unknown) {
  if (!(error instanceof FirebaseError)) {
    return 'Não foi possível conectar ao Firebase. Tente novamente.'
  }

  switch (error.code) {
    case 'auth/invalid-email':
      return 'Informe um endereço de e-mail válido.'
    case 'auth/user-not-found':
      return 'Login não encontrado. Verifique o e-mail informado.'
    case 'auth/wrong-password':
      return 'Senha inválida. Verifique sua senha e tente novamente.'
    case 'auth/invalid-credential':
      return 'E-mail ou senha inválidos. Confira seus dados e tente novamente.'
    case 'auth/user-disabled':
      return 'Esta conta foi desativada. Fale com o administrador.'
    case 'auth/operation-not-allowed':
      return 'O login por e-mail ainda não está habilitado no Firebase.'
    case 'auth/missing-password':
      return 'Informe sua senha para continuar.'
    case 'auth/network-request-failed':
      return 'Não foi possível conectar ao Firebase. Verifique sua internet.'
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Aguarde alguns minutos e tente novamente.'
    default:
      return 'Não foi possível entrar. Verifique sua conexão e tente novamente.'
  }
}

export function LoginScreen() {
  const { user, loading, signInWithEmail } = useFirebase()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  if (loading) {
    return <main className="min-h-screen bg-[#080b09]" />
  }

  if (user) {
    return <DashboardOverview />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage('')
    setSubmitting(true)

    try {
      await signInWithEmail(email, password)
    } catch (error) {
      setErrorMessage(getAuthMessage(error))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="login-screen min-h-screen lg:grid lg:grid-cols-[1.1fr_0.9fr]">
      <section className="login-story hidden min-h-screen flex-col justify-between p-8 lg:flex xl:p-14">
        <div className="login-brands">
          <img className="login-logo-lejardin" src="/assets/img/logo.png" alt="Le Jardin" />
          <span className="login-brand-divider" aria-hidden="true" />
          <img className="login-logo-vj" src="/assets/img/logo-vj.webp" alt="VJ Projetos Especiais Produções" />
        </div>
        <div className="login-copy max-w-xl">
          <span className="eyebrow">LE JARDIN + VJ EVENTOS</span>
          <h1 className="mt-5 text-5xl font-semibold leading-tight">
            O cuidado em cada detalhe.
            <br />
            <em>Agora, na gestão.</em>
          </h1>
          <p className="mt-6 text-lg">Flores, pessoas e eventos. Tudo conectado em um só lugar.</p>
          <div className="login-seal mt-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
            <LockKeyhole size={17} />
            Um espaço exclusivo para a nossa equipe.
          </div>
        </div>
        <small className="login-bottom">LE GESTÃO · ORGANIZAR PARA FLORESCER</small>
      </section>

      <section className="login-form-area flex min-h-screen items-center justify-center p-6 sm:p-10">
        <form onSubmit={handleSubmit} className="login-card w-full max-w-md rounded-2xl p-7 sm:p-10">
          <div className="login-mobile-brand mb-8 rounded-xl p-4 lg:hidden">
            <div className="brand-lockup" aria-label="Le Jardin e VJ Eventos">
              <img className="login-mobile-logo" src="/assets/img/logo.png" alt="Le Jardin" />
              <img className="login-mobile-logo" src="/assets/img/logo-vj.webp" alt="VJ Eventos" />
            </div>
          </div>
          <span className="eyebrow">ACESSO RESTRITO</span>
          <h2 className="mt-3 text-3xl font-semibold">Entrar no sistema</h2>
          <p className="login-help mt-3">Use sua conta Firebase para acessar o painel operacional.</p>

          <div className="mt-8 space-y-5">
            <label className="block text-sm font-medium" htmlFor="email">
              E-mail
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="seu@email.com"
                className="mt-2 w-full rounded-lg border border-[#2b3e30] bg-[#0b110d] px-4 py-3 text-[#f2f5f3] outline-none transition focus:border-[#c5a059]"
              />
            </label>

            <label className="block text-sm font-medium" htmlFor="password">
              Senha
              <span className="relative mt-2 block">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full rounded-lg border border-[#2b3e30] bg-[#0b110d] px-4 py-3 pr-12 text-[#f2f5f3] outline-none transition focus:border-[#c5a059]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8aa091] hover:text-[#c5a059]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </span>
            </label>
          </div>

          {errorMessage && (
            <p role="alert" className="mt-5 rounded-lg border border-red-900/70 bg-red-950/30 px-3 py-2 text-sm text-red-200">
              {errorMessage}
            </p>
          )}

          <button type="submit" disabled={submitting} className="primary mt-7 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3">
            {submitting ? 'Entrando...' : 'Entrar no sistema'}
            {!submitting && <ArrowRight size={17} />}
          </button>
          <p className="login-help mt-5 text-center text-xs">Acesso seguro e individual. Fale com o administrador para obter uma conta.</p>
        </form>
      </section>
    </main>
  )
}