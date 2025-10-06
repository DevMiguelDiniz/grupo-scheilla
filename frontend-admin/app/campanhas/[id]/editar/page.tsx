"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { CampaignForm } from "@/components/campaigns/CampaignForm"
import { campaigns } from "@/mocks/Campaigns"
import { Sidebar } from "@/components/sidebar/sidebar"

interface CampaignFormData {
    id?: number
    title: string
    description: string
    startDate: string
    endDate: string
    type: string
    status: string
    goal: string
    collected: string
}

export default function EditCampaignPage() {
    const router = useRouter()
    const params = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [campaign, setCampaign] = useState<CampaignFormData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const campaignId = parseInt(params.id as string)

                const found = campaigns.find(c => c.id === campaignId)

                if (found) {
                    setCampaign({
                        id: found.id,
                        title: found.title,
                        description: found.description,
                        startDate: found.startDate,
                        endDate: found.endDate,
                        type: found.type,
                        status: found.status,
                        goal: found.goal,
                        collected: found.collected
                    })
                } else {
                    alert("Campanha não encontrada!")
                    router.push("/campanhas")
                }
            } catch (error) {
                console.error("Erro ao buscar campanha:", error)
                alert("Erro ao carregar dados da campanha.")
                router.push("/campanhas")
            } finally {
                setLoading(false)
            }
        }

        if (params.id) {
            fetchCampaign()
        }
    }, [params.id, router])

    const handleSubmit = async (data: CampaignFormData) => {
        setIsLoading(true)

        try {
            // Formatar datas se necessário
            const formatDate = (dateString: string) => {
                if (dateString.includes("-")) {
                    const date = new Date(dateString)
                    const day = String(date.getDate()).padStart(2, '0')
                    const month = String(date.getMonth() + 1).padStart(2, '0')
                    const year = date.getFullYear()
                    return `${day}/${month}/${year}`
                }
                return dateString
            }

            // Determinar o status baseado nas datas
            const now = new Date()
            const parseDateString = (dateStr: string) => {
                if (dateStr.includes("/")) {
                    const parts = dateStr.split("/")
                    return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]))
                }
                return new Date(dateStr)
            }

            const startDate = parseDateString(data.startDate)
            const endDate = parseDateString(data.endDate)

            let status = "future"
            if (now >= startDate && now <= endDate) {
                status = "active"
            } else if (now > endDate) {
                status = "past"
            }

            const campaignData = {
                ...data,
                id: campaign?.id,
                startDate: formatDate(data.startDate),
                endDate: formatDate(data.endDate),
                status
            }

            console.log("Dados para atualizar:", campaignData)

            await new Promise(resolve => setTimeout(resolve, 1500))

            alert("Campanha atualizada com sucesso!")
            router.push("/campanhas")
        } catch (error) {
            console.error("Erro ao atualizar campanha:", error)
            alert("Erro ao atualizar campanha. Tente novamente.")
        } finally {
            setIsLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex">
                <Sidebar activeRoute="/campanhas" />
                <div className="flex-1 md:ml-64 flex items-center justify-center">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 border-2 border-emerald-600/30 border-t-emerald-600 rounded-full animate-spin" />
                        <span className="text-muted-foreground">Carregando dados da campanha...</span>
                    </div>
                </div>
            </div>
        )
    }

    if (!campaign) {
        return null
    }

    return (
        <div className="min-h-screen bg-background flex">
            <Sidebar activeRoute="/campanhas" />
            <div className="flex-1 overflow-auto">
                <CampaignForm
                    mode="edit"
                    initialData={campaign}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}