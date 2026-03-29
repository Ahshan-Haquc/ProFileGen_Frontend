import React from 'react';

const Footer = () => {
    return (
        <div className='mt-28'>
            <footer className="bg-gray-50  py-8  absolute bottom-0 left-0 w-full">
                <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-bold">ProFileGen</h2>
                        <p className="text-sm mt-1">Your personalized CV and Resume Builder.</p>
                    </div>

                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:underline">Home</a>
                        <a href="#" className="hover:underline">Templates</a>
                        <a href="#" className="hover:underline">Guidlines</a>
                        <a href="#" className="hover:underline">Features</a>
                        <a href="#" className="hover:underline">Contact</a>
                    </div>

                    <div className="mt-4 md:mt-0 text-center md:text-right text-sm">
                        <p>&copy; {new Date().getFullYear()} ProFileGen. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
