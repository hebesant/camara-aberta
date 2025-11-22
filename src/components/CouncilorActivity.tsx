// src/Components/CouncilorActivity.tsx
function CouncilorActivity() {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="bg-blue-600 text-white px-6 py-3">
                <h3 className="font-bold"><i className="fas fa-users mr-2"></i> Vereadores em Ação</h3>
            </div>
            <div className="p-6">
                <div className="flex items-center mb-4">
                    <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Vereador" className="w-10 h-10 rounded-full mr-3" />
                    <div>
                        <h4 className="font-medium">Vereador João Santos</h4>
                        <p className="text-sm text-gray-600">Apresentou 3 projetos esta semana</p>
                    </div>
                </div>
                <div className="flex items-center mb-4">
                    <img src="https://randomuser.me/api/portraits/women/63.jpg" alt="Vereadora" className="w-10 h-10 rounded-full mr-3" />
                    <div>
                        <h4 className="font-medium">Vereadora Maria Fernandes</h4>
                        <p className="text-sm text-gray-600">Relatora de 2 projetos na comissão</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Vereador" className="w-10 h-10 rounded-full mr-3" />
                    <div>
                        <h4 className="font-medium">Vereador Carlos Silva</h4>
                        <p className="text-sm text-gray-600">Participou de 5 votações</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CouncilorActivity;