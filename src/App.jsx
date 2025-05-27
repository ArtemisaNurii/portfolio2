import gsap from 'gsap'
import { CustomEase, SplitText } from 'gsap/all'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ReactLenis from 'lenis/react'
import { useEffect, useRef } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import CursorProvider from './components/contexts/CursorProvider'
import CustomCursor from './components/global/CustomCursor'
import Layout from './components/Layout'
import CareerPage from './components/career-page/CareerPage'
import Application from './components/career-page/Application'
import Navbar from './components/navbar/Navbar'


gsap.registerPlugin(CustomEase, ScrollTrigger, SplitText);

function App() {
    const lenisRef = useRef();

    useEffect(() => {
        function update(time) {
            lenisRef.current?.lenis?.raf(time * 1000)
        }

        gsap.ticker.add(update);

        ScrollTrigger.refresh();

        return () => {
            gsap.ticker.remove(update);
        }
    }, [])

    return (
        <ReactLenis
            root
            options={{
                lerp: 0.08,
                smoothWheel: true,
                autoRaf: false
            }}
            ref={lenisRef}
        >
            <CursorProvider>
                <CustomCursor />
                
                <BrowserRouter>
                    <Routes>

                        <Route
                            path='/'
                            element={
                                <Layout />
                            }
                        />
                          <Route path="/career" element={<CareerPage />} />
                          <Route path="/application" element={<Application />} />
                    </Routes>
                </BrowserRouter>
            </CursorProvider>
        </ReactLenis>
    )
}

export default App
