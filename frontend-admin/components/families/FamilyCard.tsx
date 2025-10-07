"use client"

import { useState } from "react"
import { Users, MapPin, Phone, Eye, Edit, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { FamilyViewModal } from "./FamilyViewModal"
import { FamilyDeleteModal } from "./FamilyDeleteModal"

interface FamilyMember {
    id?: number
    name: string
    age: number
    relationship: string
}

interface Family {
    id: number
    responsibleName: string
    address: string
    phone: string
    members: number
    registrationDate: string
    status: string
    observations: string
    membersList: FamilyMember[]
}

interface FamilyCardProps {
    family: Family
}

export function FamilyCard({ family }: FamilyCardProps) {
    const router = useRouter()
    const [showViewModal, setShowViewModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const getStatusLabel = (status: string) => {
        return status === "active" ? "Ativa" : "Inativa"
    }

    const getStatusColor = (status: string) => {
        return status === "active"
            ? "bg-green-100 text-green-800 border-green-200"
            : "bg-gray-100 text-gray-800 border-gray-200"
    }

    const handleEdit = () => {
        router.push(`/familias/${family.id}/editar`)
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
            console.log("Excluindo família:", family.id)
            await new Promise(resolve => setTimeout(resolve, 1500))
            alert("Família excluída com sucesso!")
            window.location.reload()
        } catch (error) {
            console.error("Erro ao excluir família:", error)
            alert("Erro ao excluir família. Tente novamente.")
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
                                    <Users className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-foreground mb-2">
                                        {family.responsibleName}
                                    </h3>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(family.status)}`}>
                                            {getStatusLabel(family.status)}
                                        </span>
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                                            {family.members} {family.members === 1 ? "membro" : "membros"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <div>
                                    <p className="text-muted-foreground text-xs">Endereço</p>
                                    <p className="font-medium">{family.address}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <div>
                                    <p className="text-muted-foreground text-xs">Telefone</p>
                                    <p className="font-medium">{family.phone}</p>
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
            <FamilyViewModal
                family={family}
                isOpen={showViewModal}
                onClose={() => setShowViewModal(false)}
            />

            <FamilyDeleteModal
                family={family}
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                isLoading={isDeleting}
            />
        </>
    )
}