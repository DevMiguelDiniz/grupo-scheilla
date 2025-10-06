"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CampaignForm } from "@/components/campaigns/CampaignForm"
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

export default function CreateCampaignPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (data: CampaignFormData) => {
        setIsLoading(true)

        try {
            // Formatar datas para o formato dd/mm/yyyy
            const formatDate = (dateString: string) => {
                const date = new Date(dateString)
                const day = String(date.getDate()).padStart(2, '0')
                const month = String(date.getMonth() + 1).padStart(2, '0')
                const year = date.getFullYear()
                return `${day}/${month}/${year}`
            }

            // Determinar o status baseado nas datas
            const now = new Date()
            const startDate = new Date(data.startDate)
            const endDate = new Date(data.endDate)

            let status = "future"
            if (now >= startDate && now <= endDate) {
                status = "active"
            } else if (now > endDate) {
                status = "past"
            }

            const campaignData = {
                ...data,
                startDate: formatDate(data.startDate),
                endDate: formatDate(data.endDate),
                status,
                collected: "0"
            }

            console.log("Dados para criar:", campaignData)

            // Simular delay de API
            await new Promise(resolve => setTimeout(resolve, 1500))

            alert("Campanha cadastrada com sucesso!")
            router.push("/campanhas")
        } catch (error) {
            console.error("Erro ao criar campanha:", error)
            alert("Erro ao cadastrar campanha. Tente novamente.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background flex">
            <Sidebar activeRoute="/campanhas" />
            <div className="flex-1 mt-6 overflow-auto">
                <CampaignForm
                    mode="create"
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}