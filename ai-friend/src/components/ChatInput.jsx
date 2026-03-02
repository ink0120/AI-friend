import React from 'react'

function ChatInput({darkMode, input, setInput, loading, handleSendMessage}){
    return(
        <div className ={`${darkMode ? "bg-gray-800 border-t border-gray-700" : "bg-white border-t border-gray-200"} p-4`}>
            <div className = "max-w-5xl mx-auto">
                <div className="flex items-center space-x-3">
                    <input 
                    value ={input}
                    onChange={(e)=> setInput(e.target.value)}
                    onKeyDown={(e)=> {
                        if (e.key === "Enter" && !e.shiftKey){
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                    type="text"
                     placeholder="Type your message..."  
                     className={`flex-1 border 
                     ${darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" 
                     : "bg-white border-gray-300 text-gray-900"} rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent`} />
                    <button 
                    onClick={handleSendMessage}
                    disabled={loading || !input.trim()}
                    className= {`p-3 rounded-full transition-colors shadow-md cursor-pointer ${darkMode ? "bg-pink-600 hover:bg-pink-700" : "bg-pink-500 hover:bg-pink-600"}`}><p className = {`${darkMode ? "text-white" : "text-white"}`}>Enter</p></button>
                </div>
            </div>
        </div>

    )
}

export default ChatInput