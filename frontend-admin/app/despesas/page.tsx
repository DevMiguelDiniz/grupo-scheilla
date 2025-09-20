"use client"

import { useState } from "react"
import { ExpensesHeader } from "@/components/Expenses/ExpensesHeader"
import { ExpensesStats } from "@/components/Expenses/ExpensesStats"
import { ExpensesFilters } from "@/components/Expenses/ExpensesFilters"
import { ExpensesList } from "@/components/Expenses/ExpensesList"
import { expenses } from "@/data/Expenses"

export default function ExpensesPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("Todas")
    const [showFilters, setShowFilters] = useState(false)

    const filteredExpenses = expenses.filter(expense => {
        const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            expense.category.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "Todas" || expense.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    return (
        <div className="min-h-screen bg-background">
            <main className="w-full overflow-auto">
                <div className="p-4 md:p-6 space-y-6 md:space-y-8">
                    <ExpensesHeader />
                    <ExpensesStats expenses={expenses} />
                    <ExpensesFilters
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        showFilters={showFilters}
                        setShowFilters={setShowFilters}
                    />
                    <ExpensesList 
                        expenses={filteredExpenses}
                        searchTerm={searchTerm}
                        selectedCategory={selectedCategory}
                    />
                </div>
            </main>
        </div>
    )
}