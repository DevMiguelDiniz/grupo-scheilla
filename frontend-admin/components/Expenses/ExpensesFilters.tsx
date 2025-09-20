import { Search, Filter, Download } from "lucide-react"
import { categories } from "@/data/Expenses"

interface ExpensesFiltersProps {
    searchTerm: string
    setSearchTerm: (term: string) => void
    selectedCategory: string
    setSelectedCategory: (category: string) => void
    showFilters: boolean
    setShowFilters: (show: boolean) => void
}

export function ExpensesFilters({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    showFilters,
    setShowFilters
}: ExpensesFiltersProps) {
    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Buscar despesas..."
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

                {/* Report Button */}
                <button className="h-12 px-4 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 border border-emerald-200 rounded-lg transition-colors flex items-center gap-2 text-base font-medium">
                    <Download className="h-4 w-4" />
                    Relatório
                </button>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
                <div className="bg-card border border-border/50 rounded-lg p-4 space-y-4">
                    <h3 className="font-medium text-lg">Filtrar por categoria:</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`h-10 px-3 rounded-lg text-sm font-medium transition-colors ${
                                    selectedCategory === category
                                        ? "bg-emerald-600 text-white"
                                        : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}