"use client"

import { AlertTriangle, X } from "lucide-react"

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

interface VolunteerDeleteModalProps {
    volunteer: Volunteer | null
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    isLoading?: boolean
}

export function VolunteerDeleteModal({ 
    volunteer, 
    isOpen, 
    onClose, 
    onConfirm, 
    isLoading = false 
}: VolunteerDeleteModalProps) {
    if (!isOpen || !volunteer) return null

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
                                Tem certeza que deseja excluir este voluntário?
                            </p>
                            <p className="text-muted-foreground mt-2">
                                Você está prestes a excluir o voluntário:
                            </p>
                        </div>
                    </div>

                    {/* Volunteer Info Card */}
                    <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-emerald-600 font-semibold text-sm">
                                    {volunteer.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="min-w-0 flex-1">
                                <h4 className="font-semibold text-foreground truncate">
                                    {volunteer.name}
                                </h4>
                                <p className="text-sm text-muted-foreground truncate">
                                    {volunteer.email}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                        volunteer.type === "Coordinator"
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-green-100 text-green-800"
                                    }`}>
                                        {volunteer.type === "Coordinator" ? "Coordenador" : "Voluntário"}
                                    </span>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                        volunteer.active
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                    }`}>
                                        {volunteer.active ? "Ativo" : "Inativo"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex gap-3">
                            <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-red-800">
                                <p className="font-medium mb-1">Atenção:</p>
                                <ul className="space-y-1 text-sm">
                                    <li>• Todos os dados do voluntário serão permanentemente removidos</li>
                                    <li>• Esta ação não pode ser desfeita</li>
                                    <li>• Histórico de participações será perdido</li>
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