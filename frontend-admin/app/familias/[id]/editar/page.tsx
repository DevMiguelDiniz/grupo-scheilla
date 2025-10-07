"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { FamilyForm } from "@/components/families/FamilyForm"
import { families } from "@/mocks/Families"
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

export default function EditFamilyPage() {
    const router = useRouter()
    const params = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [family, setFamily] = useState<FamilyFormData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFamily = async () => {
            try {
                const familyId = parseInt(params.id as string)
                const found = families.find(f => f.id === familyId)

                if (found) {
                    setFamily({
                        id: found.id,
                        responsibleName: found.responsibleName,
                        address: found.address,
                        phone: found.phone,
                        members: found.members,
                        registrationDate: found.registrationDate,
                        status: found.status,
                        observations: found.observations,
                        membersList: found.membersList
                    })
                } else {
                    alert("Família não encontrada!")
                    router.push("/familias")
                }
            } catch (error) {
                console.error("Erro ao buscar família:", error)
                alert("Erro ao carregar dados da família.")
                router.push("/familias")
            } finally {
                setLoading(false)
            }
        }

        if (params.id) {
            fetchFamily()
        }
    }, [params.id, router])

    const handleSubmit = async (data: FamilyFormData) => {
        setIsLoading(true)

        try {
            const familyData = {
                ...data,
                id: family?.id,
                members: data.membersList.length
            }

            console.log("Dados para atualizar:", familyData)

            await new Promise(resolve => setTimeout(resolve, 1500))

            alert("Família atualizada com sucesso!")
            router.push("/familias")
        } catch (error) {
            console.error("Erro ao atualizar família:", error)
            alert("Erro ao atualizar família. Tente novamente.")
        } finally {
            setIsLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex">
                <Sidebar activeRoute="/familias" />
                <div className="flex-1 md:ml-64 flex items-center justify-center">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 border-2 border-emerald-600/30 border-t-emerald-600 rounded-full animate-spin" />
                        <span className="text-muted-foreground">Carregando dados da família...</span>
                    </div>
                </div>
            </div>
        )
    }

    if (!family) {
        return null
    }

    return (
        <div className="min-h-screen bg-background flex">
            <Sidebar activeRoute="/familias" />
            <div className="flex-1 overflow-auto">
                <FamilyForm
                    mode="edit"
                    initialData={family}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}