'use client';

import { motion } from "framer-motion"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Snowfall from 'react-snowfall';
import Modal from './Modal';

const Calendar = ({ calendar }) => {

    // Days 1-24
    const days = Array.from({ length: 24 }, (_, index) => index + 1); 

    const [shuffledDays, setShuffledDays] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(true);

    useEffect(() => {
        // Shuffle the days and store the shuffled array in state
        const shuffled = [...days].sort(() => Math.random() - 0.5);
        setShuffledDays(shuffled);

    }, [calendar.id]);

    const openModal = (day) => {
        setSelectedDay(day);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    }

    const toggleEditMode = () => {
        setEditMode((prevMode) => !prevMode);
    }

  return (
    <div className="bg-gradient-to-b from-white to-blue-200 flex flex-col justify-between items-center h-screen relative pt-14">
        {!editMode && (<Snowfall 
            style={{
                position: 'fixed',
                width: '100vw',
                height: '100vh',
              }}
              radius={[1, 4]}
        
        />)} 
        <h1 className="font-lavish font-bold text-gray-400 text-5xl text-center">{calendar.name}</h1>

        <div className="absolute top-4 left-4 flex items-center space-x-4">
            <Link href="/"><button className="p-3 bg-cyan-700 hover:bg-cyan-800 rounded-full text-sm font-bold">Home</button></Link>
            <button className="p-3 m-3 bg-cyan-700 hover:bg-cyan-800 rounded-full text-sm font-bold" onClick={toggleEditMode}>
                {editMode ? 'View Calendar' : 'Edit Calendar'}
            </button>
        </div>
     

      <img
        src="/snowman.png"
        alt="Snowman decoration in the bottom-left corner"
        className="absolute bottom-0 left-4 md:left-24 h-24 w-auto sm:h-32 z-10"
      />

    <div className="flex flex-row flex-grow w-full items-end justify-center" >

        <div className="font-script grid grid-cols-2 grid-rows-2 sm:grid-cols-4 gap-4 pb-12 px-8 pt-8 bg-rose-900 md:ml-10">
                {shuffledDays.slice(0, 8).map((day) => (
                    <motion.div
                        key={day}
                        onClick={() => openModal(day)}
                        className="relative flex items-center justify-center w-16 h-16 sm:w-28 text-3xl text-white cursor-pointer shadow-xl bg-gradient-to-b from-amber-200 to-pink border-2 border-white rounded-tl-[20px] rounded-tr-[20px]"
                        whileHover={{
                            scale: 1.1,
                            rotate: -5,
                            transition: { type: "spring", stiffness: 300 },
                            boxShadow: '0px 4px 10px rgba(255, 0, 0, 0.5)'
                        }}
                        whileTap={{ borderColor: 'transparent', scale: 0.95 }}
                    >
                        {day}
                        <div className="absolute bottom-0 w-16 sm:w-28 h-3 border-2 border-white bg-amber-900 rounded"></div>
                    </motion.div>
                        ))}
            </div>

        {/* Grid 2 (16 Days) */}
            <div className="font-script grid grid-cols-4 grid-rows-4 gap-6 bg-brown p-8 md:p-10 md:ml-5">
                {shuffledDays.slice(8, 24).map((day) => (
                    <motion.div
                        key={day}
                        onClick={() => openModal(day)}
                        className="relative flex items-center justify-center w-20 h-24 sm:w-20 sm:h-32 text-3xl text-white cursor-pointer shadow-xl bg-gradient-to-b from-blue-400 to-amber-100 border-2 border-white rounded-tl rounded-tr"
                        whileHover={{
                            scale: 1.1,
                            rotate: 5,
                            transition: { type: "spring", stiffness: 300 },
                            boxShadow: '0px 8px 10px rgba(0, 76, 153, 0.5)'
                        }}
                        whileTap={{ borderColor: 'transparent', scale: 0.95 }}
                    >
                        {day}

                    <div className="absolute bottom-0 w-20 h-3 border-2 border-white bg-slate-400 rounded"></div>
                    </motion.div>
                ))}
                
            </div>

    </div>
    
            


      {/* Calendar Days */}
      {/* <div className="relative grid grid-cols-4 gap-4">
        {shuffledDays.map((day) => (
            <motion.div
                key={day}
                onClick={() => openModal(day)}
                className="font-script relative flex items-center justify-center w-20 h-32 text-3xl text-white cursor-pointer shadow-xl bg-gradient-to-b from-blue-400 to-amber-100 border-2 border-white rounded-tl rounded-tr"
                // whileHover={{ borderColor: 'transparent', scale: 1.1 }}
                whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: { type: "spring", stiffness: 300 }
                }}
                whileTap={{ borderColor: 'transparent', scale: 0.95 }}
            >
              {day}

            {/* <img
                src="/background.webp"
                alt="Hovered image"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
            /> */}
              
              {/* <div className="absolute bottom-0 w-20 h-3 border-2 border-white bg-slate-400 rounded"></div>
            
            </motion.div>
        ))} */} 
        

        {/* </div> */}

    

    {/* <img
        src="/tree.png"
        alt="Christmas Tree"
        className="absolute bottom-0 right-3 h-120 w-auto" 
    /> */}

    {/* <img
        src="/snowman.png"
        alt="Snowman decoration in the bottom-right hand corner"
        className="absolute bottom-0 right-0 h-32 w-auto sm:h-48 sm:right-4 md:right-0" 
    /> */}
  
        {modalOpen && (
            <Modal day={selectedDay} id={calendar.id} onClose={closeModal} mode={editMode} className="sm:w-full lg:w-2/3" />
        )}

    </div>
  );
};

export default Calendar;
