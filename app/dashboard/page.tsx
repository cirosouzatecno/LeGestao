import { Metadata } from 'next'
import DashboardOverview from '@/components/dashboard-overview'

export const metadata: Metadata = {
  title: 'Painel Operacional | LeGestão - Le Jardin & VJ Eventos',
  description: 'Métricas de eventos em tempo real, monitoramento de acervo floral e estrutura cenográfica.',
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#183323_0,_#070a08_38%,_#050705_100%)] px-3 py-3 text-[#e8ebe9] sm:px-5 sm:py-5 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-[1480px]">
        <DashboardOverview />
      </div>
    </main>
  )
}
