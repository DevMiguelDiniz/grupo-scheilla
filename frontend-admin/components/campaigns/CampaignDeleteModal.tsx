"use client"

import { AlertTriangle, X } from "lucide-react"

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

interface CampaignDeleteModalProps {
    campaign: Campaign | null
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    isLoading?: boolean
}

export function CampaignDeleteModal({
                                        campaign,
                                        isOpen,
                                        onClose,
                                        onConfirm,
                                        isLoading = false
                                    }: CampaignDeleteModalProps) {
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
            <div className="bg-card border border-border/50 rounded-lg shadow-2xl max-w-md w-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-foreground">
                                Confirmar Exclusão
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Esta ação não pode ser desfeita
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="h-8 w-8 rounded-md hover:bg-accent transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <div className="text-center space-y-3">
                        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto" />
                        <div>
                            <p className="text-lg font-medium text-foreground">
                                Tem certeza que deseja excluir esta campanha?
                            </p>
                            <p className="text-muted-foreground mt-2">
                                Você está prestes a excluir a campanha:
                            </p>
                        </div>
                    </div>

                    {/* Campaign Info Card */}
                    <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                        <div className="space-y-3">
                            <div>
                                <h4 className="font-semibold text-foreground text-lg">
                                    {campaign.title}
                                </h4>
                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                    {campaign.description}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                                    {getStatusLabel(campaign.status)}
                                </span>
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                                    {campaign.type}
                                </span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                <p><strong>Período:</strong> {campaign.startDate} - {campaign.endDate}</p>
                                <p><strong>Meta:</strong> {campaign.goal}</p>
                                <p><strong>Arrecadado:</strong> {campaign.collected}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex gap-3">
                            <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-red-800">
                                <p className="font-medium mb-1">Atenção:</p>
                                <ul className="space-y-1 text-sm">
                                    <li>• Todos os dados da campanha serão permanentemente removidos</li>
                                    <li>• Esta ação não pode ser desfeita</li>
                                    <li>• Histórico de arrecadações será perdido</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-border/50 flex flex-col sm:flex-row gap-3 sm:justify-end">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 sm:flex-none h-10 px-6 border border-border rounded-lg bg-background hover:bg-accent transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="flex-1 sm:flex-none h-10 px-6 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Excluindo...
                            </>
                        ) : (
                            <>
                                <AlertTriangle className="h-4 w-4" />
                                Confirmar Exclusão
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}