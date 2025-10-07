"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FamilyForm } from "@/components/families/FamilyForm"
import { Sidebar } from "@/components/sidebar/sidebar"

interface FamilyMember {
    id?: number
    name: string
    age: number
    relationship: string
}

interface FamilyFormData {
    id?: number
    responsibleName: string
    address: string
    phone: string
    members: number
    registrationDate: string
    status: string
    observations: string
    membersList: FamilyMember[]
}

export default function CreateFamilyPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (data: FamilyFormData) => {
        setIsLoading(true)

        try {
            const today = new Date()
            const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`

            const familyData = {
                ...data,
                registrationDate: formattedDate,
                status: "active",
                members: data.membersList.length
            }

            console.log("Dados para criar:", familyData)

            await new Promise(resolve => setTimeout(resolve, 1500))

            alert("Família cadastrada com sucesso!")
            router.push("/familias")
        } catch (error) {
            console.error("Erro ao criar família:", error)
            alert("Erro ao cadastrar família. Tente novamente.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background flex">
            <Sidebar activeRoute="/familias" />
            <div className="flex-1 mt-6 overflow-auto">
                <FamilyForm
                    mode="create"
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}