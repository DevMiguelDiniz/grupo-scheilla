import { MapPin, Phone, Mail, Clock } from "lucide-react"

const LocationSection = () => {
    return (
        <section id="localizacao" className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-heading text-primary mb-4">Nossa Localização</h2>
                    <p className="text-lg font-body text-muted-foreground max-w-2xl mx-auto text-pretty">
                        Venha nos visitar e faça parte da nossa comunidade espírita
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Map */}
                    <div className="relative">
                        <div className="w-full h-106 bg-muted rounded-xl overflow-hidden shadow-lg">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.2!2d-44.037524!3d-19.6258345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa661983bf472f7:0x28a190868b38cf07!2sR.%20Nossa%20Sra.%20das%20Gra%C3%A7as%2C%20381%20-%20Centro%2C%20Pedro%20Leopoldo%20-%20MG%2C%2033250-135!5e0!3m2!1spt-BR!2sbr!4v1709567890123&amp;iwloc=&amp;output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Localização do Grupo Espírita Scheilla"
                            ></iframe>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div className="bg-card rounded-xl p-8 shadow-lg border border-border/50">
                            <h3 className="text-2xl font-semibold text-card-foreground mb-6">Informações de Contato</h3>

                            <div className="space-y-2">
                                <div className="flex items-start space-x-4">
                                    <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-card-foreground mb-1">Endereço</h4>
                                        <p className="text-muted-foreground text-pretty">
                                            Rua Nossa Senhora das Graças, 381
                                            <br />
                                            Bairro Centro
                                            <br />
                                            Pedro Leopoldo, 33250-135
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-card-foreground mb-1">Telefone</h4>
                                        <p className="text-muted-foreground">(31) 3661-3884</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-card-foreground mb-1">E-mail</h4>
                                        <p className="text-muted-foreground">gespl.livraria@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-card-foreground mb-1">Horários</h4>
                                        <div className="text-muted-foreground space-y-1">
                                            <p>Sábados: 14h às 17h</p>
                                            <p>Domingos: 9h às 12h</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LocationSection
