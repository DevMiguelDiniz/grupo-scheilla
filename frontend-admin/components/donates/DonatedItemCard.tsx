// frontend-admin/components/donated-items/DonatedItemCard.tsx
"use client"

import { useState } from "react"
import { Package, Plus, Minus, Trash2, Calendar } from "lucide-react"

interface DonatedItem {
    id: number
    name: string
    quantity: number
    createdAt: string
    updatedAt: string
}

interface DonatedItemCardProps {
    item: DonatedItem
    onUpdateQuantity: (id: number, newQuantity: number) => void
    onDelete: (id: number) => void
}

export function DonatedItemCard({ item, onUpdateQuantity, onDelete }: DonatedItemCardProps) {
    const [inputValue, setInputValue] = useState("1")

    const handleAdd = () => {
        const valueToAdd = parseInt(inputValue) || 0
        if (valueToAdd > 0) {
            onUpdateQuantity(item.id, item.quantity + valueToAdd)
        }
    }

    const handleRemove = () => {
        const valueToRemove = parseInt(inputValue) || 0
        if (valueToRemove > 0) {
            const newQuantity = Math.max(0, item.quantity - valueToRemove)
            onUpdateQuantity(item.id, newQuantity)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value === "" || /^\d+$/.test(value)) {
            setInputValue(value)
        }
    }

    const getQuantityColor = () => {
        if (item.quantity === 0) {
            return "text-red-600"
        }
        if (item.quantity < 50) {
            return "text-orange-500"
        }
        return "text-emerald-600"
    }

    return (
        <div className="bg-card border border-border/50 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Lado Esquerdo - Info do Item */}
                <div className="flex items-center gap-4 flex-1">
                    <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Package className="w-7 h-7 text-emerald-600" />
                    </div>

                    <div className="flex-1">
                        <h3 className="font-bold text-xl text-foreground mb-1">
                            {item.name}
                        </h3>

                        <div className={`text-3xl font-bold ${getQuantityColor()}`}>
                            {item.quantity}
                        </div>
                    </div>
                </div>

                {/* Lado Direito - Controles */}
                <div className="flex items-center gap-3 lg:min-w-[400px]">
                    {/* Input Central */}
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Qtd"
                        className="w-20 h-11 px-3 text-center border-2 border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors font-bold text-lg"
                    />

                    {/* Botão Remover */}
                    <button
                        onClick={handleRemove}
                        disabled={item.quantity === 0}
                        className="flex-1 h-11 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Minus className="h-4 w-4" />
                        Remover
                    </button>

                    {/* Botão Adicionar */}
                    <button
                        onClick={handleAdd}
                        className="flex-1 h-11 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-semibold"
                    >
                        <Plus className="h-4 w-4" />
                        Adicionar
                    </button>

                    {/* Botão Excluir */}
                    <button
                        onClick={() => onDelete(item.id)}
                        className="h-11 w-11 bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 rounded-lg transition-colors flex items-center justify-center flex-shrink-0"
                        title="Excluir item"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Data de atualização - linha separada e menor */}
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/50">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                    Atualizado em {item.updatedAt}
                </span>
            </div>
        </div>
    )
}