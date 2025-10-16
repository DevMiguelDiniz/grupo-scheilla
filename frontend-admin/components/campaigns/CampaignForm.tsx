"use client"

import { useState } from "react"
import { ArrowLeft, Save, Megaphone, FileText, Calendar, Target, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { campaignTypes } from "@/mocks/Campaigns"

interface CampaignFormData {
    id?: number
    title: string
    description: string
    startDate: string
    endDate: string
    type: string
    status: string
    goal: string
    collected: string
    isSingleDay?: boolean
}

interface CampaignFormProps {
    mode: "create" | "edit"
    initialData?: CampaignFormData
    onSubmit: (data: CampaignFormData) => Promise<void>
    isLoading?: boolean
}

export function CampaignForm({ mode, initialData, onSubmit, isLoading = false }: CampaignFormProps) {
    const router = useRouter()

    // Detectar se é evento de um dia baseado nas datas iguais
    const detectSingleDay = (data?: CampaignFormData) => {
        if (!data) return true
        return data.startDate === data.endDate
    }

    const [formData, setFormData] = useState<CampaignFormData>({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        type: "Doação de Alimentos",
        status: "future",
        goal: "",
        collected: "0",
        isSingleDay: detectSingleDay(initialData),
        ...initialData
    })

    const [errors, setErrors] = useState<Partial<CampaignFormData>>({})

    const validateForm = () => {
        const newErrors: Partial<CampaignFormData> = {}

        if (!formData.title.trim()) {
            newErrors.title = "Título é obrigatório"
        }

        if (!formData.description.trim()) {
            newErrors.description = "Descrição é obrigatória"
        }

        if (!formData.startDate) {
            newErrors.startDate = "Data é obrigatória"
        }

        if (!formData.isSingleDay && !formData.endDate) {
            newErrors.endDate = "Data de término é obrigatória"
        }

        if (!formData.isSingleDay && formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
            newErrors.endDate = "Data de término deve ser posterior à data de início"
        }

        if (!formData.goal.trim()) {
            newErrors.goal = "Meta é obrigatória"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        // Se for evento de um dia, a data de término é igual à de início
        const submitData = {
            ...formData,
            endDate: formData.isSingleDay ? formData.startDate : formData.endDate
        }

        await onSubmit(submitData)
    }

    const handleChange = (field: keyof CampaignFormData, value: string | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))

        if (errors[field as keyof Partial<CampaignFormData>]) {
            setErrors(prev => ({
                ...prev,
                [field]: undefined
            }))
        }
    }

    const handleDateTypeChange = (isSingleDay: boolean) => {
        setFormData(prev => ({
            ...prev,
            isSingleDay,
            endDate: isSingleDay ? prev.startDate : prev.endDate
        }))
    }

    const formatDateForInput = (dateString: string) => {
        if (!dateString) return ""
        const parts = dateString.split("/")
        if (parts.length === 3) {
            return `${parts[2]}-${parts[1]}-${parts[0]}`
        }
        return dateString
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
                                        {mode === "create" ? "Cadastrar Campanha" : "Editar Campanha"}
                                    </h1>
                                    <p className="text-sm md:text-base text-muted-foreground">
                                        {mode === "create"
                                            ? "Adicione uma nova campanha ao sistema"
                                            : "Edite as informações da campanha"
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
                                {/* Título */}
                                <div className="space-y-2">
                                    <label htmlFor="title" className="text-sm font-medium flex items-center gap-2">
                                        <Megaphone className="h-4 w-4" />
                                        Título da Campanha
                                    </label>
                                    <input
                                        id="title"
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => handleChange("title", e.target.value)}
                                        placeholder="Digite o título da campanha"
                                        className={`w-full h-12 px-4 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                                            errors.title ? "border-red-500" : "border-border"
                                        }`}
                                    />
                                    {errors.title && (
                                        <p className="text-sm text-red-600">{errors.title}</p>
                                    )}
                                </div>

                                {/* Descrição */}
                                <div className="space-y-2">
                                    <label htmlFor="description" className="text-sm font-medium flex items-center gap-2">
                                        <FileText className="h-4 w-4" />
                                        Descrição
                                    </label>
                                    <textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => handleChange("description", e.target.value)}
                                        placeholder="Descreva os objetivos e detalhes da campanha"
                                        rows={4}
                                        className={`w-full px-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none ${
                                            errors.description ? "border-red-500" : "border-border"
                                        }`}
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-600">{errors.description}</p>
                                    )}
                                </div>

                                {/* Tipo de Data */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        Duração do Evento
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => handleDateTypeChange(true)}
                                            className={`h-12 px-4 rounded-lg border transition-colors text-sm font-medium ${
                                                formData.isSingleDay
                                                    ? "bg-emerald-600 text-white border-emerald-600"
                                                    : "bg-background border-border hover:bg-accent"
                                            }`}
                                        >
                                            Evento de 1 dia
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDateTypeChange(false)}
                                            className={`h-12 px-4 rounded-lg border transition-colors text-sm font-medium ${
                                                !formData.isSingleDay
                                                    ? "bg-emerald-600 text-white border-emerald-600"
                                                    : "bg-background border-border hover:bg-accent"
                                            }`}
                                        >
                                            Período (vários dias)
                                        </button>
                                    </div>
                                </div>

                                {/* Datas */}
                                {formData.isSingleDay ? (
                                    // Data única
                                    <div className="space-y-2">
                                        <label htmlFor="startDate" className="text-sm font-medium flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            Data do Evento
                                        </label>
                                        <input
                                            id="startDate"
                                            type="date"
                                            value={mode === "edit" && formData.startDate.includes("/")
                                                ? formatDateForInput(formData.startDate)
                                                : formData.startDate}
                                            onChange={(e) => {
                                                handleChange("startDate", e.target.value)
                                                handleChange("endDate", e.target.value)
                                            }}
                                            className={`w-full h-12 px-4 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                                                errors.startDate ? "border-red-500" : "border-border"
                                            }`}
                                        />
                                        {errors.startDate && (
                                            <p className="text-sm text-red-600">{errors.startDate}</p>
                                        )}
                                    </div>
                                ) : (
                                    // Período com início e fim
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="startDate" className="text-sm font-medium flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                Data de Início
                                            </label>
                                            <input
                                                id="startDate"
                                                type="date"
                                                value={mode === "edit" && formData.startDate.includes("/")
                                                    ? formatDateForInput(formData.startDate)
                                                    : formData.startDate}
                                                onChange={(e) => handleChange("startDate", e.target.value)}
                                                className={`w-full h-12 px-4 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                                                    errors.startDate ? "border-red-500" : "border-border"
                                                }`}
                                            />
                                            {errors.startDate && (
                                                <p className="text-sm text-red-600">{errors.startDate}</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="endDate" className="text-sm font-medium flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                Data de Término
                                            </label>
                                            <input
                                                id="endDate"
                                                type="date"
                                                value={mode === "edit" && formData.endDate.includes("/")
                                                    ? formatDateForInput(formData.endDate)
                                                    : formData.endDate}
                                                onChange={(e) => handleChange("endDate", e.target.value)}
                                                className={`w-full h-12 px-4 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                                                    errors.endDate ? "border-red-500" : "border-border"
                                                }`}
                                            />
                                            {errors.endDate && (
                                                <p className="text-sm text-red-600">{errors.endDate}</p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Tipo */}
                                <div className="space-y-2">
                                    <label htmlFor="type" className="text-sm font-medium flex items-center gap-2">
                                        <Target className="h-4 w-4" />
                                        Tipo de Campanha
                                    </label>
                                    <select
                                        id="type"
                                        value={formData.type}
                                        onChange={(e) => handleChange("type", e.target.value)}
                                        className="w-full h-12 px-4 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                    >
                                        {campaignTypes.filter(t => t !== "Todos").map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/*/!* Meta *!/*/}
                                {/*<div className="space-y-2">*/}
                                {/*    <label htmlFor="goal" className="text-sm font-medium flex items-center gap-2">*/}
                                {/*        <Target className="h-4 w-4" />*/}
                                {/*        Meta da Campanha*/}
                                {/*    </label>*/}
                                {/*    <input*/}
                                {/*        id="goal"*/}
                                {/*        type="text"*/}
                                {/*        value={formData.goal}*/}
                                {/*        onChange={(e) => handleChange("goal", e.target.value)}*/}
                                {/*        placeholder="Ex: 500 cestas básicas, 100 participantes, etc."*/}
                                {/*        className={`w-full h-12 px-4 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${*/}
                                {/*            errors.goal ? "border-red-500" : "border-border"*/}
                                {/*        }`}*/}
                                {/*    />*/}
                                {/*    {errors.goal && (*/}
                                {/*        <p className="text-sm text-red-600">{errors.goal}</p>*/}
                                {/*    )}*/}
                                {/*</div>*/}

                                {/* Arrecadado (apenas para edição) */}
                                {mode === "edit" && (
                                    <div className="space-y-2">
                                        <label htmlFor="collected" className="text-sm font-medium flex items-center gap-2">
                                            <TrendingUp className="h-4 w-4" />
                                            Arrecadado até o momento
                                        </label>
                                        <input
                                            id="collected"
                                            type="text"
                                            value={formData.collected}
                                            onChange={(e) => handleChange("collected", e.target.value)}
                                            placeholder="Ex: 320 cestas básicas"
                                            className="w-full h-12 px-4 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                        />
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