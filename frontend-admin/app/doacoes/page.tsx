"use client"

import React, { useState } from "react"
import { DonatedItemsHeader } from "@/components/donates/DonatedItemsHeader"
import { DonatedItemsStats } from "@/components/donates/DonatedItemsStats"
import { DonatedItemsFilters } from "@/components/donates/DonatedItemsFilters"
import { DonatedItemsList } from "@/components/donates/DonatedItemsList"
import { AddItemModal } from "@/components/donates/AddItemModal"
import { donatedItems as initialItems } from "@/mocks/DonatedItens"
import { Sidebar } from "@/components/sidebar/sidebar"

export default function DonatedItemsPage() {
    const [items, setItems] = useState(initialItems)
    const [searchTerm, setSearchTerm] = useState("")
    const [showAddModal, setShowAddModal] = useState(false)

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleAddItem = (itemName: string) => {
        const newItem = {
            id: Math.max(...items.map(i => i.id), 0) + 1,
            name: itemName,
            quantity: 0,
            createdAt: new Date().toLocaleDateString('pt-BR'),
            updatedAt: new Date().toLocaleDateString('pt-BR')
        }

        setItems([...items, newItem])
        setShowAddModal(false)
        alert(`Item "${itemName}" cadastrado com sucesso!`)
    }

    const handleUpdateQuantity = (id: number, newQuantity: number) => {
        setItems(items.map(item =>
            item.id === id
                ? {
                    ...item,
                    quantity: newQuantity,
                    updatedAt: new Date().toLocaleDateString('pt-BR')
                }
                : item
        ))
    }

    const handleDeleteItem = (id: number) => {
        const itemToDelete = items.find(item => item.id === id)

        if (confirm(`Tem certeza que deseja excluir o item "${itemToDelete?.name}"?`)) {
            setItems(items.filter(item => item.id !== id))
            alert("Item excluído com sucesso!")
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <main className="w-full overflow-auto">
                <Sidebar activeRoute="/itens-doados" />
                <div className="p-4 md:p-6 space-y-6 md:space-y-8">
                    <DonatedItemsHeader onOpenModal={() => setShowAddModal(true)} />
                    <DonatedItemsStats items={items} />
                    <DonatedItemsFilters
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                    <DonatedItemsList
                        items={filteredItems}
                        onUpdateQuantity={handleUpdateQuantity}
                        onDelete={handleDeleteItem}
                        searchTerm={searchTerm}
                    />
                </div>
            </main>

            <AddItemModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onAdd={handleAddItem}
            />
        </div>
    )
}