// src/Components/ProjectCard.tsx
export type ProjectData = {
    title: string;
    status: string;
    date: string;
    summary: string;
    author: string;
    tags: string[];
    authorImg: string;
    statusColor: string;
};

function ProjectCard({ title, status, date, summary, author, tags, authorImg, statusColor }: ProjectData) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 card-hover transition-all">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <span className={`${statusColor} text-xs font-medium px-2.5 py-0.5 rounded`}>{status}</span>
                        <h3 className="text-xl font-bold text-gray-800 mt-2">{title}</h3>
                    </div>
                    <div className="text-gray-500 text-sm">{date}</div>
                </div>
                {/* Usa a classe customizada 'ai-summary' */}
                <div className="ai-summary p-4 mb-4 rounded">
                    <div className="flex items-center mb-2">
                        <i className="fas fa-robot text-blue-500 mr-2"></i>
                        <span className="font-medium text-gray-700">Resumo:</span>
                    </div>
                    <p className="text-gray-700">{summary}</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">{tag}</span>
                    ))}
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <img src={authorImg} alt="Autor" className="w-8 h-8 rounded-full mr-2" />
                        <span className="text-sm font-medium">{author}</span>
                    </div>
                    <a href="#" className="text-blue-600 font-medium hover:text-blue-800">Ver detalhes <i className="fas fa-arrow-right ml-1"></i></a>
                </div>
            </div>
        </div>
    );
}
export default ProjectCard;