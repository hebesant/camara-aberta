// src/Components/TeamSection.tsx
function TeamSection() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Nossa Equipe</h2>
                <div className="grid md:grid-cols-5 gap-6">
                    <div className="text-center">
                        <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-user-tie text-blue-600 text-3xl"></i>
                        </div>
                        <h3 className="font-bold">Heberty</h3>
                        <p className="text-sm text-gray-600">Gerente de Projeto</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-laptop-code text-blue-600 text-3xl"></i>
                        </div>
                        <h3 className="font-bold">Roberto</h3>
                        <p className="text-sm text-gray-600">Analista de Sistemas</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-paint-brush text-blue-600 text-3xl"></i>
                        </div>
                        <h3 className="font-bold">Tiago</h3>
                        <p className="text-sm text-gray-600">Front-End</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-server text-blue-600 text-3xl"></i>
                        </div>
                        <h3 className="font-bold">Gabriel</h3>
                        <p className="text-sm text-gray-600">Back-End</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-bug text-blue-600 text-3xl"></i>
                        </div>
                        <h3 className="font-bold">Gustavo</h3>
                        <p className="text-sm text-gray-600">Testador/Qualidade</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default TeamSection;