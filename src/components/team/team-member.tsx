
import React from 'react';


interface TeamMemberProps {
    icon: string;
    name: string;
    role: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ icon, name, role }) => {
    return (
        <div className="team-member">
            <div className="member-icon-container">
                <i className={icon}></i>
            </div>
            <h3 className="member-name">{name}</h3>
            <p className="member-role">{role}</p>
        </div>
    );
};

export default TeamMember;