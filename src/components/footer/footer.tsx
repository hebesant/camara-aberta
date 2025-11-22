
import React from 'react';
import './footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                   
                    <div>
                        <div className="footer-about-title">
                            <i className="fas fa-balance-scale"></i>
                            <h3>Transparência Legislativa</h3>
                        </div>
                        <p className="footer-description">
                            Plataforma de acompanhamento legislativo com inteligência artificial para maior transparência e participação cidadã.
                        </p>
                    </div>

                 
                    <div>
                        <h4 className="footer-column-title">Links Úteis</h4>
                        <ul className="footer-list">
                            <li><a href="#">Projetos de Lei</a></li>
                            <li><a href="#">Vereadores</a></li>
                            <li><a href="#">Calendário Legislativo</a></li>
                            <li><a href="#">Glossário</a></li>
                        </ul>
                    </div>

                    {/* Coluna 3: Contato */}
                    <div>
                        <h4 className="footer-column-title">Contato</h4>
                        <ul className="footer-list">
                            <li><i className="fas fa-envelope"></i> contato@transparencialegislativa.org</li>
                            <li><i className="fas fa-phone"></i> (11) 1234-5678</li>
                            <li><i className="fas fa-map-marker-alt"></i> São Paulo, SP</li>
                        </ul>
                    </div>

                   
                    <div>
                        <h4 className="footer-column-title">Redes Sociais</h4>
                        <div className="social-links">
                            <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2025 Plataforma de Transparência Legislativa com IA. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;