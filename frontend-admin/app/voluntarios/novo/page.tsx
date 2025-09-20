"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { VolunteerForm } from "@/components/volunteers/VolunteerForm"
import { Sidebar } from "../../../components/sidebar/sidebar"

interface VolunteerFormData {
    id?: number
    name: string
    email: string
    password: string
    type: "Coordinator" | "Volunteer"
    created_at?: string
    updated_at?: string
}

export default function CreateVolunteerPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (data: VolunteerFormData) => {
        setIsLoading(true)

        try {
            // Aqui você faria a chamada para a API
            console.log("Dados para criar:", data)

            // Simular delay de API
            await new Promise(resolve => setTimeout(resolve, 1500))

            // Simulação de sucesso
            alert("Voluntário cadastrado com sucesso!")
            router.push("/voluntarios")
        } catch (error) {
            console.error("Erro ao criar voluntário:", error)
            alert("Erro ao cadastrar voluntário. Tente novamente.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background flex">
            <Sidebar activeRoute="/voluntarios" />
            <div className="flex-1 mt-6 overflow-auto">
                <VolunteerForm
                    mode="create"
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}