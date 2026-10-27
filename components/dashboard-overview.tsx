'use client'

import React, { useEffect, useState, useMemo } from 'react'
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useFirebase } from './firebase-provider'
import {
  Calendar,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Package,
  Users,
  Sparkles,
  RefreshCw,
  Plus,
  ArrowUpRight,
  TrendingUp,
  MapPin,
  Filter,
  Check,
  Database,
  ShieldCheck,
  ChevronRight,
  X,
  Layers,
} from 'lucide-react'

export interface EventItem {
  id: string
  title: string
  clientName?: string
  date: string
  location?: string
  status: 'planejamento' | 'montagem' | 'realizado' | 'cancelado'
  totalGuests?: number
  notes?: string
  createdAt?: string
  updatedAt?: string
}

export interface InventoryAlertItem {
  id: string
  name: string
  category: 'flores' | 'vasos' | 'estruturas' | 'iluminacao' | 'mobiliario' | 'outros'
  quantity: number
  unit?: string
  minQuantity?: number
  location?: string
  notes?: string
  updatedAt?: string
}

export interface TeamMemberItem {
  id: string
  name: string
  role: string
  phone?: string
  email?: string
  status: 'ativo' | 'em_evento' | 'indisponivel' | 'inativo'
  notes?: string
}

const SAMPLE_EVENTS: EventItem[] = [
  {
    id: 'evt-casamento-marina-rafael',
    title: 'Casamento Marina & Rafael',
    clientName: 'Marina Drummond',
    date: '2026-11-14',
    location: 'Palácio dos Cedros - Ipiranga, SP',
    status: 'planejamento',
    totalGuests: 280,
    notes: 'Arranjos suspensos de orquídeas brancas, 40 centros de mesa e túnel de microlâmpadas VJ.',
  },
  {
    id: 'evt-gala-techvision',
    title: 'Gala Corporativa TechVision',
    clientName: 'TechVision Global',
    date: '2026-11-04',
    location: 'Espaço Jardim Leopoldina - SP',
    status: 'montagem',
    totalGuests: 450,
    notes: 'Painéis cenográficos com folhagens nobres, iluminação âmbar e passarela espelhada.',
  },
  {
    id: 'evt-debutante-sophia',
    title: 'Festa de 15 Anos Sophia',
    clientName: 'Família Alencar',
    date: '2026-11-21',
    location: 'Villa Bisutti - Vila Olímpia',
    status: 'planejamento',
    totalGuests: 220,
    notes: 'Paleta verde-esmeralda e toques dourados, gazebo floral para fotos e iluminação robótica.',
  },
  {
    id: 'evt-bodas-prata-silva',
    title: 'Bodas de Prata Dr. Roberto & Helena',
    clientName: 'Roberto Silva',
    date: '2026-10-20',
    location: 'Casa Petra - Moema',
    status: 'realizado',
    totalGuests: 150,
    notes: 'Evento concluído com sucesso e elogios ao acervo floral.',
  },
]

const SAMPLE_INVENTORY: InventoryAlertItem[] = [
  {
    id: 'inv-rosa-avalanche',
    name: 'Rosa Branca Avalanche (Maço)',
    category: 'flores',
    quantity: 18,
    minQuantity: 40,
    unit: 'maços',
    location: 'Câmara Fria 1',
    notes: 'Alerta: estoque abaixo do mínimo para eventos de novembro.',
  },
  {
    id: 'inv-orquidea-phalaenopsis',
    name: 'Orquídea Phalaenopsis Cascata',
    category: 'flores',
    quantity: 12,
    minQuantity: 25,
    unit: 'vasos',
    location: 'Estufa Aclimatação',
    notes: 'Reposição prioritária para montagens da próxima semana.',
  },
  {
    id: 'inv-vaso-murano-dourado',
    name: 'Vaso Murano Borda Ouro 45cm',
    category: 'vasos',
    quantity: 6,
    minQuantity: 15,
    unit: 'un',
    location: 'Galpão 1 - Prateleira D3',
    notes: 'Peça nobre para mesas imperiais e lounges.',
  },
  {
    id: 'inv-refletor-led-rgbw',
    name: 'Refletor LED Par 64 RGBW 54x3W',
    category: 'iluminacao',
    quantity: 36,
    minQuantity: 20,
    unit: 'un',
    location: 'Galpão VJ Som & Luz',
    notes: 'Revisados e prontos para operação técnica.',
  },
  {
    id: 'inv-gazebo-boiserie-ouro',
    name: 'Gazebo Cenográfico Boiserie Ouro',
    category: 'estruturas',
    quantity: 2,
    minQuantity: 2,
    unit: 'un',
    location: 'Galpão Cenografia 2',
    notes: 'Reservado para o Palácio dos Cedros.',
  },
]

const SAMPLE_TEAM: TeamMemberItem[] = [
  {
    id: 'tm-ciro-souza',
    name: 'Ciro Souza',
    role: 'Diretor Geral de Produção',
    phone: '(11) 98765-4321',
    email: 'ciro.souza3@aluno.unip.br',
    status: 'ativo',
    notes: 'Supervisão executiva geral LeGestão.',
  },
  {
    id: 'tm-beatriz-lima',
    name: 'Beatriz Lima',
    role: 'Florista Chefe',
    phone: '(11) 97654-3210',
    email: 'beatriz.flores@lejardin.com.br',
    status: 'em_evento',
    notes: 'Liderando montagem da Gala TechVision.',
  },
  {
    id: 'tm-lucas-mendes',
    name: 'Lucas Mendes',
    role: 'Coordenador Técnico VJ',
    phone: '(11) 96543-2109',
    email: 'lucas.luz@vjeventos.com.br',
    status: 'em_evento',
    notes: 'Grid de iluminação e mesa DMX.',
  },
]

export function DashboardOverview({ className = '' }: { className?: string }) {
  const { user, connected } = useFirebase()
  const [events, setEvents] = useState<EventItem[]>([])
  const [inventory, setInventory] = useState<InventoryAlertItem[]>([])
  const [team, setTeam] = useState<TeamMemberItem[]>([])
  const [loading, setLoading] = useState(true)
  const [seeding, setSeeding] = useState(false)
  const [eventFilter, setEventFilter] = useState<'todos' | 'pendentes' | 'montagem' | 'realizado'>('todos')
  const [showNewEventModal, setShowNewEventModal] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // New Event Form State
  const [newTitle, setNewTitle] = useState('')
  const [newClient, setNewClient] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [newStatus, setNewStatus] = useState<'planejamento' | 'montagem'>('planejamento')
  const [newGuests, setNewGuests] = useState<number>(100)

  // Real-time Firestore Listeners
  useEffect(() => {
    let unsubEvents: (() => void) | undefined
    let unsubInventory: (() => void) | undefined
    let unsubTeam: (() => void) | undefined

    try {
      const eventsRef = collection(db, 'events')
      unsubEvents = onSnapshot(
        eventsRef,
        (snapshot) => {
          const list: EventItem[] = []
          snapshot.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...(docSnap.data() as Omit<EventItem, 'id'>) })
          })
          // If Firestore is empty, we fall back to sample events so user never sees a bare screen
          setEvents(list.length > 0 ? list : SAMPLE_EVENTS)
          setLoading(false)
        },
        (err) => {
          console.warn('Erro ao carregar eventos do Firestore (usando fallback local):', err)
          setEvents(SAMPLE_EVENTS)
          setLoading(false)
        }
      )

      const invRef = collection(db, 'inventory')
      unsubInventory = onSnapshot(
        invRef,
        (snapshot) => {
          const list: InventoryAlertItem[] = []
          snapshot.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...(docSnap.data() as Omit<InventoryAlertItem, 'id'>) })
          })
          setInventory(list.length > 0 ? list : SAMPLE_INVENTORY)
        },
        (err) => {
          console.warn('Erro ao carregar estoque do Firestore:', err)
          setInventory(SAMPLE_INVENTORY)
        }
      )

      const teamRef = collection(db, 'team')
      unsubTeam = onSnapshot(
        teamRef,
        (snapshot) => {
          const list: TeamMemberItem[] = []
          snapshot.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...(docSnap.data() as Omit<TeamMemberItem, 'id'>) })
          })
          setTeam(list.length > 0 ? list : SAMPLE_TEAM)
        },
        (err) => {
          console.warn('Erro ao carregar equipe do Firestore:', err)
          setTeam(SAMPLE_TEAM)
        }
      )
    } catch (e) {
      console.warn('Inicialização Firestore fallback:', e)
      setEvents(SAMPLE_EVENTS)
      setInventory(SAMPLE_INVENTORY)
      setTeam(SAMPLE_TEAM)
      setLoading(false)
    }

    return () => {
      unsubEvents?.()
      unsubInventory?.()
      unsubTeam?.()
    }
  }, [])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  // Key Metrics Calculations
  const pendingEventsCount = useMemo(() => {
    return events.filter((e) => e.status === 'planejamento' || e.status === 'montagem').length
  }, [events])

  const assemblyEventsCount = useMemo(() => {
    return events.filter((e) => e.status === 'montagem').length
  }, [events])

  const planningEventsCount = useMemo(() => {
    return events.filter((e) => e.status === 'planejamento').length
  }, [events])

  const inventoryAlerts = useMemo(() => {
    return inventory.filter((item) => {
      const min = item.minQuantity ?? 10
      return item.quantity <= min
    })
  }, [inventory])

  const activeTeamCount = useMemo(() => {
    return team.filter((m) => m.status === 'ativo' || m.status === 'em_evento').length
  }, [team])

  // Filtered Events
  const filteredEvents = useMemo(() => {
    if (eventFilter === 'pendentes') {
      return events.filter((e) => e.status === 'planejamento' || e.status === 'montagem')
    }
    if (eventFilter === 'montagem') {
      return events.filter((e) => e.status === 'montagem')
    }
    if (eventFilter === 'realizado') {
      return events.filter((e) => e.status === 'realizado')
    }
    return events
  }, [events, eventFilter])

  // Seed sample data to Firestore
  const handleSeedData = async () => {
    setSeeding(true)
    try {
      // Seed events
      for (const ev of SAMPLE_EVENTS) {
        await setDoc(doc(db, 'events', ev.id), ev)
      }
      // Seed inventory
      for (const inv of SAMPLE_INVENTORY) {
        await setDoc(doc(db, 'inventory', inv.id), inv)
      }
      // Seed team
      for (const tm of SAMPLE_TEAM) {
        await setDoc(doc(db, 'team', tm.id), tm)
      }
      showToast('Dados de demonstração sincronizados com o Firestore com sucesso!')
    } catch (err: unknown) {
      console.error('Erro ao semear dados no Firestore:', err)
      showToast('Para sincronizar com o Firestore, faça login com o Google acima.')
    } finally {
      setSeeding(false)
    }
  }

  // Handle Event Status Change
  const handleUpdateEventStatus = async (eventId: string, newSt: EventItem['status']) => {
    try {
      await updateDoc(doc(db, 'events', eventId), {
        status: newSt,
        updatedAt: new Date().toISOString(),
      })
      showToast(`Status do evento atualizado para "${newSt}".`)
    } catch (err) {
      console.warn('Atualizando evento localmente:', err)
      setEvents((prev) =>
        prev.map((e) => (e.id === eventId ? { ...e, status: newSt } : e))
      )
      showToast(`Status atualizado na visualização (requer login para gravar no Firestore).`)
    }
  }

  // Quick Restock (+10)
  const handleRestock = async (itemId: string, currentQty: number) => {
    const updated = currentQty + 10
    try {
      await updateDoc(doc(db, 'inventory', itemId), {
        quantity: updated,
        updatedAt: new Date().toISOString(),
      })
      showToast(`Estoque reposto com sucesso (+10 unidades).`)
    } catch (err) {
      console.warn('Atualizando estoque localmente:', err)
      setInventory((prev) =>
        prev.map((i) => (i.id === itemId ? { ...i, quantity: updated } : i))
      )
      showToast(`Saldo atualizado na visualização local.`)
    }
  }

  // Create new event
  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    const id = `evt-${Date.now().toString(36)}`
    const newEvent: EventItem = {
      id,
      title: newTitle.trim(),
      clientName: newClient.trim() || 'Cliente VIP',
      date: newDate || new Date().toISOString().split('T')[0],
      location: newLocation.trim() || 'Espaço a Definir - SP',
      status: newStatus,
      totalGuests: Number(newGuests) || 150,
      createdAt: new Date().toISOString(),
    }

    try {
      await setDoc(doc(db, 'events', id), newEvent)
      showToast('Novo evento salvo com sucesso no Firestore!')
    } catch (err) {
      console.warn('Adicionando evento localmente:', err)
      setEvents((prev) => [newEvent, ...prev])
      showToast('Evento adicionado na interface.')
    }

    setNewTitle('')
    setNewClient('')
    setNewDate('')
    setNewLocation('')
    setShowNewEventModal(false)
  }

  return (
    <div className={`legestao-dashboard-container bg-[#080b09] text-[#e8ebe9] p-4 sm:p-6 lg:p-8 rounded-2xl border border-[#233127] shadow-2xl relative ${className}`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#16241b] border border-[#c5a059] text-[#f2f5f3] px-5 py-3 rounded-xl shadow-2xl text-xs sm:text-sm font-medium flex items-center gap-3 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-neutral-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1b2920]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#142319] text-[#c5a059] border border-[#c5a059]/30">
              <Sparkles className="w-3 h-3" />
              Painel Operacional
            </span>
            <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Firestore Live
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Visão Geral LeGestão
          </h1>
          <p className="text-xs sm:text-sm text-[#94a89a]">
            Métricas de eventos em tempo real, monitoramento de acervo floral e estrutura cenográfica.
          </p>
        </div>

        {/* Quick Actions Header */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={handleSeedData}
            disabled={seeding}
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium bg-[#121c16] hover:bg-[#1a291f] text-[#c5a059] border border-[#c5a059]/40 hover:border-[#c5a059] transition-all shadow-sm active:scale-95 disabled:opacity-50"
            title="Sincronizar acervo padrão no Firestore"
          >
            <Database className={`w-3.5 h-3.5 ${seeding ? 'animate-spin' : ''}`} />
            <span>{seeding ? 'Semeando...' : 'Semear Firestore'}</span>
          </button>

          <button
            onClick={() => setShowNewEventModal(true)}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#c5a059] to-[#dfba73] hover:from-[#d4af66] hover:to-[#ebc882] text-[#0d1410] shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Novo Evento</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        {/* KPI 1: Total Pending Events */}
        <div className="bg-[#111914] border border-[#223126] hover:border-[#c5a059]/40 rounded-xl p-4 sm:p-5 transition-all shadow-sm relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-[#c5a059]/5 rounded-full blur-xl group-hover:bg-[#c5a059]/10 transition-colors" />
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9fb3a5]">Eventos Pendentes</span>
            <div className="p-2 rounded-lg bg-[#18261e] text-[#c5a059] border border-[#c5a059]/20">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-serif text-white">{pendingEventsCount}</span>
            <span className="text-xs text-amber-400/90 font-medium">em andamento</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-[#869b8d] pt-2 border-t border-[#1d2c22]">
            <span>{planningEventsCount} em planejamento</span>
            <span className="text-[#c5a059] font-medium">{assemblyEventsCount} em montagem</span>
          </div>
        </div>

        {/* KPI 2: Inventory Alerts */}
        <div className="bg-[#111914] border border-[#223126] hover:border-red-500/40 rounded-xl p-4 sm:p-5 transition-all shadow-sm relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-red-500/5 rounded-full blur-xl group-hover:bg-red-500/10 transition-colors" />
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9fb3a5]">Alertas de Estoque</span>
            <div className="p-2 rounded-lg bg-red-950/40 text-red-400 border border-red-800/30">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-serif text-white">{inventoryAlerts.length}</span>
            <span className="text-xs text-red-400 font-medium">nível crítico</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-[#869b8d] pt-2 border-t border-[#1d2c22]">
            <span>{inventory.length} itens monitorados</span>
            <span className="text-red-400 font-medium">Repor urgente</span>
          </div>
        </div>

        {/* KPI 3: Next Upcoming Event */}
        <div className="bg-[#111914] border border-[#223126] hover:border-emerald-500/40 rounded-xl p-4 sm:p-5 transition-all shadow-sm relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-colors" />
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9fb3a5]">Próxima Entrega</span>
            <div className="p-2 rounded-lg bg-emerald-950/40 text-emerald-400 border border-emerald-800/30">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="truncate">
            <span className="text-lg font-bold font-serif text-white truncate block">
              {events[0]?.title || 'Sem eventos agendados'}
            </span>
            <span className="text-xs text-emerald-400 font-medium">
              {events[0]?.date ? new Date(events[0].date).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : 'Data livre'}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-[#869b8d] pt-2 border-t border-[#1d2c22] truncate">
            <span className="truncate">{events[0]?.clientName || 'Le Jardin & VJ'}</span>
            <span className="text-neutral-300 font-medium shrink-0">{events[0]?.totalGuests || 0} conv.</span>
          </div>
        </div>

        {/* KPI 4: Active Team */}
        <div className="bg-[#111914] border border-[#223126] hover:border-[#c5a059]/40 rounded-xl p-4 sm:p-5 transition-all shadow-sm relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-[#c5a059]/5 rounded-full blur-xl group-hover:bg-[#c5a059]/10 transition-colors" />
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9fb3a5]">Equipe em Campo</span>
            <div className="p-2 rounded-lg bg-[#18261e] text-[#c5a059] border border-[#c5a059]/20">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-serif text-white">{activeTeamCount}</span>
            <span className="text-xs text-emerald-400 font-medium">membros ativos</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-[#869b8d] pt-2 border-t border-[#1d2c22]">
            <span>{team.length} cadastrados</span>
            <span className="text-[#c5a059] font-medium">100% prontidão</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Left Events / Right Inventory Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Upcoming Tasks & Events */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#101712] border border-[#223126] rounded-xl p-4 sm:p-5 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1c2a20]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#c5a059]" />
                <h2 className="text-base sm:text-lg font-serif font-bold text-white">
                  Próximos Eventos & Tarefas
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#1b2b20] text-[#9eb5a5] font-mono">
                  {filteredEvents.length}
                </span>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 bg-[#0b110d] p-1 rounded-lg border border-[#1b2920] text-xs">
                {(['todos', 'pendentes', 'montagem', 'realizado'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setEventFilter(tab)}
                    type="button"
                    className={`px-2.5 py-1 rounded-md font-medium capitalize transition-colors ${
                      eventFilter === tab
                        ? 'bg-[#1b2b20] text-[#c5a059] shadow-xs'
                        : 'text-[#849a8c] hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Events List */}
            <div className="mt-4 space-y-3">
              {filteredEvents.length === 0 ? (
                <div className="text-center py-10 text-neutral-400">
                  <Calendar className="w-8 h-8 mx-auto mb-2 opacity-30 text-[#c5a059]" />
                  <p className="text-sm">Nenhum evento encontrado para este filtro.</p>
                </div>
              ) : (
                filteredEvents.map((event) => {
                  const isAssembly = event.status === 'montagem'
                  const isDone = event.status === 'realizado'
                  const isPlanning = event.status === 'planejamento'

                  return (
                    <div
                      key={event.id}
                      className="bg-[#131d16] hover:bg-[#17231b] border border-[#1e2d22] hover:border-[#c5a059]/40 rounded-xl p-3.5 sm:p-4 transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-[#dfba73] transition-colors truncate">
                            {event.title}
                          </h3>
                          <span
                            className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${
                              isAssembly
                                ? 'bg-amber-950/50 text-amber-300 border-amber-800/40'
                                : isDone
                                ? 'bg-emerald-950/50 text-emerald-300 border-emerald-800/40'
                                : 'bg-[#18271e] text-[#9ec4a9] border-[#2b4131]'
                            }`}
                          >
                            {event.status}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#8ca192]">
                          <span>
                            <strong className="text-neutral-300 font-medium">Cliente:</strong> {event.clientName || 'Não especificado'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#c5a059]" />
                            {new Date(event.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                          </span>
                          {event.location && (
                            <span className="flex items-center gap-1 truncate max-w-[200px]">
                              <MapPin className="w-3 h-3 text-[#c5a059]" />
                              {event.location}
                            </span>
                          )}
                          {event.totalGuests && (
                            <span className="text-[#a5bcaa]">
                              👥 {event.totalGuests} convidados
                            </span>
                          )}
                        </div>

                        {event.notes && (
                          <p className="text-[11px] text-[#718778] italic line-clamp-1 pt-0.5">
                            "{event.notes}"
                          </p>
                        )}
                      </div>

                      {/* Quick Status Toggles */}
                      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                        {isPlanning && (
                          <button
                            onClick={() => handleUpdateEventStatus(event.id, 'montagem')}
                            type="button"
                            className="px-2.5 py-1 text-[11px] font-medium bg-[#1d2d22] hover:bg-amber-950/60 text-amber-300 border border-amber-700/40 rounded-lg transition-colors"
                            title="Mover para Montagem"
                          >
                            Iniciar Montagem
                          </button>
                        )}
                        {isAssembly && (
                          <button
                            onClick={() => handleUpdateEventStatus(event.id, 'realizado')}
                            type="button"
                            className="px-2.5 py-1 text-[11px] font-medium bg-[#1d2d22] hover:bg-emerald-950/60 text-emerald-300 border border-emerald-700/40 rounded-lg transition-colors"
                            title="Marcar como Concluído"
                          >
                            Concluir Evento
                          </button>
                        )}
                        {isDone && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 px-2 py-0.5">
                            <Check className="w-3 h-3" /> Concluído
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* Operational Team Overview */}
          <div className="bg-[#101712] border border-[#223126] rounded-xl p-4 sm:p-5 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-[#1c2a20]">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#c5a059]" />
                <h3 className="text-sm sm:text-base font-serif font-bold text-white">
                  Equipe & Escala Operacional
                </h3>
              </div>
              <span className="text-xs text-[#869b8d]">
                {activeTeamCount} em atividade
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="bg-[#131c15] border border-[#1e2a20] rounded-lg p-3 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white truncate">{member.name}</span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        member.status === 'em_evento'
                          ? 'bg-amber-400 animate-ping'
                          : member.status === 'ativo'
                          ? 'bg-emerald-400'
                          : 'bg-neutral-600'
                      }`}
                      title={member.status}
                    />
                  </div>
                  <p className="text-[#c5a059] text-[11px] truncate">{member.role}</p>
                  <p className="text-[#768c7e] text-[10px] truncate">{member.email || member.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 col): Inventory Alerts */}
        <div className="space-y-4">
          <div className="bg-[#101712] border border-[#223126] rounded-xl p-4 sm:p-5 shadow-md flex flex-col h-full">
            <div className="flex items-center justify-between pb-4 border-b border-[#1c2a20]">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <h2 className="text-base sm:text-lg font-serif font-bold text-white">
                  Alertas de Estoque
                </h2>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-red-950/60 text-red-300 font-mono border border-red-800/40">
                {inventoryAlerts.length} críticos
              </span>
            </div>

            <p className="text-xs text-[#8aa090] mt-3 mb-4">
              Itens com quantidade igual ou abaixo do estoque de segurança estipulado.
            </p>

            <div className="space-y-3 flex-1 overflow-y-auto max-h-[500px] pr-1">
              {inventoryAlerts.length === 0 ? (
                <div className="text-center py-8 text-neutral-400 bg-[#0d140f] rounded-lg border border-[#1b261e]">
                  <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-400 opacity-60" />
                  <p className="text-xs font-medium text-emerald-300">Estoque 100% equilibrado</p>
                  <p className="text-[11px] text-[#718779] mt-0.5">Nenhum item com saldo abaixo da margem mínima.</p>
                </div>
              ) : (
                inventoryAlerts.map((item) => {
                  const min = item.minQuantity ?? 10
                  const ratio = Math.min(100, Math.round((item.quantity / min) * 100))

                  return (
                    <div
                      key={item.id}
                      className="bg-[#141d17] border border-red-900/30 hover:border-red-500/40 rounded-xl p-3 text-xs space-y-2 transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-white">{item.name}</h4>
                          <span className="text-[10px] text-[#c5a059] uppercase tracking-wider">
                            {item.category} • {item.location || 'Depósito'}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-red-400 font-mono bg-red-950/60 px-2 py-0.5 rounded border border-red-800/30 shrink-0">
                          {item.quantity} / {min} {item.unit || 'un'}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-[#1e2a21] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-red-500 h-full rounded-full transition-all"
                          style={{ width: `${ratio}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-[#7f9485]">
                          Déficit: {Math.max(0, min - item.quantity)} {item.unit || 'un'}
                        </span>
                        <button
                          onClick={() => handleRestock(item.id, item.quantity)}
                          type="button"
                          className="text-[10px] font-semibold text-[#c5a059] hover:text-white px-2 py-0.5 rounded bg-[#1d2b21] hover:bg-[#25372a] border border-[#c5a059]/30 transition-colors"
                        >
                          +10 Repor
                        </button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Total inventory stats footer */}
            <div className="mt-4 pt-3 border-t border-[#1c2a20] flex items-center justify-between text-xs text-[#8aa090]">
              <span className="flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-[#c5a059]" />
                Total no acervo: {inventory.length} tipos
              </span>
              <span className="text-[11px] text-neutral-400">
                Flores, Vasos e Som/Luz
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Novo Evento */}
      {showNewEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#101712] border border-[#c5a059]/50 rounded-2xl w-full max-w-md p-6 shadow-2xl text-[#f2f5f3] space-y-4 relative">
            <div className="flex items-center justify-between border-b border-[#1f2e23] pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#c5a059]" />
                <h3 className="font-serif font-bold text-lg text-white">Cadastrar Novo Evento</h3>
              </div>
              <button
                onClick={() => setShowNewEventModal(false)}
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[#a4b8ab] font-medium mb-1">Título do Evento *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Casamento Beatriz & Felipe"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#162119] border border-[#26372b] focus:border-[#c5a059] rounded-lg px-3 py-2 text-white outline-hidden transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#a4b8ab] font-medium mb-1">Nome do Cliente</label>
                  <input
                    type="text"
                    placeholder="Ex: Dra. Beatriz"
                    value={newClient}
                    onChange={(e) => setNewClient(e.target.value)}
                    className="w-full bg-[#162119] border border-[#26372b] focus:border-[#c5a059] rounded-lg px-3 py-2 text-white outline-hidden transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#a4b8ab] font-medium mb-1">Data Prevista *</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-[#162119] border border-[#26372b] focus:border-[#c5a059] rounded-lg px-3 py-2 text-white outline-hidden transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#a4b8ab] font-medium mb-1">Local do Evento</label>
                <input
                  type="text"
                  placeholder="Ex: Espaço Gardens - São Paulo"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full bg-[#162119] border border-[#26372b] focus:border-[#c5a059] rounded-lg px-3 py-2 text-white outline-hidden transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#a4b8ab] font-medium mb-1">Estimativa de Convidados</label>
                  <input
                    type="number"
                    min="1"
                    value={newGuests}
                    onChange={(e) => setNewGuests(Number(e.target.value))}
                    className="w-full bg-[#162119] border border-[#26372b] focus:border-[#c5a059] rounded-lg px-3 py-2 text-white outline-hidden transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#a4b8ab] font-medium mb-1">Status Inicial</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as 'planejamento' | 'montagem')}
                    className="w-full bg-[#162119] border border-[#26372b] focus:border-[#c5a059] rounded-lg px-3 py-2 text-white outline-hidden transition-colors"
                  >
                    <option value="planejamento">Planejamento</option>
                    <option value="montagem">Montagem</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#1f2e23]">
                <button
                  type="button"
                  onClick={() => setShowNewEventModal(false)}
                  className="px-3 py-2 rounded-lg bg-[#151f18] hover:bg-[#1a271e] text-[#9eb3a4] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#c5a059] to-[#dfba73] hover:from-[#d4af66] hover:to-[#ebc882] text-[#0d1410] font-bold shadow-md transition-all active:scale-95"
                >
                  Salvar Evento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
export default DashboardOverview
