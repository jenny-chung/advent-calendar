'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Modal = ({ day, id, onClose, mode }) => {

    const message = day === 24 ? "the wait is over!" : `${24 - day} more days till christmas :)`;

    const defaultData = {
        text: "sorry, no personalized surprise today. " + message,
        image: "/image.png"
    };

    const [text, setText] = useState('');
    const [image, setImage] = useState(null);

    // Fetch saved content from localStorage when modal opens
    useEffect(() => {
        if (day !== null && id) {
            const savedText = localStorage.getItem(`${id}-day-${day}-text`);
            const savedImage = localStorage.getItem(`${id}-day-${day}-image`);
            
            if (savedText) {
                setText(savedText);
            } else {
                setText(defaultData.text);
            }

            if (savedImage) {
                setImage(savedImage);
            } else {
                setImage(defaultData.image);
            }
        }
        
    }, [day, id]);

    // Auto-save text and image to localStorage every time the state changes
    useEffect(() => {
        
        console.log("Auto saving calendar content to local storage")
        if (text && text !== defaultData.text) {
            localStorage.setItem(`${id}-day-${day}-text`, text);
        }
           
        if (image && image !== defaultData.image) {
            localStorage.setItem(`${id}-day-${day}-image`, image);
        }

    }, [day, id, text, image]);

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64Image = reader.result;
                setImage(base64Image);
                localStorage.setItem(`${id}-day-${day}-image`, base64Image);
            };

            reader.readAsDataURL(file);
        
        }
    };

    const handleSave = (text, image) => {
        console.log('Saving data for day:', day);
        
        localStorage.setItem(`${id}-day-${day}-text`, text);
        
        if (image) {
            localStorage.setItem(`${id}-day-${day}-image`, image);
        }        
    }
    
    const handleClose = () => {
        if (mode) {
            const savedText = localStorage.getItem(`day-${day}-text`);
            const savedImage = localStorage.getItem(`day-${day}-image`);

            if (savedText != text || savedImage != image) {
                handleSave(text, image);
            }
        }
        onClose();
    }

    const handleBackgroundClose = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center" onClick={handleBackgroundClose}>
            
            <div className="bg-dogwood p-4 rounded-lg max-w-lg w-full relative" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-center font-bold w-full">
                    {mode && (<div className="font-script text-3xl mt-2">Day {day}</div>)}
                    <button 
                        className="absolute right-2 top-1 text-white hover:bg-pink px-2 rounded"
                        onClick={handleClose}
                    >
                        X
                    </button>
                </div>

                {/* <div className="flex flex-row w-full p-3 items-center justify-between z-10 font-bold text-xl">
                    Door {day}
                </div>  {/* Image Content */}

            {mode ? (
                <>
                {/* Image Content */}
                    {image && <img className="w-full h-auto max-h-48 object-contain rounded my-4" src={image} alt="Uploaded image" />}
                    <input
                        type="file"
                        accept="image/*"
                        className="w-full mt-3 mb-5"
                        onChange={handleImageChange}
                    />
            
                {/* Text Content */}
                    <textarea
                        className="w-full h-24 p-2 mb-4 border border-gray-300 rounded text-black"
                        placeholder="Enter text content..."
                        value={text === defaultData.text && text.length === defaultData.text.length ? "" : text}
                        onChange={handleTextChange}
                    />

                </>
            ) : (
                <motion.div
                    className="flex flex-col items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* View Mode: Display Saved Content */}
                    {text && <h2 className="pt-10 text-white text-xl text-center">{text}</h2>}
                    {image && <img className="w-full h-auto max-h-48 object-contain rounded my-6" src={image} alt="Uploaded image" />}
                </motion.div>
            )}
            

            </div>
        </div>
    )

}

export default Modal;