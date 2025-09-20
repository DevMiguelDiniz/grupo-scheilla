interface Expense {
    id: number
    date: string
    description: string
    category: string
    value: string
    status: string
    receipt: boolean
}

interface ExpensesStatsProps {
    expenses: Expense[]
}

export function ExpensesStats({ expenses }: ExpensesStatsProps) {
    const totalExpenses = expenses.reduce((total, expense) => {
        return total + parseFloat(expense.value.replace('R$ ', '').replace('.', '').replace(',', '.'))
    }, 0)

    const pendingExpenses = expenses.filter(e => e.status === "Pending").length

    return (
        <div className="bg-card border border-border/50 rounded-lg shadow-sm p-4 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center sm:text-left">
                    <p className="text-sm text-muted-foreground">Total do Mês</p>
                    <p className="text-2xl md:text-3xl font-bold text-emerald-600">
                        R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                </div>
                <div className="text-center sm:text-left">
                    <p className="text-sm text-muted-foreground">Total de Despesas</p>
                    <p className="text-2xl md:text-3xl font-bold">{expenses.length}</p>
                </div>
                <div className="text-center sm:text-left">
                    <p className="text-sm text-muted-foreground">Pendentes</p>
                    <p className="text-2xl md:text-3xl font-bold text-orange-500">{pendingExpenses}</p>
                </div>
            </div>
        </div>
    )
}