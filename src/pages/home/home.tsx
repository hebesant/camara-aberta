import './home.css';
import Header from '../../components/header/header';
import Hero from '../../components/hero/hero';
import StatsSection from '../../components/stats/stats';
import FeaturedProjects from '../../components/featured-projects/featured-projects';
import TeamSection from '../../components/team/team';
import Footer from '../../components/footer/footer';
import FeaturedVereadores from '../../components/politico-card/featured-politicos';


function App() {
    return (
        <>
            <Header /> 
            <Hero />
            <StatsSection />
            <FeaturedProjects />
            <FeaturedVereadores />
           
            <TeamSection /> 
            <Footer />
        </>
    );
}

export default App;