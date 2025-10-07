"use client"

import { X, Users, MapPin, Phone, FileText, Calendar, User } from "lucide-react"

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

interface FamilyViewModalProps {
    family: Family | null
    isOpen: boolean
    onClose: () => void
}

export function FamilyViewModal({ family, isOpen, onClose }: FamilyViewModalProps) {
    if (!isOpen || !family) return null

    const getStatusLabel = (status: string) => {
        return status === "active" ? "Ativa" : "Inativa"
    }

    const getStatusColor = (status: string) => {
        return status === "active"
            ? "bg-green-100 text-green-800 border-green-200"
            : "bg-gray-100 text-gray-800 border-gray-200"
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border/50 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-foreground">
                                Detalhes da Família
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
                    {/* Responsável e Status */}
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-foreground">
                            {family.responsibleName}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(family.status)}`}>
                                {getStatusLabel(family.status)}
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                                {family.members} {family.members === 1 ? "membro" : "membros"}
                            </span>
                        </div>
                    </div>

                    {/* Informações de Contato */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <Phone className="h-5 w-5" />
                            Informações de Contato
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <div>
                                    <p className="text-muted-foreground text-xs">Telefone</p>
                                    <p className="font-medium">{family.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <div>
                                    <p className="text-muted-foreground text-xs">Data de Cadastro</p>
                                    <p className="font-medium">{family.registrationDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Endereço */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            Endereço
                        </h4>
                        <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                            <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-muted-foreground text-xs">Endereço Completo</p>
                                <p className="font-medium text-pretty">{family.address}</p>
                            </div>
                        </div>
                    </div>

                    {/* Observações */}
                    {family.observations && (
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Observações
                            </h4>
                            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                                <p className="font-medium text-pretty">{family.observations}</p>
                            </div>
                        </div>
                    )}

                    {/* Membros da Família */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Membros da Família ({family.membersList.length})
                        </h4>
                        <div className="border border-border rounded-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-muted/50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Nome</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Idade</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Parentesco</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                    {family.membersList.map((member, index) => (
                                        <tr key={index} className="hover:bg-muted/30">
                                            <td className="px-4 py-3 text-sm font-medium">{member.name}</td>
                                            <td className="px-4 py-3 text-sm">{member.age} anos</td>
                                            <td className="px-4 py-3 text-sm">{member.relationship}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
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