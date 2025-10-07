"use client"

import { useState } from "react"
import { ArrowLeft, Save, Users, MapPin, Phone, FileText, UserPlus, Trash2, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"
import { AddMemberModal } from "./AddMemberModal"

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

interface FamilyFormProps {
    mode: "create" | "edit"
    initialData?: FamilyFormData
    onSubmit: (data: FamilyFormData) => Promise<void>
    isLoading?: boolean
}

export function FamilyForm({ mode, initialData, onSubmit, isLoading = false }: FamilyFormProps) {
    const router = useRouter()
    const [showAddMemberModal, setShowAddMemberModal] = useState(false)
    const [editingMember, setEditingMember] = useState<FamilyMember | null>(null)
    const [editingMemberIndex, setEditingMemberIndex] = useState<number | null>(null)

    const [formData, setFormData] = useState<FamilyFormData>({
        responsibleName: "",
        address: "",
        phone: "",
        members: 0,
        registrationDate: "",
        status: "active",
        observations: "",
        membersList: [],
        ...initialData
    })

    const [errors, setErrors] = useState<Partial<FamilyFormData>>({})

    const validateForm = () => {
        const newErrors: Partial<FamilyFormData> = {}

        if (!formData.responsibleName.trim()) {
            newErrors.responsibleName = "Nome do responsável é obrigatório"
        }

        if (!formData.address.trim()) {
            newErrors.address = "Endereço é obrigatório"
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Telefone é obrigatório"
        }

        if (formData.membersList.length === 0) {
            alert("Adicione pelo menos um membro à família")
            return false
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        await onSubmit(formData)
    }

    const handleChange = (field: keyof FamilyFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))

        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: undefined
            }))
        }
    }

    const handleAddMember = (member: FamilyMember) => {
        if (editingMemberIndex !== null) {
            // Editando membro existente
            const updatedMembers = [...formData.membersList]
            updatedMembers[editingMemberIndex] = member
            setFormData(prev => ({
                ...prev,
                membersList: updatedMembers,
                members: updatedMembers.length
            }))
            setEditingMemberIndex(null)
            setEditingMember(null)
        } else {
            // Adicionando novo membro
            setFormData(prev => ({
                ...prev,
                membersList: [...prev.membersList, member],
                members: prev.membersList.length + 1
            }))
        }
        setShowAddMemberModal(false)
    }

    const handleEditMember = (index: number) => {
        setEditingMember(formData.membersList[index])
        setEditingMemberIndex(index)
        setShowAddMemberModal(true)
    }

    const handleRemoveMember = (index: number) => {
        if (confirm("Tem certeza que deseja remover este membro?")) {
            const updatedMembers = formData.membersList.filter((_, i) => i !== index)
            setFormData(prev => ({
                ...prev,
                membersList: updatedMembers,
                members: updatedMembers.length
            }))
        }
    }

    const handleCloseModal = () => {
        setShowAddMemberModal(false)
        setEditingMember(null)
        setEditingMemberIndex(null)
    }

    return (
        <div className="min-h-screen bg-background">
            <main className="w-full overflow-auto">
                <div className="p-4 md:p-10 space-y-8 md:space-y-8">
                    {/* Header */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.back()}
                                className="h-10 w-10 bg-card border border-border/50 rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="space-y-1">
                                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                                        {mode === "create" ? "Cadastrar Família" : "Editar Família"}
                                    </h1>
                                    <p className="text-sm md:text-base text-muted-foreground">
                                        {mode === "create"
                                            ? "Adicione uma nova família ao sistema"
                                            : "Edite as informações da família"
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-card border border-border/50 rounded-lg shadow-sm">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Nome do Responsável */}
                                <div className="space-y-2">
                                    <label htmlFor="responsibleName" className="text-sm font-medium flex items-center gap-2">
                                        <Users className="h-4 w-4" />
                                        Nome do Responsável
                                    </label>
                                    <input
                                        id="responsibleName"
                                        type="text"
                                        value={formData.responsibleName}
                                        onChange={(e) => handleChange("responsibleName", e.target.value)}
                                        placeholder="Digite o nome completo do responsável"
                                        className={`w-full h-12 px-4 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                                            errors.responsibleName ? "border-red-500" : "border-border"
                                        }`}
                                    />
                                    {errors.responsibleName && (
                                        <p className="text-sm text-red-600">{errors.responsibleName}</p>
                                    )}
                                </div>

                                {/* Endereço */}
                                <div className="space-y-2">
                                    <label htmlFor="address" className="text-sm font-medium flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        Endereço Completo
                                    </label>
                                    <input
                                        id="address"
                                        type="text"
                                        value={formData.address}
                                        onChange={(e) => handleChange("address", e.target.value)}
                                        placeholder="Rua, número, bairro, cidade"
                                        className={`w-full h-12 px-4 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                                            errors.address ? "border-red-500" : "border-border"
                                        }`}
                                    />
                                    {errors.address && (
                                        <p className="text-sm text-red-600">{errors.address}</p>
                                    )}
                                </div>

                                {/* Telefone */}
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                                        <Phone className="h-4 w-4" />
                                        Telefone de Contato
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleChange("phone", e.target.value)}
                                        placeholder="(00) 00000-0000"
                                        className={`w-full h-12 px-4 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                                            errors.phone ? "border-red-500" : "border-border"
                                        }`}
                                    />
                                    {errors.phone && (
                                        <p className="text-sm text-red-600">{errors.phone}</p>
                                    )}
                                </div>

                                {/* Observações */}
                                <div className="space-y-2">
                                    <label htmlFor="observations" className="text-sm font-medium flex items-center gap-2">
                                        <FileText className="h-4 w-4" />
                                        Observações
                                    </label>
                                    <textarea
                                        id="observations"
                                        value={formData.observations}
                                        onChange={(e) => handleChange("observations", e.target.value)}
                                        placeholder="Informações adicionais sobre a família (necessidades, observações, etc.)"
                                        rows={4}
                                        className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                                    />
                                </div>

                                {/* Membros da Família */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium flex items-center gap-2">
                                            <Users className="h-4 w-4" />
                                            Membros da Família ({formData.membersList.length})
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => setShowAddMemberModal(true)}
                                            className="h-10 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm font-medium inline-flex items-center gap-2"
                                        >
                                            <UserPlus className="h-4 w-4" />
                                            Adicionar Membro
                                        </button>
                                    </div>

                                    {formData.membersList.length > 0 ? (
                                        <div className="border border-border rounded-lg overflow-hidden">
                                            <div className="overflow-x-auto">
                                                <table className="w-full">
                                                    <thead className="bg-muted/50">
                                                    <tr>
                                                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Nome</th>
                                                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Idade</th>
                                                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Parentesco</th>
                                                        <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Ações</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-border">
                                                    {formData.membersList.map((member, index) => (
                                                        <tr key={index} className="hover:bg-muted/30">
                                                            <td className="px-4 py-3 text-sm">{member.name}</td>
                                                            <td className="px-4 py-3 text-sm">{member.age} anos</td>
                                                            <td className="px-4 py-3 text-sm">{member.relationship}</td>
                                                            <td className="px-4 py-3 text-sm text-right">
                                                                <div className="flex items-center justify-end gap-2">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleEditMember(index)}
                                                                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                                                    >
                                                                        Editar
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleRemoveMember(index)}
                                                                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                                                                    >
                                                                        Remover
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="border border-dashed border-border rounded-lg p-8 text-center">
                                            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                                            <p className="text-muted-foreground">
                                                Nenhum membro adicionado ainda
                                            </p>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Clique em "Adicionar Membro" para começar
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Botões */}
                                <div className="flex flex-col sm:flex-row gap-3 pt-6">
                                    <button
                                        type="button"
                                        onClick={() => router.back()}
                                        className="flex-1 h-12 px-6 border border-border rounded-lg bg-background hover:bg-accent transition-colors text-sm font-medium"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="flex-1 h-12 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm font-medium inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Salvando...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="h-4 w-4" />
                                                {mode === "create" ? "Cadastrar" : "Salvar Alterações"}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal de Adicionar Membro */}
            <AddMemberModal
                isOpen={showAddMemberModal}
                onClose={handleCloseModal}
                onAdd={handleAddMember}
                editingMember={editingMember}
            />
        </div>
    )
}