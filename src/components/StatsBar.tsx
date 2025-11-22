// src/Components/StatsBar.tsx
function StatsBar() {
    return (
        <section className="bg-white py-8 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div className="p-4">
                        <div className="text-3xl font-bold text-blue-600">1,248</div>
                        <div className="text-gray-600">Projetos de Lei</div>
                    </div>
                    <div className="p-4">
                        <div className="text-3xl font-bold text-blue-600">45</div>
                        <div className="text-gray-600">Vereadores</div>
                    </div>
                    <div className="p-4">
                        <div className="text-3xl font-bold text-blue-600">86%</div>
                        <div className="text-gray-600">Dados Atualizados</div>
                    </div>
                    <div className="p-4">
                        <div className="text-3xl font-bold text-blue-600">24h</div>
                        <div className="text-gray-600">Atualização Diária</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default StatsBar;