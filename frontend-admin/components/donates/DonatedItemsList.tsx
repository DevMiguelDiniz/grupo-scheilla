// frontend-admin/components/donated-items/DonatedItemsList.tsx

import { Package } from "lucide-react"
import { DonatedItemCard } from "./DonatedItemCard"

interface DonatedItem {
    id: number
    name: string
    quantity: number
    createdAt: string
    updatedAt: string
}

interface DonatedItemsListProps {
    items: DonatedItem[]
    onUpdateQuantity: (id: number, newQuantity: number) => void
    onDelete: (id: number) => void
    searchTerm: string
}

export function DonatedItemsList({
                                     items,
                                     onUpdateQuantity,
                                     onDelete,
                                     searchTerm
                                 }: DonatedItemsListProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Itens no Estoque</h2>

            <div className="space-y-3">
                {items.map((item) => (
                    <DonatedItemCard
                        key={item.id}
                        item={item}
                        onUpdateQuantity={onUpdateQuantity}
                        onDelete={onDelete}
                    />
                ))}
            </div>

            {items.length === 0 && (
                <div className="text-center py-12">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-muted-foreground mb-2">
                        Nenhum item encontrado
                    </h3>
                    <p className="text-muted-foreground">
                        {searchTerm
                            ? "Tente ajustar sua busca"
                            : "Cadastre o primeiro item no estoque"
                        }
                    </p>
                </div>
            )}
        </div>
    )
}