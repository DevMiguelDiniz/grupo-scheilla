import { DollarSign } from "lucide-react"
import { ExpenseCard } from "./ExpensesCard"

interface Expense {
    id: number
    date: string
    description: string
    category: string
    value: string
    status: string
    receipt: boolean
}

interface ExpensesListProps {
    expenses: Expense[]
    searchTerm: string
    selectedCategory: string
}

export function ExpensesList({ 
    expenses, 
    searchTerm, 
    selectedCategory 
}: ExpensesListProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Despesas Recentes</h2>

            <div className="space-y-3">
                {expenses.map((expense) => (
                    <ExpenseCard key={expense.id} expense={expense} />
                ))}
            </div>

            {expenses.length === 0 && (
                <div className="text-center py-12">
                    <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-muted-foreground mb-2">
                        Nenhuma despesa encontrada
                    </h3>
                    <p className="text-muted-foreground">
                        {searchTerm || selectedCategory !== "Todas"
                            ? "Tente ajustar os filtros de busca"
                            : "Cadastre a primeira despesa do sistema"
                        }
                    </p>
                </div>
            )}
        </div>
    )
}