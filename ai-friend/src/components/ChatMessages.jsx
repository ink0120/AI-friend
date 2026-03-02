import React from 'react';

function ChatMessage({ darkMode, message, formatTime }) {
    const isUser = message.sender === "user";

    return (
        <div className={`flex w-full mb-4 ${isUser ? "justify-end" : "justify-start"}`}>
            <div className={`flex max-w-[80%] md:max-w-[70%] rounded-2xl px-5 py-3.5 ${
                isUser 
                ? "bg-gradient-to-r from-red-600 to-purple-600 text-white shadow-md" 
                : darkMode ? "bg-gray-800 text-gray-100 border border-gray-700" : "bg-white text-gray-800 shadow-md"
            }`}>
                {/* Icon Section */}
                <div className={`flex-shrink-0 mr-3 ${isUser ? "text-pink-200" : darkMode ? "text-pink-400" : "text-pink-600"}`}>
                    {isUser ? <p className="font-bold">You</p> : <p className="font-bold">AI</p>}
                </div>

                <div className="flex-1">
                    <div className="mb-1 flex justify-between items-center gap-4">
                        <span className="font-medium text-sm">
                            {isUser ? "You" : "AI Friend"}
                        </span>
                        <span className={`text-xs ${isUser ? "opacity-70" : darkMode ? "text-gray-400" : "text-gray-500"}`}>
                            {formatTime(message.timestamp)}
                        </span>
                    </div>
                    <p className="text-sm md:text-base whitespace-pre-wrap break-words leading-relaxed">
                        {message.text}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ChatMessage;