// src/Components/UpcomingSessions.tsx
function UpcomingSessions() {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="bg-blue-600 text-white px-6 py-3">
                <h3 className="font-bold"><i className="fas fa-calendar-alt mr-2"></i> Próximas Sessões</h3>
            </div>
            <div className="p-6">
                <div className="mb-4 pb-4 border-b border-gray-100">
                    <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">Sessão Ordinária</span>
                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded">15/06</span>
                    </div>
                    <p className="text-sm text-gray-600">14:00 - Câmara Municipal</p>
                </div>
                <div className="mb-4 pb-4 border-b border-gray-100">
                    <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">Comissão de Finanças</span>
                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded">16/06</span>
                    </div>
                    <p className="text-sm text-gray-600">10:00 - Sala das Comissões</p>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">Audiência Pública</span>
                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded">20/06</span>
                    </div>
                    <p className="text-sm text-gray-600">19:00 - Plenário Principal</p>
                </div>
            </div>
        </div>
    );
}
export default UpcomingSessions;