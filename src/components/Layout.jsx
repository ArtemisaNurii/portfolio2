import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import useNavbarContext from './contexts/useNavbarContext';
import Footer from './landing-page/Footer';
import LandingPage from './landing-page/LandingPage';
import Navbar from './navbar/Navbar';

const Layout = () => {
    const footerRef = useRef();
    const { setSectionRefs } = useNavbarContext();

    useEffect(() => {
        setSectionRefs(prev => ({
            ...prev,
            contacts: footerRef
        }))
    }, [setSectionRefs])

    return (
        <>
            <Navbar />
            <main>
                <LandingPage />
                <Outlet />
            </main>

            <section ref={footerRef}>
                <Footer />
            </section>
        </>
    )
}

export default Layout;
