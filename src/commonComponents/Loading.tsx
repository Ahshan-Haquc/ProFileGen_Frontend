import React from 'react';
import Lottie from "lottie-react";
import LoadingAnimation from '../assets/LoadingAnimation.json'

const Loading = ({ loadingMessage }) => {
    return (
        <div className='fixed top-0 left-0 h-screen w-screen bg-white flex flex-col justify-center items-center z-100'>
            <Lottie animationData={LoadingAnimation} className="h-[300px] w-[300px] block" />
            <div className="text-2xl font-bold">{loadingMessage}</div>
        </div>
    );
};

export default Loading;