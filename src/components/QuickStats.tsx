// src/Components/QuickStats.tsx
function QuickStats() {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-blue-600 text-white px-6 py-3">
                <h3 className="font-bold"><i className="fas fa-chart-bar mr-2"></i> Estatísticas Rápidas</h3>
            </div>
            <div className="p-6">
                <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                        <span>Aprovados este ano</span>
                        <span>42%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                        <span>Em discussão</span>
                        <span>35%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span>Arquivados</span>
                        <span>23%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default QuickStats;