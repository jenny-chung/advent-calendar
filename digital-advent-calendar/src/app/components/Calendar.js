'use client';

import { motion } from "framer-motion"
import { useState, useEffect } from 'react';
import Snowfall from 'react-snowfall';
import Modal from './Modal';

const Calendar = () => {

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
    }, []);

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

    const saveContentForDay = (text, image) => {
        console.log('Saving data for day:', selectedDay);
        
        localStorage.setItem(`day-${selectedDay}-text`, text);
        
        if (image) {
            localStorage.setItem(`day-${selectedDay}-image`, image)
        }
        
    }

  return (
    <div className="flex flex-col justify-between items-center h-screen relative pt-14">
        <Snowfall 
            style={{
                position: 'fixed',
                width: '100vw',
                height: '100vh',
              }}
        
        />
         {/* <Snowfall
                color="#fff"
                snowflakeCount={100} // You can change the number of snowflakes
                speed={0.5} // Speed of falling snowflakes
                radius={[3, 5]} // Size of snowflakes
            /> */}

     

      <button className="absolute top-4 left-4 p-3 m-3 bg-cyan-700 hover:bg-cyan-800 rounded-full text-sm font-bold" onClick={toggleEditMode}>
        {editMode ? 'View Calendar' : 'Edit Calendar'}
      </button>

      <img
        src="/snowman.png"
        alt="Snowman"
        className="absolute bottom-0 left-10 h-24 w-auto" 
    />

    <div className="flex flex-row flex-grow w-full items-end justify-center mb-0">


        <div className="grid grid-cols-4 grid-rows-2 gap-4 pb-12 pt-4 pl-4 pr-4 bg-rose-900">
                {shuffledDays.slice(0, 8).map((day) => (
                    <motion.div
                        key={day}
                        onClick={() => openModal(day)}
                        className="relative flex items-center justify-center w-28 h-16 text-3xl text-white cursor-pointer shadow-xl bg-gradient-to-b from-amber-200 to-pink border-2 border-white rounded-tl-[20px] rounded-tr-[20px]"
                        whileHover={{
                            scale: 1.1,
                            rotate: 5,
                            transition: { type: "spring", stiffness: 300 }
                        }}
                        whileTap={{ borderColor: 'transparent', scale: 0.95 }}
                    >
                        {day}
                        <div className="absolute bottom-0 w-28 h-3 border-2 border-white bg-amber-900 rounded"></div>
                    </motion.div>
                        ))}
            </div>

        {/* Grid 2 (18 Days) */}
            <div className="grid grid-cols-4 grid-rows-4 gap-6 bg-brown p-12 ml-10">
                {shuffledDays.slice(8, 24).map((day) => (
                    <motion.div
                        key={day}
                        onClick={() => openModal(day)}
                        className="relative flex items-center justify-center w-20 h-32 text-3xl text-white cursor-pointer shadow-xl bg-gradient-to-b from-blue-400 to-amber-100 border-2 border-white rounded-tl rounded-tr"
                        whileHover={{
                            scale: 1.1,
                            rotate: 5,
                            transition: { type: "spring", stiffness: 300 }
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

    <img
        src="/snowman.png"
        alt="Snowman"
        className="absolute bottom-0 right-4 h-52 w-auto" 
    />
  
        {modalOpen && (
            <Modal day={selectedDay} onClose={closeModal} saveOnClose={saveContentForDay} mode={editMode} />
        )}

    </div>
  );
};

export default Calendar;
