"use client";
import { useState, useEffect } from "react";
import Snowfall from 'react-snowfall';
import AddCalendar from "../components/AddCalendar";
import Link from "next/link";
import { ArrowUturnRightIcon } from '@heroicons/react/24/solid';
import { XCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import DeleteCalendar from "../components/DeleteCalendar";

export default function MainPage() {

    const [calendars, setCalendars] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [calendarToDelete, setCalendarToDelete] = useState({});

    const closeModal = () => {
        setModalOpen(false);
    }

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
    }

    // Fetch the list of calendars from localStorage on component mount
    useEffect(() => {
        const savedCalendars = JSON.parse(localStorage.getItem('calendars')) || [];
        setCalendars(savedCalendars);
    }, [])

    // Save calendars to localStorage whenever they change
    useEffect(() => {
        if (calendars.length > 0) {
            localStorage.setItem('calendars', JSON.stringify(calendars));
        }

    }, [calendars])

    const addCalendar = (newCalendar) => {
        setCalendars(prevCalendars => [...prevCalendars, newCalendar]);
    }

    const deleteCalendar = (id) => {
        const updatedCalendars = calendars.filter((calendar) => calendar.id !== id);
        setCalendars(updatedCalendars);
        localStorage.setItem("calendars", JSON.stringify(updatedCalendars));
    };

    const handleDeleteClick = (calendar) => {
        setCalendarToDelete(calendar);
        setDeleteModalOpen(true);
    }

    return (
      <div className="bg-gradient-to-b from-white to-lavendar p-5 pb-60 min-h-screen relative">
        <Snowfall />
        <div className="p-8 pt-0 flex flex-col z-20 gap-4">
            <h1 className="pl-2 text-5xl font-lavish text-black drop-shadow-lg">one day</h1>
      
               <button
                    className="p-3 mt-6 bg-brown hover:bg-lavendar rounded-full text-md font-bold flex items-center justify-center space-x-2"
                    onClick={() => setModalOpen(true)}>
                    <span>add calendar</span>
                    <PlusCircleIcon className="h-5 w-5" /> 
                </button>
               

            <AddCalendar modalOpen={modalOpen} onClose={closeModal} addCalendar={addCalendar} />
        </div>

        <div className="px-10">
            {calendars.length > 0 &&
                <div>
                    <h1 className="bg-dogwood rounded-md p-4 text-lg font-bold text-white">calendars</h1>
            
                    <ul className="">
                        {calendars.map((calendar) => (
                        <Link href={`/calendar/${calendar.id}`} key={calendar.id} className="text-md text-gray-800">
                        <li className="bg-gray-100/70 shadow-md border-b border-gray-300 p-3 transition-transform transform hover:scale-105 hover:shadow-lg">
                            {/* Flex container for name, date, and icons */}
                            <div className="flex justify-between items-center">
                                {/* Calendar Name */}
                                <p className="flex-grow">{calendar.name}</p>
                                
                                {/* Creation Date */}
                                <p className="text-gray-400 text-sm mr-8">Created: {calendar.date}</p>

                                {/* Icons */}
                                <div className="flex items-center space-x-3">
                                    <button className="relative group p-2 rounded-full" onClick={(e) => e.preventDefault()}>
                                        <ArrowUturnRightIcon className="h-5 w-5" />
                                        <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full overflow-visible w-max hidden group-hover:block bg-brown text-white text-sm py-1 px-2 rounded-md shadow-md">
                                            Share
                                        </span>
                                    </button>
                                    <button className="relative group p-2 text-black rounded-full text-lg" onClick={(e) => { e.preventDefault(); handleDeleteClick(calendar); }}>
                                        <XCircleIcon className="h-5 w-5" />
                                        <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full overflow-visible w-max hidden group-hover:block bg-brown text-white text-sm py-1 px-2 rounded-md shadow-md">
                                            Delete
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </li>
                        </Link> 
                    ))}
                    </ul>
                 </div>}

        </div>

        <DeleteCalendar calendarToDelete={calendarToDelete} isOpen={deleteModalOpen} onClose={closeDeleteModal} onDelete={deleteCalendar} />

        <img
            src="/snowman.png"
            alt="Snowman decoration in the bottom-right hand corner"
            className="absolute bottom-0 right-0 h-32 w-auto sm:h-40 sm:right-4" 
        />
    
        

        </div>
    );
  }
  