import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Send, User, Bot, Loader2 } from 'lucide-react';
import { initializeChat, resetChat } from '../services/geminiService';
import { GenerateContentResponse } from "@google/genai";
import { Message } from '../types';

interface ChatViewProps {
  onBack: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({ onBack }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    if (!hasStarted) {
      setHasStarted(true);
      resetChat(); // Reset chat context on new view mount
      setMessages([
        {
          id: 'welcome',
          role: 'model',
          text: 'שלום! הגעת לגיהוציה. אשמח לעזור לך בהזמנת איסוף כביסה או גיהוץ. איך אפשר לעזור?'
        }
      ]);
    }
  }, [hasStarted]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const chat = initializeChat();
      const result = await chat.sendMessageStream({ message: userMsg.text });
      
      let fullResponse = '';
      const botMsgId = (Date.now() + 1).toString();
      
      // Add empty bot message holder
      setMessages(prev => [...prev, { id: botMsgId, role: 'model', text: '' }]);

      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          fullResponse += c.text;
          // Update the last message with accumulating text
          setMessages(prev => prev.map(msg => 
            msg.id === botMsgId ? { ...msg, text: fullResponse } : msg
          ));
        }
      }
    } catch (error) {
      console.error("Chat Error", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: 'אופס, נתקלתי בבעיה בתקשורת. אנא נסה שנית או השתמש בטופס ההזמנה הרגיל.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[600px] w-full max-w-2xl mx-auto bg-white md:rounded-2xl md:shadow-xl overflow-hidden mt-0 md:mt-4">
      {/* Chat Header */}
      <div className="bg-green-600 p-4 flex items-center shadow-sm flex-shrink-0">
        <button onClick={onBack} className="text-white hover:bg-green-700 p-1 rounded-full mr-2">
          <ArrowRight className="w-6 h-6" />
        </button>
        <div className="flex flex-col mr-2">
          <h2 className="text-white font-bold text-lg">צ׳אט עם נציג</h2>
          <span className="text-green-100 text-xs">זמין כעת • מופעל על ידי AI</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scrollbar-hide">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row' : 'flex-row-reverse'}`}>
              <div 
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1
                  ${msg.role === 'user' ? 'bg-blue-100 ml-2' : 'bg-green-100 mr-2'}
                `}
              >
                {msg.role === 'user' ? <User className="w-5 h-5 text-blue-600" /> : <Bot className="w-5 h-5 text-green-600" />}
              </div>
              
              <div 
                className={`
                  p-3 rounded-2xl text-sm md:text-base shadow-sm
                  ${msg.role === 'user' 
                    ? 'bg-white text-gray-800 rounded-tr-none border border-gray-200' 
                    : 'bg-green-50 text-gray-800 rounded-tl-none border border-green-100'
                  }
                `}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-end pr-12">
            <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center space-x-2 space-x-reverse">
              <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
              <span className="text-xs text-gray-400">הנציג מקליד...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100 flex-shrink-0">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 border border-transparent focus-within:border-green-500 focus-within:bg-white transition-colors">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="כתוב הודעה..."
            className="flex-1 bg-transparent focus:outline-none text-gray-700 mx-2"
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-2 rounded-full transition-colors ${!input.trim() ? 'text-gray-400' : 'text-green-600 hover:bg-green-50'}`}
          >
            <Send className="w-5 h-5 transform rotate-180" /> 
            {/* Rotate icon for RTL context if needed, though 'Send' usually points right which is backwards for RTL logic unless mirrored. Lucide Send points Right. In RTL Hebrew, forward is Left. Let's strictly follow standard UI. Usually send icon points to the message flow. In RTL whatsapp it points left. */}
          </button>
        </div>
      </div>
    </div>
  );
};
