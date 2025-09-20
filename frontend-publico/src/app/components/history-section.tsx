import Image from "next/image";

const HistorySection = () => {
    return (
        <section id="historia" className="py-12 bg-background">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-5xl font-heading text-primary mb-3">Nossa História</h2>
                        <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto text-pretty">
                            Conheça a trajetória do Grupo Espírita Scheilla e nossa missão de amor e caridade
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div className="space-y-5">
                            <div className="bg-card rounded-xl p-6 shadow-lg border border-border/50">
                                <h3 className="text-xl font-semibold text-card-foreground mb-3">Fundação e Propósito</h3>
                                <p className="text-muted-foreground text-pretty leading-relaxed mb-3 text-sm">
                                    O Grupo Espírita Scheilla foi fundado com o propósito de difundir os ensinamentos espíritas baseados
                                    nas obras de Allan Kardec e nos exemplos de amor e caridade deixados por Jesus Cristo.
                                </p>
                                <p className="text-muted-foreground text-pretty leading-relaxed mb-3 text-sm">
                                    Nossa missão é proporcionar um ambiente acolhedor para o estudo, a reflexão e a prática da doutrina
                                    espírita, sempre pautados pelos princípios do amor ao próximo e da busca pela evolução espiritual.
                                </p>
                                <p className="text-muted-foreground text-pretty leading-relaxed text-sm">
                                    Inspirados pelos ensinamentos de grandes médiuns como Chico Xavier, buscamos ser um farol de esperança
                                    e consolação para todos aqueles que nos procuram em busca de orientação espiritual.
                                </p>
                            </div>

                            <div className="bg-secondary/20 rounded-xl p-4 border border-secondary/30">
                                <h4 className="text-base font-semibold text-foreground mb-2">Nossos Valores</h4>
                                <ul className="space-y-1.5 text-muted-foreground text-sm">
                                    <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                                        Amor incondicional ao próximo
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                                        Caridade em pensamento, palavra e ação
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                                        Busca constante pela evolução espiritual
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                                        Estudo e prática dos ensinamentos espíritas
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="relative w-64 h-80 rounded-2xl overflow-hidden shadow-2xl mb-4 bg-muted">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                                    <Image src="/images/chico-xavier.jpg" alt="Grupo Espírita Scheilla" fill className="object-cover" />
                                </div>
                            </div>

                            <div className="text-center max-w-sm">
                                <h4 className="text-lg font-semibold text-foreground mb-2">Francisco Cândido Xavier</h4>
                                <p className="text-muted-foreground text-pretty leading-relaxed text-sm">
                                    &#34;Chico Xavier foi um dos maiores médiuns da história do Espiritismo, exemplo de humildade, caridade e
                                    dedicação aos ensinamentos de Jesus. Sua obra e vida nos inspiram diariamente.&#34;
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HistorySection