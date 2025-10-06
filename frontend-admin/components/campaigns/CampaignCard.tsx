// components/campaigns/CampaignCard.tsx
"use client"

import { useState } from "react"
import { Megaphone, Calendar, Target, TrendingUp, Eye, Edit, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { CampaignViewModal } from "./CampaignViewModal"
import { CampaignDeleteModal } from "./CampaignDeleteModal"

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

interface CampaignCardProps {
    campaign: Campaign
}

export function CampaignCard({ campaign }: CampaignCardProps) {
    const router = useRouter()
    const [showViewModal, setShowViewModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

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

    const handleEdit = () => {
        router.push(`/campanhas/${campaign.id}/editar`)
    }

    const handleView = () => {
        setShowViewModal(true)
    }

    const handleDelete = () => {
        setShowDeleteModal(true)
    }

    const confirmDelete = async () => {
        setIsDeleting(true)

        try {
            console.log("Excluindo campanha:", campaign.id)
            await new Promise(resolve => setTimeout(resolve, 1500))
            alert("Campanha excluída com sucesso!")
            window.location.reload()
        } catch (error) {
            console.error("Erro ao excluir campanha:", error)
            alert("Erro ao excluir campanha. Tente novamente.")
        } finally {
            setIsDeleting(false)
            setShowDeleteModal(false)
        }
    }

    return (
        <>
            <div className="bg-card border border-border/50 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 md:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Main Information */}
                    <div className="flex-1 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                            <div className="flex items-start gap-3">
                                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Megaphone className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-foreground mb-2">
                                        {campaign.title}
                                    </h3>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                                            {getStatusLabel(campaign.status)}
                                        </span>
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                                            {campaign.type}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {campaign.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <div>
                                    <p className="text-muted-foreground text-xs">Período</p>
                                    <p className="font-medium">{campaign.startDate} - {campaign.endDate}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Target className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <div>
                                    <p className="text-muted-foreground text-xs">Meta</p>
                                    <p className="font-medium">{campaign.goal}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                                <div>
                                    <p className="text-muted-foreground text-xs">Arrecadado</p>
                                    <p className="font-medium text-emerald-600">{campaign.collected}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-row lg:flex-col gap-2 lg:min-w-[120px]">
                        <button
                            onClick={handleView}
                            className="flex-1 lg:w-full h-10 bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-200 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                        >
                            <Eye className="h-4 w-4" />
                            <span className="hidden sm:inline">Ver</span>
                        </button>
                        <button
                            onClick={handleEdit}
                            className="flex-1 lg:w-full h-10 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 border border-yellow-300 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                        >
                            <Edit className="h-4 w-4" />
                            <span className="hidden sm:inline">Editar</span>
                        </button>
                        <button
                            onClick={handleDelete}
                            className="flex-1 lg:w-full h-10 bg-red-100 hover:bg-red-200 text-red-700 border border-red-200 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                        >
                            <Trash2 className="h-4 w-4" />
                            <span className="hidden sm:inline">Excluir</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <CampaignViewModal
                campaign={campaign}
                isOpen={showViewModal}
                onClose={() => setShowViewModal(false)}
            />

            <CampaignDeleteModal
                campaign={campaign}
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                isLoading={isDeleting}
            />
        </>
    )
}