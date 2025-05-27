import React, { useEffect, useRef } from 'react';
import Positions from './Position';
import useNavbarContext from '../contexts/useNavbarContext';
// import Navbar from '../navbar/Navbar';
import Menu from '../navbar/Menu';
const CareerPage = () => {
    const { setSectionRefs } = useNavbarContext();
    const positionsRef = useRef(null);

    useEffect(() => {
        setSectionRefs(prev => ({
            ...prev,
            positions: positionsRef,
         
       
        }))
    }, [setSectionRefs])

    return (
        <div>
            {/* <Navbar /> */}

            <section ref={positionsRef}>
                <Positions />
                <Menu/>

            </section>
        </div>
    )
}

export default CareerPage;