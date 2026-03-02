
function Header({darkMode, toggleDarkMode}) {
    return(
        <header className = {`${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} shadow-md py-4`}>
        <div className = "flex items-center justify-between max-w-5xl mx-auto">
        <div className ="flex p-2 items-center space x-3">
            <div className="p-2 h-1 w-1 flex items-center justify-center bg-gradient-to-r from-pink-500 to-blue-500 rounded-full">
            </div>
            <h1 className = "text-xl font-bold">AI friend</h1>
        </div>
        <div className = "flex items-center space-x-4">
            <div className={`flex items-center space-x-1 px-3 py-1 rounded text-sm font-medium bg-gray-100 ${darkMode ? "text-white bg-gray-700" : "text-gray-800 bg-white"}`}>
    
                <span className={`${darkMode ? "text-white" : "text-gray-800"}`}> Google Gemini 2.5 flash</span>
            </div>
        </div>
        <button className = {`p-2 rounded-full cursor-pointer ${darkMode ? "bg-gray-700 text-pink-200" : "bg-pink-700 text-white"}`}
        onClick={toggleDarkMode}
        >
            {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        </div>
        </header>

    )
}
export default Header