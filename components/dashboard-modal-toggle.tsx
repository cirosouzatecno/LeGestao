'use client'

import React, { useState } from 'react'
import { LayoutDashboard, X, ExternalLink } from 'lucide-react'
import { DashboardOverview } from './dashboard-overview'

export function DashboardModalToggle() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="dashboard-modal-toggle-btn inline-flex items-center gap-1.5 bg-[#141e17] hover:bg-[#1b2b20] text-[#c5a059] hover:text-[#dfba73] border border-[#c5a059]/40 hover:border-[#c5a059] px-3 py-1.5 rounded-full text-xs font-semibold shadow-md transition-all active:scale-95"
        title="Abrir Painel Operacional Firestore"
      >
        <LayoutDashboard className="w-3.5 h-3.5 text-[#c5a059]" />
        <span className="hidden sm:inline">Métricas</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm p-3 sm:p-6 lg:p-10 flex flex-col justify-start items-center animate-in fade-in">
          <div className="w-full max-w-6xl relative">
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <a
                href="/dashboard"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#c5a059] hover:text-white bg-[#152219] border border-[#2b3e30] px-2.5 py-1 rounded-lg transition-colors"
                title="Abrir em aba cheia"
              >
                <span>Tela cheia</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="p-1.5 rounded-lg bg-[#152219] hover:bg-[#203426] border border-[#2b3e30] text-neutral-300 hover:text-white transition-colors"
                title="Fechar painel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-2">
              <DashboardOverview />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default DashboardModalToggle
