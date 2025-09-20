"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Save, User, Mail, Lock, UserCog, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"

interface VolunteerFormData {
    id?: number
    name: string
    email: string
    password: string
    type: "Coordinator" | "Volunteer"
    created_at?: string
    updated_at?: string
}

interface VolunteerFormProps {
    mode: "create" | "edit"
    initialData?: VolunteerFormData
    onSubmit: (data: VolunteerFormData) => Promise<void>
    isLoading?: boolean
}

export function VolunteerForm({ mode, initialData, onSubmit, isLoading = false }: VolunteerFormProps) {
    const router = useRouter()
    const [formData, setFormData] = useState<VolunteerFormData>({
        name: "",
        email: "",
        password: "",
        type: "Volunteer",
        ...initialData
    })

    const [errors, setErrors] = useState<Partial<VolunteerFormData>>({})

    const validateForm = () => {
        const newErrors: Partial<VolunteerFormData> = {}

        if (!formData.name.trim()) {
            newErrors.name = "Nome é obrigatório"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email é obrigatório"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email inválido"
        }

        if (mode === "create" && !formData.password.trim()) {
            newErrors.password = "Senha é obrigatória"
        } else if (formData.password && formData.password.length < 6) {
            newErrors.password = "Senha deve ter pelo menos 6 caracteres"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!validateForm()) return

        const submitData = {
            ...formData,
            updated_at: new Date().toISOString(),
            ...(mode === "create" && { created_at: new Date().toISOString() })
        }

        await onSubmit(submitData)
    }

    const handleChange = (field: keyof VolunteerFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
        
        // Limpar erro quando o usuário começar a digitar
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: undefined
            }))
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <main className="w-full overflow-auto">
                <div className="p-4 md:p-6 space-y-6 md:space-y-8">
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
                                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                                <div className="space-y-1">
                                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                                        {mode === "create" ? "Cadastrar Voluntário" : "Editar Voluntário"}
                                    </h1>
                                    <p className="text-sm md:text-base text-muted-foreground">
                                        {mode === "create" 
                                            ? "Adicione um novo voluntário ao sistema"
                                            : "Edite as informações do voluntário"
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
                                {/* Nome */}
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        Nome Completo
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={formData.name}
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

                                {/* Email */}
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                        placeholder="Digite o email"
                                        className={`w-full h-12 px-4 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                                            errors.email ? "border-red-500" : "border-border"
                                        }`}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>

                                {/* Senha */}
                                <div className="space-y-2">
                                    <label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                                        <Lock className="h-4 w-4" />
                                        {mode === "create" ? "Senha" : "Nova Senha (deixe em branco para manter)"}
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => handleChange("password", e.target.value)}
                                        placeholder={mode === "create" ? "Digite a senha" : "Digite a nova senha"}
                                        className={`w-full h-12 px-4 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                                            errors.password ? "border-red-500" : "border-border"
                                        }`}
                                    />
                                    {errors.password && (
                                        <p className="text-sm text-red-600">{errors.password}</p>
                                    )}
                                </div>

                                {/* Tipo */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center gap-2">
                                        <UserCog className="h-4 w-4" />
                                        Tipo de Voluntário
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => handleChange("type", "Volunteer")}
                                            className={`h-12 px-4 rounded-lg border transition-colors text-sm font-medium ${
                                                formData.type === "Volunteer"
                                                    ? "bg-emerald-600 text-white border-emerald-600"
                                                    : "bg-background border-border hover:bg-accent"
                                            }`}
                                        >
                                            Voluntário
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleChange("type", "Coordinator")}
                                            className={`h-12 px-4 rounded-lg border transition-colors text-sm font-medium ${
                                                formData.type === "Coordinator"
                                                    ? "bg-emerald-600 text-white border-emerald-600"
                                                    : "bg-background border-border hover:bg-accent"
                                            }`}
                                        >
                                            Coordenador
                                        </button>
                                    </div>
                                </div>

                                {/* Datas (apenas para modo edição) */}
                                {mode === "edit" && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                                                <Calendar className="h-4 w-4" />
                                                Criado em
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.created_at ? new Date(formData.created_at).toLocaleString('pt-BR') : ''}
                                                disabled
                                                className="w-full h-12 px-4 border rounded-lg bg-muted text-muted-foreground cursor-not-allowed"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                                                <Calendar className="h-4 w-4" />
                                                Atualizado em
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.updated_at ? new Date(formData.updated_at).toLocaleString('pt-BR') : ''}
                                                disabled
                                                className="w-full h-12 px-4 border rounded-lg bg-muted text-muted-foreground cursor-not-allowed"
                                            />
                                        </div>
                                    </div>
                                )}

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
        </div>
    )
}