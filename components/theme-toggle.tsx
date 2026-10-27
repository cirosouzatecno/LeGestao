'use client'

import React, { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      const savedTheme = (localStorage.getItem('legestao_theme') as 'dark' | 'light') || 'dark'
      setTheme(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    } catch {
      // fallback
    }
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    try {
      localStorage.setItem('legestao_theme', nextTheme)
      document.documentElement.setAttribute('data-theme', nextTheme)
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    } catch {
      // fallback
    }
  }

  if (!mounted) {
    return (
      <button
        type="button"
        className="theme-switcher-btn"
        aria-label="Alternar tema"
        title="Alternar tema"
      >
        <Moon className="w-4 h-4" />
        <span className="theme-switcher-label">Modo Escuro</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-switcher-btn"
      aria-label={`Alternar para modo ${theme === 'dark' ? 'claro' : 'escuro'}`}
      title={`Alternar para modo ${theme === 'dark' ? 'claro' : 'escuro'}`}
    >
      {theme === 'dark' ? (
        <>
          <Sun className="w-4 h-4 text-amber-300 transition-transform hover:rotate-45" />
          <span className="theme-switcher-label">Modo Claro</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-emerald-950 transition-transform hover:-rotate-12" />
          <span className="theme-switcher-label">Modo Escuro</span>
        </>
      )}
    </button>
  )
}
