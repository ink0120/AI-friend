import React from 'react'
import Header from './components/Header'
import ChatMessage from './components/ChatMessages'
import ChatInput from './components/ChatInput'
import LoadingIndicator from './components/LoadingIndicator'

import generateContent from './services/gemini'

import {formatTime} from "../utils/chatUtils"


//import RightSide from './DropBox'


import './App.css'
const availableTraits = ["Happy", "Rude", "Funny", "Boring", "Sad","Conversational","Party","Evil","Mysterious","Knowledgable","Quirky","Skeptical","Caring"];

function Trait({ darkMode, traitName, onAction, isSelected }) {
  return (
    <div className={`flex items-center gap-2 px-4 py-1 border rounded-full transition-all duration-200 shadow-sm
      ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <h5 className={`text-sm font-semibold ${darkMode ? 'text-gray-50' : 'text-gray-700'} select-none`}>
        {traitName}
      </h5>

      <button 
        onClick={onAction}
        className={`ml-1 hover:text-red-500 font-bold ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}
      >
        {isSelected ? '✕' : '+'}
      </button>
    </div>
  );
}

function CustomTrait({ darkMode, onAction }) {
  const [inputValue, setInputValue] = React.useState("");

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (trimmed === "") return; 

    onAction(trimmed);
    setInputValue("");
  };

  return (
    <div className={`flex items-center gap-2 px-4 py-1 border rounded-full transition-all duration-200 shadow-sm
      ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      
      <input 
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Custom..."
        className={`bg-transparent border-none outline-none text-sm font-semibold w-20 
          ${darkMode ? 'text-gray-50 placeholder-gray-500' : 'text-gray-700 placeholder-gray-400'}`}
      />
      
      <button 
        onClick={handleAdd}
        className={`ml-1 font-bold transition-colors cursor-pointer
          ${darkMode ? 'text-gray-500 hover:text-green-400' : 'text-gray-400 hover:text-green-600'}`}
      >
        +
      </button>
    </div>
  );
}

function TraitBar({ darkMode, onAddTrait, availableTraits }) { 
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {availableTraits.map((t) => (
        <Trait 
          key={t} 
          traitName={t} 
          darkMode={darkMode} 
          onAction={() => onAddTrait(t)} 
          isSelected={false}
        />
      ))}
      <CustomTrait darkMode={darkMode} onAction={onAddTrait} />
    </div>
  );
}
function DropBox({ darkMode, selectedTraits, onRemoveTrait }) {

  return (
    <div className={`
      flex flex-wrap items-center justify-center gap-3
      w-full min-h-[200px] p-6 
      border-2 border-dashed rounded-xl transition-all
      ${darkMode 
          ? "border-gray-700 bg-gray-900 text-gray-200" 
          : "border-gray-300 bg-gray-50 text-gray-500"}
      hover:border-indigo-500
    `}>
      {selectedTraits.length === 0 ? (
        <h3>Traits appear here!</h3>
      ) : (
        selectedTraits.map((trait) => (
          <Trait 
            key={trait} 
            traitName={trait} 
            darkMode={darkMode} 
            onAction={() => onRemoveTrait(trait)} 
            isSelected={true}
          />
        ))
      )}
    </div>
  );
}


function App() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState([
    {
      id: "1",
      text: "Hello, how are you?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
    const [selectedTraits, setSelectedTraits] = React.useState(["Conversational"]);
  const MAX_TRAITS = 3;

  const addTrait = (name) => {
    if (selectedTraits.length < MAX_TRAITS && !selectedTraits.includes(name)) {
      setSelectedTraits([...selectedTraits, name]);
    }
  };

  const removeTrait = (name) => {
    setSelectedTraits(selectedTraits.filter(t => t !== name));
  };

   const getPersonality = () => selectedTraits.join(", ");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };



  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date()
    };

    const currentInput = input;

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);


    setTimeout(() => {
      const personality = getPersonality();
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: generateContent(currentInput,personality), 
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

return (
  <div className="grid grid-cols-1 md:grid-cols-2 h-screen overflow-hidden">
    {/*CHAT SIDE*/}
<div className={`flex flex-col h-full max-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
  
  <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
  
  <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
    <div className="max-w-5xl mx-auto space-y-4">
      {messages.map((message) => (
        <ChatMessage 
          key={message.id}
          darkMode={darkMode} 
          message={message} 
          formatTime={formatTime}
        />
      ))}
      {isLoading && <LoadingIndicator darkMode={darkMode} />}
      

      <div id="anchor"></div>
    </div>
  </div>


  <div className={`p-4 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
    <ChatInput 
      darkMode={darkMode} 
      input={input} 
      setInput={setInput} 
      loading={isLoading} 
      handleSendMessage={handleSendMessage} 
    />
  </div>
</div>
{/*PERSONALITY PART*/}

    <div className={`hidden md:flex items-center justify-center border-l ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="text-center p-8">
        <h1 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Try adding a personality trait!
        </h1>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
          Watch your AI change in real time.
        </p>
    <div className="flex flex-col gap-6 p-4">
      <DropBox 
        darkMode={darkMode} 
        selectedTraits={selectedTraits} 
        onRemoveTrait={removeTrait} 
      />
      <TraitBar 
        darkMode={darkMode} 
        onAddTrait={addTrait} 
        availableTraits={availableTraits}
      />
    </div>
      </div>
    </div>
  </div>
);
}
export default App 