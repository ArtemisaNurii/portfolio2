import { useEffect, useRef } from 'react';
import useNavbarContext from '../contexts/useNavbarContext';
import About from './About';
import Hero from './Hero';
// import SlidingImages from './SlidingImages';
import Testimonials from './Testimonials';
import Team from './Team';
import Process from './Process';
const LandingPage = () => {
    const { setSectionRefs } = useNavbarContext();
    const heroRef = useRef();
    const aboutRef = useRef();
    const membersRef = useRef();
    const testimonialsRef = useRef();
    const servicesRef= useRef();
    const processRef = useRef();

    useEffect(() => {
        setSectionRefs(prev => ({
            ...prev,
            hero: heroRef,
            about: aboutRef,
            members: membersRef,
            testimonials: testimonialsRef,
            services: servicesRef,
            process: processRef,
        }))
    }, [setSectionRefs])

    return (
        <div>
            <section ref={heroRef}>
                <Hero />
            </section>
            <section ref={aboutRef}>
                <About />
            </section>
            <section ref={processRef}>
                <Process />
            </section>
            <section ref={membersRef}>
                <Team />
            </section>
            <section ref={testimonialsRef}>
                <Testimonials />
            </section>
        
            
        </div>
    )
}

export default LandingPage;
