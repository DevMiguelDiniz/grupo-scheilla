"use client"

import { useState } from "react"
import { X, Package, Plus } from "lucide-react"

interface AddItemModalProps {
    isOpen: boolean
    onClose: () => void
    onAdd: (itemName: string) => void
}

export function AddItemModal({ isOpen, onClose, onAdd }: AddItemModalProps) {
    const [itemName, setItemName] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!itemName.trim()) {
            setError("Nome do item é obrigatório")
            return
        }

        onAdd(itemName.trim())
        setItemName("")
        setError("")
    }

    const handleClose = () => {
        setItemName("")
        setError("")
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border/50 rounded-lg shadow-2xl max-w-md w-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Package className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-foreground">
                                Cadastrar Novo Item
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Adicione um novo item ao estoque
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="h-8 w-8 rounded-md hover:bg-accent transition-colors flex items-center justify-center"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Nome do Item */}
                        <div className="space-y-2">
                            <label htmlFor="itemName" className="text-sm font-medium flex items-center gap-2">
                                <Package className="h-4 w-4" />
                                Nome do Item
                            </label>
                            <input
                                id="itemName"
                                type="text"
                                value={itemName}
                                onChange={(e) => {
                                    setItemName(e.target.value)
                                    setError("")
                                }}
                                placeholder="Ex: Arroz (kg), Feijão (pacote), etc."
                                className={`w-full h-12 px-4 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                                    error ? "border-red-500" : "border-border"
                                }`}
                                autoFocus
                            />
                            {error && (
                                <p className="text-sm text-red-600">{error}</p>
                            )}
                            <p className="text-xs text-muted-foreground">
                                Dica: Inclua a unidade de medida no nome (ex: kg, litro, pacote)
                            </p>
                        </div>

                        {/* Botões */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="flex-1 h-10 px-6 border border-border rounded-lg bg-background hover:bg-accent transition-colors text-sm font-medium"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="flex-1 h-10 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm font-medium inline-flex items-center justify-center gap-2"
                            >
                                <Plus className="h-4 w-4" />
                                Cadastrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}