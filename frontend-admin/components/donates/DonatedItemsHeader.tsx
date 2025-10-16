import { Package, Plus } from "lucide-react"

interface DonatedItemsHeaderProps {
    onOpenModal: () => void
}

export function DonatedItemsHeader({ onOpenModal }: DonatedItemsHeaderProps) {
    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-15 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                        <Package className="w-12 h-12 text-emerald-600" />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                            Controle de Itens Doados
                        </h1>
                        <p className="text-sm md:text-base text-muted-foreground">
                            Gerencie o estoque de itens doados ao Grupo Espírita Scheilla
                        </p>
                    </div>
                </div>

                <button
                    onClick={onOpenModal}
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg transition-all h-12 md:h-14 px-6 md:px-8 text-base md:text-lg inline-flex items-center justify-center rounded-lg font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                >
                    <Plus className="w-5 h-5 mr-2 flex-shrink-0" />
                    Cadastrar Item
                </button>
            </div>
        </div>
    )
}