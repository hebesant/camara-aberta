// src/Components/FeaturesSection.tsx
function FeaturesSection() {
    return (
        <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Como nossa plataforma ajuda você</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-md text-center card-hover transition-all">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-search text-blue-600 text-2xl"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Busca Inteligente</h3>
                        <p className="text-gray-600">Encontre projetos de lei, vereadores e votações com nossa busca avançada e filtros inteligentes.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md text-center card-hover transition-all">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-robot text-blue-600 text-2xl"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Resumos por IA</h3>
                        <p className="text-gray-600">Nossa inteligência artificial gera resumos claros de projetos complexos para fácil compreensão.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md text-center card-hover transition-all">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-bell text-blue-600 text-2xl"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Acompanhamento</h3>
                        <p className="text-gray-600">Receba alertas sobre projetos do seu interesse e acompanhe o trabalho dos vereadores.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default FeaturesSection;