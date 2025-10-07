"use client"

import { useState, useEffect } from "react"
import { X, UserPlus, User, Calendar, Users as UsersIcon } from "lucide-react"
import { relationshipTypes } from "@/mocks/Families"

interface FamilyMember {
    id?: number
    name: string
    age: number
    relationship: string
}

interface AddMemberModalProps {
    isOpen: boolean
    onClose: () => void
    onAdd: (member: FamilyMember) => void
    editingMember?: FamilyMember | null
}

export function AddMemberModal({ isOpen, onClose, onAdd, editingMember }: AddMemberModalProps) {
    const [memberData, setMemberData] = useState<FamilyMember>({
        name: "",
        age: 0,
        relationship: "Filho(a)"
    })

    const [errors, setErrors] = useState<{ [K in keyof FamilyMember]?: string }>({})

    useEffect(() => {
        if (editingMember) {
            setMemberData(editingMember)
        } else {
            setMemberData({
                name: "",
                age: 0,
                relationship: "Filho(a)"
            })
        }
        setErrors({})
    }, [editingMember, isOpen])

    const validateForm = () => {
        const newErrors: { [K in keyof FamilyMember]?: string } = {}

        if (!memberData.name.trim()) {
            newErrors.name = "Nome é obrigatório"
        }

        if (!memberData.age || memberData.age <= 0) {
            newErrors.age = "Idade deve ser maior que 0"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        onAdd(memberData)
        setMemberData({
            name: "",
            age: 0,
            relationship: "Filho(a)"
        })
        setErrors({})
    }

    const handleChange = (field: keyof FamilyMember, value: string | number) => {
        setMemberData(prev => ({
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

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border/50 rounded-lg shadow-2xl max-w-md w-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <UserPlus className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-foreground">
                                {editingMember ? "Editar Membro" : "Adicionar Membro"}
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                {editingMember ? "Atualize as informações do membro" : "Adicione um novo membro à família"}
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
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Nome */}
                        <div className="space-y-2">
                            <label htmlFor="memberName" className="text-sm font-medium flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Nome Completo
                            </label>
                            <input
                                id="memberName"
                                type="text"
                                value={memberData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                placeholder="Digite o nome completo"
                                className={`w-full h-12 px-4 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                                    errors.name ? "border-red-500" : "border-border"
                                }`}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        {/* Idade */}
                        <div className="space-y-2">
                            <label htmlFor="memberAge" className="text-sm font-medium flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Idade
                            </label>
                            <input
                                id="memberAge"
                                type="number"
                                min="0"
                                max="150"
                                value={memberData.age || ""}
                                onChange={(e) => handleChange("age", parseInt(e.target.value) || 0)}
                                placeholder="Digite a idade"
                                className={`w-full h-12 px-4 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                                    errors.age ? "border-red-500" : "border-border"
                                }`}
                            />
                            {errors.age && (
                                <p className="text-sm text-red-600">{errors.age}</p>
                            )}
                        </div>

                        {/* Parentesco */}
                        <div className="space-y-2">
                            <label htmlFor="memberRelationship" className="text-sm font-medium flex items-center gap-2">
                                <UsersIcon className="h-4 w-4" />
                                Parentesco
                            </label>
                            <select
                                id="memberRelationship"
                                value={memberData.relationship}
                                onChange={(e) => handleChange("relationship", e.target.value)}
                                className="w-full h-12 px-4 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                            >
                                {relationshipTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Botões */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 h-10 px-6 border border-border rounded-lg bg-background hover:bg-accent transition-colors text-sm font-medium"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="flex-1 h-10 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm font-medium inline-flex items-center justify-center gap-2"
                            >
                                <UserPlus className="h-4 w-4" />
                                {editingMember ? "Atualizar" : "Adicionar"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}