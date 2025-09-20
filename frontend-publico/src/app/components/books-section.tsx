import Image from "next/image";

const BooksSection = () => {
    const books = [
        {
            image: "/classic-spiritual-book-cover.jpg",
            title: "O Livro dos Espíritos",
            author: "Allan Kardec",
            description: "A obra fundamental do Espiritismo, contendo os princípios da doutrina espírita.",
        },
        {
            image: "/gospel-book-spiritual-cover.jpg",
            title: "O Evangelho Segundo o Espiritismo",
            author: "Allan Kardec",
            description: "Os ensinamentos morais de Jesus explicados segundo a doutrina espírita.",
        },
        {
            image: "/spiritual-home-book-cover.jpg",
            title: "Nosso Lar",
            author: "André Luiz (Chico Xavier)",
            description: "Relato sobre a vida no mundo espiritual e as colônias de recuperação.",
        },
        {
            image: "/daily-bread-spiritual-book.jpg",
            title: "Pão Nosso",
            author: "Emmanuel (Chico Xavier)",
            description: "Comentários às orações dominicais com ensinamentos espirituais profundos.",
        },
        {
            image: "/living-fountain-spiritual-book.jpg",
            title: "Missionários da Luz",
            author: "André Luiz (Chico Xavier)",
            description: "Ensinamentos sobre a mediunidade e o trabalho espiritual.",
        },
        {
            image: "/classic-spiritual-book-cover.jpg",
            title: "Fonte Viva",
            author: "Emmanuel (Chico Xavier)",
            description: "Comentários ao Evangelho de Jesus com aplicações práticas para o dia a dia.",
        },
    ]

    return (
        <section id="livros" className="py-12 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-5xl font-heading text-primary mb-3">Biblioteca Espírita</h2>
                    <p className="text-base font-body text-muted-foreground max-w-2xl mx-auto text-pretty">
                        Explore nossa seleção de livros espíritas para enriquecer sua jornada de conhecimento
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {books.map((book, index) => (
                        <div
                            key={index}
                            className="bg-card rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 group hover:-translate-y-1"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="relative w-24 h-36 mb-3 rounded-lg overflow-hidden shadow-md bg-muted flex items-center justify-center">
                                    <div className="text-xs text-muted-foreground text-center px-2">
                                        <Image src={book.image} alt={book.title} fill className="object-cover" />
                                    </div>
                                </div>

                                <h3 className="text-base font-semibold text-card-foreground mb-2 text-balance leading-tight">{book.title}</h3>

                                <p className="text-primary font-medium mb-2 text-sm">{book.author}</p>

                                <p className="text-muted-foreground text-xs text-pretty leading-relaxed">{book.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <div className="bg-secondary/20 rounded-xl p-5 max-w-2xl mx-auto border border-secondary/30">
                        <h3 className="text-lg font-semibold text-foreground mb-2">Biblioteca Física</h3>
                        <p className="text-muted-foreground text-pretty leading-relaxed text-sm">
                            Visite nosso centro espírita e tenha acesso à nossa biblioteca completa com centenas de obras espíritas
                            para empréstimo e consulta. Horário: Segunda a Sexta, das 19h às 21h.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BooksSection