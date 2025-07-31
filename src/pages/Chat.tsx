import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Globe } from 'lucide-react';
import { getResponse } from '../data/chatbotResponses';
import { ChatMessage } from '../types';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add welcome message
    const welcomeMessage: ChatMessage = {
      id: '1',
      message: language === 'en' 
        ? 'Hello! Welcome to Simhastha Guardian. I can help you with information about timings, directions, health facilities, crowd status, and more. How can I assist you today?'
        : 'नमस्ते! सिंहस्थ गार्जियन में आपका स्वागत है। मैं समय, दिशा, स्वास्थ्य सुविधाओं, भीड़ की स्थिति और अधिक के बारे में जानकारी के साथ आपकी सहायता कर सकता हूँ। आज मैं आपकी कैसे सहायता कर सकता हूँ?',
      isUser: false,
      timestamp: new Date(),
      language
    };
    setMessages([welcomeMessage]);
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputMessage,
      isUser: true,
      timestamp: new Date(),
      language
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const response = getResponse(inputMessage, language);
    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      message: response,
      isUser: false,
      timestamp: new Date(),
      language
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    {
      en: 'What are the bathing timings?',
      hi: 'स्नान का समय क्या है?'
    },
    {
      en: 'How to reach the main ghat?',
      hi: 'मुख्य घाट तक कैसे पहुँचें?'
    },
    {
      en: 'Current crowd status?',
      hi: 'वर्तमान भीड़ की स्थिति?'
    },
    {
      en: 'Medical facilities available?',
      hi: 'चिकित्सा सुविधाएं उपलब्ध हैं?'
    }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bot className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Simhastha Assistant</h1>
              <p className="text-sm text-gray-600">Always here to help</p>
            </div>
          </div>
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">
              {language === 'en' ? 'हिन्दी' : 'English'}
            </span>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.isUser ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.isUser 
                ? 'bg-orange-600 text-white' 
                : 'bg-blue-100 text-blue-600'
            }`}>
              {message.isUser ? (
                <User className="w-4 h-4" />
              ) : (
                <Bot className="w-4 h-4" />
              )}
            </div>
            <div className={`max-w-[80%] ${message.isUser ? 'text-right' : ''}`}>
              <div className={`inline-block p-3 rounded-lg ${
                message.isUser
                  ? 'bg-orange-600 text-white'
                  : 'bg-white border border-gray-200'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{message.message}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {message.timestamp.toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length <= 1 && (
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2">
            {language === 'en' ? 'Quick questions:' : 'त्वरित प्रश्न:'}
          </p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(question[language])}
                className="px-3 py-1 text-xs bg-white border border-gray-200 rounded-full hover:bg-orange-50 hover:border-orange-200 transition-colors"
              >
                {question[language]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={language === 'en' ? 'Type your message...' : 'अपना संदेश टाइप करें...'}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;