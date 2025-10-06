// components/campaigns/CampaignViewModal.tsx
"use client"

import { X, Megaphone, Calendar, Target, TrendingUp, FileText } from "lucide-react"

interface Campaign {
    id: number
    title: string
    description: string
    startDate: string
    endDate: string
    type: string
    status: string
    goal: string
    collected: string
}

interface CampaignViewModalProps {
    campaign: Campaign | null
    isOpen: boolean
    onClose: () => void
}

export function CampaignViewModal({ campaign, isOpen, onClose }: CampaignViewModalProps) {
    if (!isOpen || !campaign) return null

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "active":
                return "Ativa"
            case "future":
                return "Futura"
            case "past":
                return "Encerrada"
            default:
                return status
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return "bg-green-100 text-green-800 border-green-200"
            case "future":
                return "bg-blue-100 text-blue-800 border-blue-200"
            case "past":
                return "bg-gray-100 text-gray-800 border-gray-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border/50 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Megaphone className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-foreground">
                                Detalhes da Campanha
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Informações completas do cadastro
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="h-8 w-8 rounded-md hover:bg-accent transition-colors flex items-center justify-center"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Title and Status */}
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-foreground">
                            {campaign.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(campaign.status)}`}>
                                {getStatusLabel(campaign.status)}
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 border border-purple-200">
                                {campaign.type}
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Descrição
                        </h4>
                        <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                            <p className="font-medium text-pretty">{campaign.description}</p>
                        </div>
                    </div>

                    {/* Period */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Período
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <div>
                                    <p className="text-muted-foreground text-xs">Data de Início</p>
                                    <p className="font-medium">{campaign.startDate}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <div>
                                    <p className="text-muted-foreground text-xs">Data de Término</p>
                                    <p className="font-medium">{campaign.endDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Goals */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <Target className="h-5 w-5" />
                            Metas e Resultados
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                <Target className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <div>
                                    <p className="text-muted-foreground text-xs">Meta</p>
                                    <p className="font-medium">{campaign.goal}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                                <TrendingUp className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                                <div>
                                    <p className="text-emerald-600 text-xs">Arrecadado</p>
                                    <p className="font-medium text-emerald-700">{campaign.collected}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-border/50 flex justify-end">
                    <button
                        onClick={onClose}
                        className="h-10 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    )
}