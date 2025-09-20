"use client"

import { X, User, Mail, Phone, MapPin, Calendar, UserCog, Users } from "lucide-react"

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

interface VolunteerViewModalProps {
    volunteer: Volunteer | null
    isOpen: boolean
    onClose: () => void
}

export function VolunteerViewModal({ volunteer, isOpen, onClose }: VolunteerViewModalProps) {
    if (!isOpen || !volunteer) return null

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border/50 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-foreground">
                                Detalhes do Voluntário
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Informações completas do cadastro
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="h-8 w-8 rounded-md hover:bg-accent transition-colors flex items-center justify-center"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Photo and Basic Info */}
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                            {volunteer.type === "Coordinator" ? (
                                <UserCog className="w-10 h-10 text-emerald-600" />
                            ) : (
                                <User className="w-10 h-10 text-emerald-600" />
                            )}
                        </div>
                        <div className="flex-1 space-y-2">
                            <h3 className="text-2xl font-bold text-foreground">
                                {volunteer.name}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                    volunteer.type === "Coordinator"
                                        ? "bg-blue-100 text-blue-800 border border-blue-200"
                                        : "bg-green-100 text-green-800 border border-green-200"
                                }`}>
                                    {volunteer.type === "Coordinator" ? "Coordenador" : "Voluntário"}
                                </span>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                    volunteer.active
                                        ? "bg-green-100 text-green-800 border border-green-200"
                                        : "bg-red-100 text-red-800 border border-red-200"
                                }`}>
                                    {volunteer.active ? "Ativo" : "Inativo"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <Mail className="h-5 w-5" />
                            Informações de Contato
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <div>
                                    <p className="text-muted-foreground text-xs">Email</p>
                                    <p className="font-medium">{volunteer.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <div>
                                    <p className="text-muted-foreground text-xs">Telefone</p>
                                    <p className="font-medium">{volunteer.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            Endereço
                        </h4>
                        <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                            <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-muted-foreground text-xs">Endereço Completo</p>
                                <p className="font-medium text-pretty">{volunteer.address}</p>
                            </div>
                        </div>
                    </div>

                    {/* Areas of Activity */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Áreas de Atuação
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {volunteer.areas.map((area, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-800 border border-emerald-200"
                                >
                                    {area}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Registration Date */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Informações do Cadastro
                        </h4>
                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <div>
                                <p className="text-muted-foreground text-xs">Data de Cadastro</p>
                                <p className="font-medium">{volunteer.joinDate}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-border/50 flex justify-end">
                    <button
                        onClick={onClose}
                        className="h-10 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    )
}