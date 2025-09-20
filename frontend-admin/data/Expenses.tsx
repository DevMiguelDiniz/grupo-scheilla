export const expenses = [
    {
        id: 1,
        date: "15/09/2025",
        description: "Compra de alimentos para cestas básicas",
        category: "Alimentação",
        value: "R$ 1.250,00",
        status: "Paid",
        receipt: true
    },
    {
        id: 2,
        date: "12/09/2025",
        description: "Conta de energia elétrica",
        category: "Utilidades",
        value: "R$ 320,45",
        status: "Paid",
        receipt: true
    },
    {
        id: 3,
        date: "10/09/2025",
        description: "Material de limpeza",
        category: "Limpeza",
        value: "R$ 85,30",
        status: "Pending",
        receipt: false
    },
    {
        id: 4,
        date: "08/09/2025",
        description: "Medicamentos para campanha de saúde",
        category: "Saúde",
        value: "R$ 450,00",
        status: "Paid",
        receipt: true
    },
    {
        id: 5,
        date: "05/09/2025",
        description: "Água mineral para eventos",
        category: "Eventos",
        value: "R$ 120,00",
        status: "Paid",
        receipt: false
    }
]

export const categories = ["Todas", "Alimentação", "Utilidades", "Limpeza", "Saúde", "Eventos", "Transporte"]