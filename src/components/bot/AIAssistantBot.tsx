'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  CornerDownLeft
} from 'lucide-react';
import { 
  getInitialBotGreeting, 
  getQuickQuestions, 
  generateAIResponse, 
  BotAction 
} from './botKnowledge';
import { Dictionary, ProfileData } from '@/lib/schemas';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  actions?: BotAction[];
  timestamp?: string;
}

interface AIAssistantBotProps {
  lang: 'ar' | 'en';
  dict?: Dictionary;
  profile: ProfileData;
}

export const AIAssistantBot: React.FC<AIAssistantBotProps> = ({ lang, profile }) => {
  const isAr = lang === 'ar';
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIdCounter = useRef<number>(0);

  const initialBotGreeting: ChatMessage = {
    id: 'welcome',
    sender: 'bot',
    text: getInitialBotGreeting(isAr),
    timestamp: isAr ? 'الآن' : 'Just now'
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialBotGreeting]);
  const quickQuestions = getQuickQuestions(isAr);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  const closeBotAndScroll = (sectionId: string) => {
    setIsOpen(false);
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (userText: string) => {
    if (!userText.trim()) return;

    messageIdCounter.current += 1;
    const userMessageId = `msg_user_${messageIdCounter.current}`;

    const userMessage: ChatMessage = {
      id: userMessageId,
      sender: 'user',
      text: userText,
      timestamp: isAr ? 'الآن' : 'Just now'
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      messageIdCounter.current += 1;
      const botMessageId = `msg_bot_${messageIdCounter.current}`;
      const response = generateAIResponse(userText, isAr, profile, closeBotAndScroll);
      const botMessage: ChatMessage = {
        id: botMessageId,
        sender: 'bot',
        text: response.text,
        actions: response.actions,
        timestamp: isAr ? 'الآن' : 'Just now'
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <>
      {/* Floating Trigger Pill in Bottom Corner */}
      <div className={`fixed bottom-5 sm:bottom-6 ${isAr ? 'left-5 sm:left-6' : 'right-5 sm:right-6'} z-40`}>
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative px-4 py-3 rounded-full bg-slate-900 text-white shadow-xl hover:shadow-2xl border border-slate-700/80 flex items-center gap-2.5 cursor-pointer font-tajawal group transition-all"
          aria-label="Toggle AI Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 absolute -top-0.5 -right-0.5" />
          </div>
          <span className="text-xs font-bold hidden sm:inline tracking-tight">
            {isAr ? 'اسأل المساعد الذكي' : 'Ask AI Agent'}
          </span>
          <span className="text-[10px] bg-indigo-500/30 text-indigo-200 px-1.5 py-0.5 rounded-md font-mono hidden md:inline">
            AI
          </span>
        </motion.button>
      </div>

      {/* Slide-over Chat Drawer Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`fixed bottom-20 sm:bottom-24 ${
              isAr ? 'left-4 sm:left-6' : 'right-4 sm:right-6'
            } z-50 w-[calc(100vw-2rem)] sm:w-[410px] max-h-[82vh] h-[580px] bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_60px_rgba(0,0,0,0.18)] flex flex-col overflow-hidden text-slate-900 font-ibm`}
          >
            {/* Window Header */}
            <div className="p-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-indigo-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-bold font-tajawal text-white">
                      {isAr ? 'وكيل ومساعد هديل بارود الذكي' : 'Hadeel’s AI Assistant'}
                    </h3>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    {isAr ? 'جاهز للإجابة الفورية' : 'Engineering Assistant'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/60 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] p-3.5 rounded-2xl leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-slate-900 text-white rounded-br-xs shadow-xs'
                        : 'bg-white text-slate-800 rounded-bl-xs border border-slate-200/90 shadow-2xs'
                    }`}
                  >
                    <div className="whitespace-pre-line leading-relaxed font-normal">
                      {msg.text}
                    </div>

                    {/* Interactive CTAs inside Bot Response */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5 font-tajawal">
                        {msg.actions.map((act, aIdx) => (
                          <button
                            key={aIdx}
                            type="button"
                            onClick={act.action}
                            className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-bold border border-indigo-200/70 transition-colors cursor-pointer active:scale-95 flex items-center gap-1"
                          >
                            <span>{act.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Typing Animation Bubble */}
              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white border border-slate-200/80 w-16 text-slate-400 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Chips Prompts Bar */}
            <div className="p-2.5 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[10px] text-slate-400 shrink-0 flex items-center gap-1 font-tajawal">
                <Sparkles className="w-3 h-3 text-indigo-500" />
                <span>{isAr ? 'مقترحات:' : 'Topics:'}</span>
              </span>
              {quickQuestions.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(chip.query)}
                  className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Input Form Bar */}
            <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                placeholder={isAr ? 'اكتب استفسارك هنا...' : 'Ask about architecture, tech stack...'}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-600 text-xs text-slate-900 placeholder:text-slate-400 shadow-inner"
              />
              <button
                type="button"
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim()}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-40 transition-all cursor-pointer shadow-xs active:scale-95"
              >
                {isAr ? <CornerDownLeft className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
