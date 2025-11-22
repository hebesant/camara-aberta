import { useState } from 'react'; 
import './header.css';
import { NavLink } from 'react-router-dom';
import BalanceIcon from '../icons/balance-3-svgrepo-com.svg';

function Header() {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="site-header">
            <div className="header-container">
                <div className="logo-section">
                    <NavLink to="/" onClick={closeMenu} style={{display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none'}}>
                        <img src={BalanceIcon} alt="Ícone de Balança" className="logo-icon" />
                        <h1 className="site-title">Câmara Aberta</h1>
                    </NavLink>
                </div>
                
                {}
                <nav className="main-nav desktop-only">
                    <NavLink to="/" end>Início</NavLink>
                    <NavLink to="/projetos">Projetos</NavLink>
                    <NavLink to="/politicos">Políticos</NavLink>
                </nav>
                
                {}
                <button className="menu-button" onClick={toggleMenu} aria-label="Abrir menu">
                    <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
            </div>

            {}
            <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                <nav className="mobile-nav-links">
                    <NavLink to="/" end onClick={closeMenu}>Início</NavLink>
                    <NavLink to="/projetos" onClick={closeMenu}>Projetos</NavLink>
                    <NavLink to="/politicos" onClick={closeMenu}>Políticos</NavLink>
                </nav>
            </div>
        </header>
    );
}

export default Header;