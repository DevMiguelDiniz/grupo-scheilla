import { Facebook, Instagram, Youtube, Mail, Phone } from "lucide-react"

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-card border-t border-border">
            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo and Description */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-lg">GS</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-card-foreground">Grupo Espírita Scheilla</h3>
                                <p className="text-sm text-muted-foreground">Amor, Caridade e Evolução</p>
                            </div>
                        </div>
                        <p className="text-muted-foreground text-pretty leading-relaxed mb-6 max-w-md">
                            Dedicados ao estudo e prática da doutrina espírita, promovendo o amor ao próximo e o crescimento
                            espiritual através dos ensinamentos de Jesus Cristo.
                        </p>

                        {/* Social Media */}
                        <div className="flex space-x-4">
                            <a
                                href="https://www.facebook.com/profile.php?id=100084042267180"
                                className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.instagram.com/grupoespiritascheilla/"
                                className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.youtube.com/@grupoespiritascheillapl"
                                className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                                aria-label="YouTube"
                            >
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-card-foreground mb-4">Links Rápidos</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#inicio" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                                    Início
                                </a>
                            </li>
                            <li>
                                <a href="#eventos" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                                    Eventos
                                </a>
                            </li>
                            <li>
                                <a href="#historia" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                                    Nossa História
                                </a>
                            </li>
                            <li>
                                <a href="#videos" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                                    Vídeos
                                </a>
                            </li>
                            <li>
                                <a href="#livros" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                                    Biblioteca
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold text-card-foreground mb-4">Contato</h4>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <Phone className="w-4 h-4 text-primary" />
                                <span className="text-muted-foreground text-sm">(31) 3661-3884</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="w-4 h-4 text-primary" />
                                <span className="text-muted-foreground text-sm">gespl.livraria@gmail.com</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h5 className="font-semibold text-card-foreground mb-2">Horários de Funcionamento</h5>
                            <div className="text-sm text-muted-foreground space-y-1">
                                <p>Seg - Sex: 19h às 21h</p>
                                <p>Sábados: 14h às 17h</p>
                                <p>Domingos: 9h às 12h</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-border mt-8 pt-8 text-center">
                    <p className="text-muted-foreground text-sm">
                        © {currentYear} Grupo Espírita Scheilla. Todos os direitos reservados.
                    </p>
                    <p className="text-muted-foreground text-xs mt-2">&#34;Embora ninguém possa voltar atrás e fazer um novo começo, qualquer um pode começar agora e fazer um novo fim&#34; - Chico Xavier</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
