// frontend-admin/components/donated-items/DonatedItemsFilters.tsx

import { Search } from "lucide-react"

interface DonatedItemsFiltersProps {
    searchTerm: string
    setSearchTerm: (term: string) => void
}

export function DonatedItemsFilters({ searchTerm, setSearchTerm }: DonatedItemsFiltersProps) {
    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Buscar itens..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-12 pl-10 pr-4 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-base"
                    />
                </div>
            </div>
        </div>
    )
}