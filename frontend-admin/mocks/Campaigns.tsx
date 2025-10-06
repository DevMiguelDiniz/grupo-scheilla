// mocks/Campaigns.tsx
export const campaigns = [
    {
        id: 1,
        title: "Campanha de Natal 2024",
        description: "Arrecadação de alimentos e brinquedos para famílias carentes durante o período natalino",
        startDate: "01/12/2024",
        endDate: "25/12/2024",
        type: "Doação de Alimentos",
        status: "active",
        goal: "500 cestas básicas",
        collected: "320 cestas básicas"
    },
    {
        id: 2,
        title: "Seminário de Estudo Espírita",
        description: "Seminário mensal sobre o Evangelho Segundo o Espiritismo",
        startDate: "15/01/2025",
        endDate: "15/01/2025",
        type: "Seminário",
        status: "future",
        goal: "100 participantes",
        collected: "45 inscritos"
    },
    {
        id: 3,
        title: "Doação de Roupas de Inverno",
        description: "Arrecadação de agasalhos e cobertores para pessoas em situação de vulnerabilidade",
        startDate: "01/06/2024",
        endDate: "30/06/2024",
        type: "Doação de Roupas",
        status: "past",
        goal: "1000 peças",
        collected: "1200 peças"
    },
    {
        id: 4,
        title: "Estudo da Obra O Livro dos Espíritos",
        description: "Grupo de estudos semanal sobre a obra básica do Espiritismo",
        startDate: "01/10/2024",
        endDate: "31/12/2024",
        type: "Estudos",
        status: "active",
        goal: "30 participantes",
        collected: "28 participantes"
    },
    {
        id: 5,
        title: "Campanha do Agasalho",
        description: "Arrecadação de roupas e cobertores para o inverno",
        startDate: "01/05/2025",
        endDate: "30/06/2025",
        type: "Doação de Roupas",
        status: "future",
        goal: "800 peças",
        collected: "0 peças"
    },
    {
        id: 6,
        title: "Páscoa Solidária",
        description: "Distribuição de cestas básicas e chocolates para crianças carentes",
        startDate: "15/03/2024",
        endDate: "31/03/2024",
        type: "Doação de Alimentos",
        status: "past",
        goal: "300 cestas",
        collected: "310 cestas"
    }
]

export const campaignTypes = [
    "Todos",
    "Doação de Alimentos",
    "Doação de Roupas",
    "Seminário",
    "Estudos",
    "Doação de Materiais",
    "Assistência Social",
    "Outros"
]

export const campaignStatus = ["Todas", "Ativas", "Futuras", "Passadas"]