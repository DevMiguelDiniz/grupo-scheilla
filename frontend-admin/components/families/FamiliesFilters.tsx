import { Search, Filter } from "lucide-react"
import { familyStatus } from "@/mocks/Families"

interface FamiliesFiltersProps {
    searchTerm: string
    setSearchTerm: (term: string) => void
    selectedStatus: string
    setSelectedStatus: (status: string) => void
    showFilters: boolean
    setShowFilters: (show: boolean) => void
}

export function FamiliesFilters({
                                    searchTerm,
                                    setSearchTerm,
                                    selectedStatus,
                                    setSelectedStatus,
                                    showFilters,
                                    setShowFilters
                                }: FamiliesFiltersProps) {
    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Buscar famílias..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-12 pl-10 pr-4 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-base"
                    />
                </div>

                {/* Filters Button */}
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="h-12 px-4 border border-border rounded-lg bg-card hover:bg-accent transition-colors flex items-center gap-2 text-base font-medium"
                >
                    <Filter className="h-4 w-4" />
                    Filtros
                </button>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
                <div className="bg-card border border-border/50 rounded-lg p-4 space-y-4">
                    <div>
                        <h3 className="font-medium text-base mb-2">Status:</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {familyStatus.map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setSelectedStatus(status)}
                                    className={`h-10 px-3 rounded-lg text-sm font-medium transition-colors ${
                                        selectedStatus === status
                                            ? "bg-emerald-600 text-white"
                                            : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}