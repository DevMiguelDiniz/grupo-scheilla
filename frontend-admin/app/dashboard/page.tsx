"use client"

import { DollarSign, Users, Megaphone, UserCheck, Plus, Heart } from "lucide-react"
import CalendarComponent from "../../components/dashboard/calendar"
import {Sidebar} from "../../components/sidebar/sidebar";
import type React from "react";
import Image from "next/image";

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
        color: "bg-chart-1 hover:bg-chart-1/90",
    },
    {
        title: "Cadastrar Campanha",
        description: "Criar nova campanha beneficente",
        icon: Megaphone,
        href: "/campanhas/nova",
        color: "bg-chart-1 hover:bg-chart-1/90",
    },
    {
        title: "Cadastrar Voluntário",
        description: "Registrar novo voluntário",
        icon: UserCheck,
        href: "/voluntarios/novo",
        color: "bg-chart-1 hover:bg-chart-1/90",
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
        <div className="min-h-screen bg-background">
            <main className="w-full overflow-auto">
                <Sidebar />
                <div className="p-4 md:p-6 space-y-6 md:space-y-8">
                    {/* Header */}
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="space-y-1">
                                    <h1 className="text-xl md:text-3xl font-bold tracking-tight">
                                        Bem-vindo ao Painel Administrativo
                                    </h1>
                                    <p className="text-sm md:text-base text-muted-foreground">
                                        Gerencie as atividades do Grupo Espírita Scheilla
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-card border border-border/50 rounded-lg shadow-sm p-4 md:p-6">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                            {stats.map((stat) => {
                                const Icon = stat.icon
                                return (
                                    <div key={stat.title} className="text-center sm:text-left">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Icon className={`h-4 w-4 ${stat.color}`} />
                                            <p className="text-sm text-muted-foreground">{stat.title}</p>
                                        </div>
                                        <p className="text-2xl md:text-3xl font-bold text-foreground">
                                            {stat.value}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Plus className="h-4 w-4 md:h-5 md:w-5 text-emerald-600 flex-shrink-0" />
                            <h2 className="text-xl font-semibold">Ações Rápidas</h2>
                        </div>

                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                            {quickActions.map((action) => {
                                const Icon = action.icon
                                return (
                                    <div
                                        key={action.title}
                                        className="bg-card border border-border/50 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 md:p-6 cursor-pointer group"
                                        onClick={() => (window.location.href = action.href)}
                                    >
                                        <div className="flex flex-col items-center text-center gap-3">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.color} text-white shadow-lg group-hover:scale-110 transition-transform flex-shrink-0`}>
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="text-sm md:text-base font-semibold text-foreground group-hover:text-emerald-600 transition-colors">
                                                    {action.title}
                                                </h3>
                                                <p className="text-xs md:text-sm text-muted-foreground hidden md:block">
                                                    {action.description}
                                                </p>
                                            </div>
                                        </div>
                                        <button className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg transition-all h-8 md:h-10 text-xs md:text-sm inline-flex items-center justify-center rounded-md font-medium">
                                            <Plus className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 flex-shrink-0" />
                                            Cadastrar
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Calendar */}
                    <div className="bg-card border border-border/50 rounded-lg shadow-sm p-4 md:p-6">
                        <h2 className="text-xl font-semibold mb-4">Calendário de Atividades</h2>
                        <CalendarComponent />
                    </div>
                </div>
            </main>
        </div>
    )
}