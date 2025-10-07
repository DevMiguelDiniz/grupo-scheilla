export const families = [
    {
        id: 1,
        responsibleName: "Maria da Silva Santos",
        address: "Rua das Flores, 123 - Centro",
        phone: "(31) 98765-4321",
        members: 5,
        registrationDate: "15/01/2024",
        status: "active",
        observations: "Família necessita de cestas básicas mensais",
        membersList: [
            { id: 1, name: "Maria da Silva Santos", age: 45, relationship: "Responsável" },
            { id: 2, name: "João Santos", age: 48, relationship: "Cônjuge" },
            { id: 3, name: "Ana Santos", age: 15, relationship: "Filha" },
            { id: 4, name: "Pedro Santos", age: 12, relationship: "Filho" },
            { id: 5, name: "José Santos", age: 8, relationship: "Filho" }
        ]
    },
    {
        id: 2,
        responsibleName: "José Carlos Oliveira",
        address: "Av. Brasil, 456 - Bairro Novo",
        phone: "(31) 99876-5432",
        members: 3,
        registrationDate: "20/02/2024",
        status: "active",
        observations: "Família recebe acompanhamento mensal",
        membersList: [
            { id: 1, name: "José Carlos Oliveira", age: 52, relationship: "Responsável" },
            { id: 2, name: "Mariana Oliveira", age: 22, relationship: "Filha" },
            { id: 3, name: "Lucas Oliveira", age: 18, relationship: "Filho" }
        ]
    },
    {
        id: 3,
        responsibleName: "Ana Paula Costa",
        address: "Rua do Comércio, 789 - Vila Industrial",
        phone: "(31) 97654-3210",
        members: 4,
        registrationDate: "10/03/2024",
        status: "active",
        observations: "Necessita acompanhamento psicológico",
        membersList: [
            { id: 1, name: "Ana Paula Costa", age: 38, relationship: "Responsável" },
            { id: 2, name: "Beatriz Costa", age: 14, relationship: "Filha" },
            { id: 3, name: "Carlos Costa", age: 10, relationship: "Filho" },
            { id: 4, name: "Fernanda Costa", age: 6, relationship: "Filha" }
        ]
    },
    {
        id: 4,
        responsibleName: "Roberto Almeida",
        address: "Rua das Acácias, 321 - Jardim Esperança",
        phone: "(31) 96543-2109",
        members: 6,
        registrationDate: "05/04/2024",
        status: "inactive",
        observations: "Família mudou-se para outra cidade",
        membersList: [
            { id: 1, name: "Roberto Almeida", age: 55, relationship: "Responsável" },
            { id: 2, name: "Sandra Almeida", age: 50, relationship: "Cônjuge" },
            { id: 3, name: "Ricardo Almeida", age: 25, relationship: "Filho" },
            { id: 4, name: "Paula Almeida", age: 20, relationship: "Filha" },
            { id: 5, name: "Diego Almeida", age: 16, relationship: "Filho" },
            { id: 6, name: "Sofia Almeida", age: 12, relationship: "Filha" }
        ]
    }
]

export const familyStatus = ["Todas", "Ativas", "Inativas"]

export const relationshipTypes = [
    "Responsável",
    "Cônjuge",
    "Filho(a)",
    "Pai/Mãe",
    "Avô/Avó",
    "Irmão/Irmã",
    "Neto(a)",
    "Outro"
]