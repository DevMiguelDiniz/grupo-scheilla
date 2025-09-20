import { Calendar, Receipt, Eye, Edit, Trash2 } from "lucide-react"

interface Expense {
    id: number
    date: string
    description: string
    category: string
    value: string
    status: string
    receipt: boolean
}

interface ExpenseCardProps {
    expense: Expense
}

export function ExpenseCard({ expense }: ExpenseCardProps) {
    return (
        <div className="bg-card border border-border/50 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 md:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Main Information */}
                <div className="flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <h3 className="font-semibold text-lg text-foreground">
                            {expense.description}
                        </h3>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            expense.status === "Paid"
                                ? "bg-green-100 text-green-800 border border-green-200"
                                : "bg-orange-100 text-orange-800 border border-orange-200"
                        }`}>
                            {expense.status === "Paid" ? "Pago" : "Pendente"}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {expense.date}
                        </div>
                        <div>
                            Categoria: {expense.category}
                        </div>
                        <div className="flex items-center gap-1">
                            <Receipt className={`h-4 w-4 ${expense.receipt ? 'text-green-600' : 'text-gray-400'}`} />
                            {expense.receipt ? 'Com comprovante' : 'Sem comprovante'}
                        </div>
                    </div>

                    <div className="text-2xl font-bold text-emerald-600">
                        {expense.value}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row lg:flex-col gap-2 lg:min-w-[120px]">
                    <button className="flex-1 lg:w-full h-10 bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-200 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                        <Eye className="h-4 w-4" />
                        <span className="hidden sm:inline">Ver</span>
                    </button>
                    <button className="flex-1 lg:w-full h-10 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 border border-yellow-300 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                        <Edit className="h-4 w-4" />
                        <span className="hidden sm:inline">Editar</span>
                    </button>
                    <button className="flex-1 lg:w-full h-10 bg-red-100 hover:bg-red-200 text-red-700 border border-red-200 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                        <Trash2 className="h-4 w-4" />
                        <span className="hidden sm:inline">Excluir</span>
                    </button>
                </div>
            </div>
        </div>
    )
}