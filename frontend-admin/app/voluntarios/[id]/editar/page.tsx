"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { VolunteerForm } from "@/components/Volunteers/VolunteerForm"
import { volunteers } from "@/data/Volunteers"

interface VolunteerFormData {
    id?: number
    name: string
    email: string
    password: string
    type: "Coordinator" | "Volunteer"
    created_at?: string
    updated_at?: string
}

export default function EditVolunteerPage() {
    const router = useRouter()
    const params = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [volunteer, setVolunteer] = useState<VolunteerFormData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Buscar dados do voluntário
        const fetchVolunteer = async () => {
            try {
                const volunteerId = parseInt(params.id as string)
                
                // Simular busca na API - usando dados mockados
                const found = volunteers.find(v => v.id === volunteerId)
                
                if (found) {
                    setVolunteer({
                        id: found.id,
                        name: found.name,
                        email: found.email,
                        password: "", // Não preenchemos a senha por segurança
                        type: found.type as "Coordinator" | "Volunteer",
                        created_at: "2023-01-15T10:00:00.000Z", // Mock
                        updated_at: "2023-12-20T15:30:00.000Z"  // Mock
                    })
                } else {
                    alert("Voluntário não encontrado!")
                    router.push("/voluntarios")
                }
            } catch (error) {
                console.error("Erro ao buscar voluntário:", error)
                alert("Erro ao carregar dados do voluntário.")
                router.push("/voluntarios")
            } finally {
                setLoading(false)
            }
        }

        if (params.id) {
            fetchVolunteer()
        }
    }, [params.id, router])

    const handleSubmit = async (data: VolunteerFormData) => {
        setIsLoading(true)
        
        try {
            // Aqui você faria a chamada para a API
            console.log("Dados para atualizar:", {
                ...data,
                id: volunteer?.id
            })
            
            // Simular delay de API
            await new Promise(resolve => setTimeout(resolve, 1500))
            
            // Simulação de sucesso
            alert("Voluntário atualizado com sucesso!")
            router.push("/voluntarios")
        } catch (error) {
            console.error("Erro ao atualizar voluntário:", error)
            alert("Erro ao atualizar voluntário. Tente novamente.")
        } finally {
            setIsLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-emerald-600/30 border-t-emerald-600 rounded-full animate-spin" />
                    <span className="text-muted-foreground">Carregando dados do voluntário...</span>
                </div>
            </div>
        )
    }

    if (!volunteer) {
        return null
    }

    return (
        <VolunteerForm
            mode="edit"
            initialData={volunteer}
            onSubmit={handleSubmit}
            isLoading={isLoading}
        />
    )
}