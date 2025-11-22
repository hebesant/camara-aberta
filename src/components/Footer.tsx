// src/Components/Footer.tsx
function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <i className="fas fa-balance-scale text-blue-400 text-2xl"></i>
                            <h3 className="text-xl font-bold">Transparência Legislativa</h3>
                        </div>
                        <p className="text-gray-400">Plataforma de acompanhamento legislativo com inteligência artificial para maior transparência e participação cidadã.</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-4">Links Úteis</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white">Projetos de Lei</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Vereadores</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Calendário Legislativo</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Glossário</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-4">Contato</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li className="flex items-center"><i className="fas fa-envelope mr-2"></i> contato@transparencialegislativa.org</li>
                            <li className="flex items-center"><i className="fas fa-phone mr-2"></i> (11) 1234-5678</li>
                            <li className="flex items-center"><i className="fas fa-map-marker-alt mr-2"></i> São Paulo, SP</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-4">Redes Sociais</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-600">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-600">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-600">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-600">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    <p>© 2023 Plataforma de Transparência Legislativa com IA. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
export default Footer;