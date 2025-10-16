export interface DonatedItem {
    id: number
    name: string
    quantity: number
    createdAt: string
    updatedAt: string
}

export const donatedItems: DonatedItem[] = [
    {
        id: 1,
        name: "Arroz (kg)",
        quantity: 150,
        createdAt: "15/01/2025",
        updatedAt: "16/10/2025"
    },
    {
        id: 2,
        name: "Feijão (kg)",
        quantity: 80,
        createdAt: "15/01/2025",
        updatedAt: "16/10/2025"
    },
    {
        id: 3,
        name: "Óleo (litro)",
        quantity: 45,
        createdAt: "15/01/2025",
        updatedAt: "16/10/2025"
    },
    {
        id: 4,
        name: "Açúcar (kg)",
        quantity: 60,
        createdAt: "15/01/2025",
        updatedAt: "16/10/2025"
    },
    {
        id: 5,
        name: "Macarrão (pacote)",
        quantity: 120,
        createdAt: "15/01/2025",
        updatedAt: "15/10/2025"
    },
    {
        id: 6,
        name: "Leite em pó (lata)",
        quantity: 30,
        createdAt: "20/01/2025",
        updatedAt: "16/10/2025"
    },
    {
        id: 7,
        name: "Café (pacote)",
        quantity: 25,
        createdAt: "20/01/2025",
        updatedAt: "10/10/2025"
    },
    {
        id: 8,
        name: "Sabão em pó (kg)",
        quantity: 40,
        createdAt: "22/01/2025",
        updatedAt: "16/10/2025"
    }
]