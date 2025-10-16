interface DonatedItem {
    id: number
    name: string
    quantity: number
    createdAt: string
    updatedAt: string
}

interface DonatedItemsStatsProps {
    items: DonatedItem[]
}

export function DonatedItemsStats({ items }: DonatedItemsStatsProps) {
    const totalItems = items.length
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
    const lowStockItems = items.filter(item => item.quantity < 50).length

    return (
        <div className="bg-card border border-border/50 rounded-lg shadow-sm p-4 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center sm:text-left">
                    <p className="text-sm text-muted-foreground">Total de Itens</p>
                    <p className="text-2xl md:text-3xl font-bold text-emerald-600">{totalItems}</p>
                </div>
                <div className="text-center sm:text-left">
                    <p className="text-sm text-muted-foreground">Quantidade Total</p>
                    <p className="text-2xl md:text-3xl font-bold text-blue-600">{totalQuantity}</p>
                </div>
                <div className="text-center sm:text-left">
                    <p className="text-sm text-muted-foreground">Estoque Baixo</p>
                    <p className="text-2xl md:text-3xl font-bold text-orange-600">{lowStockItems}</p>
                </div>
            </div>
        </div>
    )
}