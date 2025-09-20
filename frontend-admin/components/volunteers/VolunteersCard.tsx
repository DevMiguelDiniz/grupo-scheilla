"use client"

import { useState } from "react"
import { UserCog, User, Mail, Phone, Eye, Edit, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { VolunteerViewModal } from "./VolunteerViewModal"
import { VolunteerDeleteModal } from "./VolunteerDeleteModal"

interface Volunteer {
    id: number
    name: string
    email: string
    phone: string
    address: string
    type: string
    joinDate: string
    active: boolean
    areas: string[]
}

interface VolunteerCardProps {
    volunteer: Volunteer
}

export function VolunteerCard({ volunteer }: VolunteerCardProps) {
    const router = useRouter()
    const [showViewModal, setShowViewModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleEdit = () => {
        router.push(`/voluntarios/${volunteer.id}/editar`)
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
            console.log("Excluindo voluntário:", volunteer.id)
            await new Promise(resolve => setTimeout(resolve, 1500))
            alert("Voluntário excluído com sucesso!")
            window.location.reload()
        } catch (error) {
            console.error("Erro ao excluir voluntário:", error)
            alert("Erro ao excluir voluntário. Tente novamente.")
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
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    {volunteer.type === "Coordinator" ? (
                                        <UserCog className="w-6 h-6 text-blue-500" />
                                    ) : (
                                        <User className="w-6 h-6 text-blue-600" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-foreground mb-2">
                                        {volunteer.name}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                            volunteer.type === "Coordinator"
                                                ? "bg-blue-100 text-blue-800 border border-blue-200"
                                                : "bg-green-100 text-green-800 border border-green-200"
                                        }`}>
                                            {volunteer.type === "Coordinator" ? "Coordenador" : "Voluntário"}
                                        </span>
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                            volunteer.active
                                                ? "bg-green-100 text-green-800 border border-green-200"
                                                : "bg-red-100 text-red-800 border border-red-200"
                                        }`}>
                                            {volunteer.active ? "Ativo" : "Inativo"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-1 gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 flex-shrink-0" />
                                <span className="truncate">{volunteer.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 flex-shrink-0" />
                                {volunteer.phone}
                            </div>
                            <div className="flex items-center gap-2">
                                <strong>Domingos de atuação:</strong> {volunteer.areas.join(", ")}
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
            <VolunteerViewModal
                volunteer={volunteer}
                isOpen={showViewModal}
                onClose={() => setShowViewModal(false)}
            />

            <VolunteerDeleteModal
                volunteer={volunteer}
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                isLoading={isDeleting}
            />
        </>
    )
}