import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI counselor. I can help you with career guidance, course recommendations, and answer questions about your academic journey. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    // Simulate AI response (in production, this would call your Python AI service)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setLoading(false);
    }, 1500);
  };

  const generateAIResponse = (input: string): string => {
    const responses = {
      career: "Based on your academic profile and achievements, I'd recommend exploring careers in software engineering, data science, or research. Your strong background in computer science and participation in hackathons shows great potential in tech fields.",
      courses: "For your next semester, I suggest taking Advanced Algorithms, Machine Learning Fundamentals, and Software Engineering. These will complement your current coursework and align with industry demands.",
      skills: "To enhance your profile, consider developing skills in cloud computing (AWS/Azure), advanced programming (Python/JavaScript), and soft skills like leadership and communication through student organizations.",
      internship: "Look for internship opportunities at tech companies like Google, Microsoft, or startups. Your hackathon experience and projects make you a competitive candidate. I can help you prepare your resume and interview skills."
    };

    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('career') || lowerInput.includes('job')) return responses.career;
    if (lowerInput.includes('course') || lowerInput.includes('subject')) return responses.courses;
    if (lowerInput.includes('skill') || lowerInput.includes('improve')) return responses.skills;
    if (lowerInput.includes('internship') || lowerInput.includes('opportunity')) return responses.internship;
    
    return "That's an interesting question! Based on your academic achievements and profile, I can provide personalized guidance. Could you be more specific about what area you'd like help with - career planning, course selection, skill development, or internship opportunities?";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-[600px] flex flex-col">
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-2">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">AI Career Counselor</h2>
            <p className="text-sm text-gray-600">Get personalized academic and career guidance</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.sender === 'user' 
                  ? 'bg-blue-100' 
                  : 'bg-gradient-to-r from-purple-500 to-blue-500'
              }`}>
                {message.sender === 'user' ? (
                  <User className="h-4 w-4 text-blue-600" />
                ) : (
                  <Bot className="h-4 w-4 text-white" />
                )}
              </div>
              <div className={`flex-1 max-w-xs lg:max-w-md ${
                message.sender === 'user' ? 'text-right' : ''
              }`}>
                <div className={`p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{message.content}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-start space-x-3">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full w-8 h-8 flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex space-x-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me about career guidance, courses, or skills..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !inputValue.trim()}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            'Career guidance',
            'Course recommendations',
            'Skill development',
            'Internship opportunities'
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInputValue(suggestion)}
              className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-gray-600 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}