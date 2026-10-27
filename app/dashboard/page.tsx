import { Metadata } from 'next'
import DashboardOverview from '@/components/dashboard-overview'

export const metadata: Metadata = {
  title: 'Painel Operacional | LeGestão - Le Jardin & VJ Eventos',
  description: 'Métricas de eventos em tempo real, monitoramento de acervo floral e estrutura cenográfica.',
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#070a08] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <DashboardOverview />
      </div>
    </main>
  )
}
