import React from 'react';

function LoadingIndicator({darkMode}) {
    return(
        <div className="flex flex-row justify-start">
            <div className={`${darkMode ? "bg-gray-800 text-gray-100 border border-gray-700" : "bg-white text-gray-800 shadow-md"} rounded-2xl px-5 max-w-[80%] md:max-w-[70%]`}>
                <div className="flex flex-row p-2 items-center space-x-3">
                
                <div className={`w-2.5 h-2.5 ${darkMode ? "bg-gray-500" : "bg-pink-400"} rounded-full animate-bounce`} style={{animationDelay:"0s"}}> </div>
                <div className={`w-2.5 h-2.5 ${darkMode ? "bg-gray-500" : "bg-pink-400"} rounded-full animate-bounce`} style={{animationDelay:"150ms"}}> </div>
                <div className={`w-2.5 h-2.5 ${darkMode ? "bg-gray-500" : "bg-pink-400"} rounded-full animate-bounce`} style={{animationDelay:"300ms"}}> </div>
        </div>
        </div>
        </div>
    )
}

export default LoadingIndicator;