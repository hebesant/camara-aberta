
import React from 'react';
import TeamMember from './team-member';
import './team.css';

const TeamSection: React.FC = () => {
    
    const teamData = [
        { icon: 'fas fa-user-tie', name: 'Heberty', role: 'Gerente de Projeto' },
        { icon: 'fas fa-laptop-code', name: 'Roberto', role: 'Analista de Sistemas' },
        { icon: 'fas fa-laptop-code', name: 'Eduardo', role: 'Analista de Sistemas' },
        { icon: 'fas fa-paint-brush', name: 'Tiago', role: 'Front-End' },
        { icon: 'fas fa-paint-brush', name: 'Miguel', role: 'Front-End' },
        { icon: 'fas fa-server', name: 'Gabriel', role: 'Back-End' },
        { icon: 'fas fa-bug', name: 'Gustavo', role: 'Testador/Qualidade' },
    ];

    return (
        <section className="team-section">
            <div className="container">
                <h2 className="section-title">Nossa Equipe</h2>
                <div className="team-grid">
                    {teamData.map(member => (
                        <TeamMember
                            key={member.name} 
                            icon={member.icon}
                            name={member.name}
                            role={member.role}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;