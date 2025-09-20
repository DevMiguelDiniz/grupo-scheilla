"use client"

import { Sidebar } from "@/components/sidebar"
import { DollarSign, Users, Megaphone, UserCheck, Plus, TrendingUp, Heart, Calendar } from "lucide-react"
import CalendarComponent from "@/components/calendar"

const quickActions = [
  {
    title: "Cadastrar Despesa",
    description: "Registrar nova despesa do grupo",
    icon: DollarSign,
    href: "/despesas/nova",
    color: "bg-chart-1 hover:bg-chart-1/90",
  },
  {
    title: "Cadastrar Família",
    description: "Adicionar nova família assistida",
    icon: Users,
    href: "/familias/nova",
    color: "bg-chart-2 hover:bg-chart-2/90",
  },
  {
    title: "Cadastrar Campanha",
    description: "Criar nova campanha beneficente",
    icon: Megaphone,
    href: "/campanhas/nova",
    color: "bg-chart-3 hover:bg-chart-3/90",
  },
  {
    title: "Cadastrar Voluntário",
    description: "Registrar novo voluntário",
    icon: UserCheck,
    href: "/voluntarios/novo",
    color: "bg-chart-4 hover:bg-chart-4/90",
  },
]

const stats = [
  {
    title: "Famílias Assistidas",
    value: "127",
    change: "+12%",
    icon: Users,
    color: "text-chart-2",
  },
  {
    title: "Voluntários Ativos",
    value: "43",
    change: "+8%",
    icon: UserCheck,
    color: "text-chart-4",
  },
  {
    title: "Campanhas Ativas",
    value: "5",
    change: "+2",
    icon: Megaphone,
    color: "text-chart-3",
  },
  {
    title: "Despesas do Mês",
    value: "R$ 8.450",
    change: "-5%",
    icon: DollarSign,
    color: "text-chart-1",
  },
]

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 md:ml-64 overflow-auto">
        <div className="p-4 md:p-6 space-y-6 md:space-y-8 pt-16 md:pt-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-balance">
                  Bem-vindo ao Sistema Scheilla
                </h1>
                <p className="text-sm md:text-base text-muted-foreground text-pretty">
                  Gerencie as atividades do grupo espírita com amor e dedicação
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Ações Rápidas</h2>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <div
                    key={action.title}
                    className="bg-card border border-border/50 rounded-lg shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer group"
                  >
                    <div className="p-3 md:p-4">
                      <div className="flex flex-col items-center text-center gap-2 md:gap-3">
                        <div
                          className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${action.color} text-white shadow-lg group-hover:scale-110 transition-transform flex-shrink-0`}
                        >
                          <Icon className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-sm md:text-base group-hover:text-primary transition-colors leading-tight font-semibold">
                            {action.title}
                          </h3>
                          <p className="text-xs md:text-sm text-muted-foreground text-pretty hidden md:block">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 md:p-4 pt-0">
                      <button
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg transition-all h-8 md:h-10 text-xs md:text-sm inline-flex items-center justify-center rounded-md font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        onClick={() => (window.location.href = action.href)}
                      >
                        <Plus className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 flex-shrink-0" />
                        <span className="truncate">Cadastrar</span>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.title}
                  className="bg-card border border-border/50 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 md:p-6">
                    <h3 className="text-xs md:text-sm font-medium text-muted-foreground leading-tight">{stat.title}</h3>
                    <Icon className={`h-3 w-3 md:h-4 md:w-4 ${stat.color} flex-shrink-0`} />
                  </div>
                  <div className="p-3 md:p-6 pt-0">
                    <div className="text-lg md:text-2xl font-bold">{stat.value}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <TrendingUp className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{stat.change} desde o mês passado</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Calendar Component */}
          <div className="bg-card border border-border/50 rounded-lg shadow-sm">
            <CalendarComponent />
          </div>

          {/* Recent Activity */}
          <div className="bg-card border border-border/50 rounded-lg shadow-sm">
            <div className="p-4 md:p-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                <h3 className="text-lg md:text-xl font-semibold">Atividades Recentes</h3>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Últimas movimentações do sistema</p>
            </div>
            <div className="p-4 md:p-6 pt-0">
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3 md:gap-4 p-3 rounded-lg bg-muted/50">
                  <div className="w-8 h-8 bg-chart-2 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">Nova família cadastrada</p>
                    <p className="text-xs text-muted-foreground">Família Silva - há 2 horas</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:gap-4 p-3 rounded-lg bg-muted/50">
                  <div className="w-8 h-8 bg-chart-4 rounded-full flex items-center justify-center flex-shrink-0">
                    <UserCheck className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">Voluntário registrado</p>
                    <p className="text-xs text-muted-foreground">Maria Santos - há 5 horas</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:gap-4 p-3 rounded-lg bg-muted/50">
                  <div className="w-8 h-8 bg-chart-1 rounded-full flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">Despesa registrada</p>
                    <p className="text-xs text-muted-foreground">Compra de alimentos - R$ 450,00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
