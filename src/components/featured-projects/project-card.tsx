
import React from 'react';
import { type ProjectData } from '../types.tsx';
import { Link } from 'react-router-dom';


const getStatusClass = (status: string): string => {
    const statusLower = status?.toLowerCase() || ''; 

    if (statusLower.includes('aprovado')) {
        return 'status-approved';
    }
    if (statusLower.includes('rejeitado') || statusLower.includes('vetado')) {
        return 'status-vetoed'; 
    }
    return 'status-discussion'; 
};

interface ProjectCardProps {
    project: ProjectData;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    
    const statusClassName = getStatusClass(project.status);
    
    
    const { authors } = project;

    return (
        <div className="project-card">
            <div className="project-card-content">
                <div className="card-header">
                    <div>
                        <span className={`status-badge ${statusClassName}`}>
                            {project.status}
                        </span>
                        <h3 className="card-title">{project.title}</h3>
                    </div>
                    <div className="card-date">{project.date}</div>
                </div>

                <div className="ai-summary">
                    <div className="ai-summary-header">
                        <span>Resumo:</span>
                    </div>
                    <p className="ai-summary-text">{project.summary}</p>
                </div>

                <div className="tags-container">
                    {project.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                </div>

               
                <div className="card-footer">
                    <div className="author-info">
                        
                      
                        {authors.length > 1 && (
                            <div className="author-stack">
                                {authors.slice(0, 3).map((author, index) => ( 
                                    <img 
                                        key={index}
                                        src={author.imageUrl} 
                                        alt={`Foto de ${author.name}`} 
                                        className="author-image-stacked"
                                        style={{ zIndex: authors.length - index, marginLeft: index > 0 ? '-10px' : '0' }}
                                    />
                                ))}
                            </div>
                        )}

               
                        {authors.length === 1 && (
    <>
      
        {authors[0].id ? (
            <Link to={`/politicos/${authors[0].id}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                 <img src={authors[0].imageUrl} alt={authors[0].name} className="author-image" />
                 <span className="author-name hover:text-blue-600 hover:underline">{authors[0].name}</span>
            </Link>
        ) : (
            <>
                <img src={authors[0].imageUrl} alt={authors[0].name} className="author-image" />
                <span className="author-name">{authors[0].name}</span>
            </>
        )}
    </>
)}
                        
                    
                        {authors.length === 0 && (
                            <span className="author-name">Autoria não informada</span>
                        )}

                    </div>
                    <Link to={`/projetos/${project.id}`} className="details-link">
                        Ver detalhes
                    </Link>
                </div>
              
            </div>
        </div>
    );
};



export default ProjectCard;