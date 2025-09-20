import { DollarSign, Plus } from "lucide-react"

export function ExpensesHeader() {
    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                            Gestão de Despesas
                        </h1>
                        <p className="text-sm md:text-base text-muted-foreground">
                            Controle financeiro do Grupo Espírita Scheilla
                        </p>
                    </div>
                </div>

                <button
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg transition-all h-12 md:h-14 px-6 md:px-8 text-base md:text-lg inline-flex items-center justify-center rounded-lg font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                    onClick={() => window.location.href = '/despesas/nova'}
                >
                    <Plus className="w-5 h-5 mr-2 flex-shrink-0" />
                    Nova Despesa
                </button>
            </div>
        </div>
    )
}