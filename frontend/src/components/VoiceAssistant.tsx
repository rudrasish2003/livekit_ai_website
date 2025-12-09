import React, { useEffect, useState, useRef } from 'react';
import {
  useVoiceAssistant,
  BarVisualizer,
  ControlBar,
  useChat,
} from '@livekit/components-react';
import { Sparkles, User, Mic } from 'lucide-react';
import { Header } from './Header';
import type { TranscriptionMessage } from '../types';

const VoiceAssistant: React.FC = () => {
  const { state, audioTrack } = useVoiceAssistant();
  const { chatMessages } = useChat();
  const [transcripts, setTranscripts] = useState<TranscriptionMessage[]>([]);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync chat messages
  useEffect(() => {
    if (chatMessages) {
      const formattedMessages: TranscriptionMessage[] = chatMessages.map((msg) => ({
        id: msg.id || Date.now().toString() + Math.random().toString(),
        text: msg.message,
        sender: msg.from?.identity === 'agent' ? 'agent' : 'user',
        timestamp: msg.timestamp || Date.now()
      }));
      setTranscripts(formattedMessages);
    }
  }, [chatMessages]);

  // Auto-scroll
  useEffect(() => {
    if (transcriptEndRef.current) {
      transcriptEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [transcripts, state]);

  const getStatus = () => {
    if (state === 'speaking') return 'speaking';
    if (state === 'listening') return 'listening';
    return 'connected';
  };

  return (
    <div className="relative flex flex-col h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800 font-sans overflow-hidden selection:bg-primary/20">
      
      <Header status={getStatus()} />

      {/* CENTER STAGE: Visualizer & Active State */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl mx-auto z-10 pt-20 pb-32">
        
        {/* The "AI Brain" - Visualizer Container */}
        <div className={`relative flex items-center justify-center w-64 h-32 mb-8 transition-all duration-700 ${
          state === 'speaking' ? 'scale-110' : 'scale-100 opacity-90'
        }`}>
          
          {/* Glow Effect behind visualizer */}
          <div className={`absolute inset-0 bg-primary/20 blur-[60px] rounded-full transition-opacity duration-1000 ${
            state === 'speaking' ? 'opacity-100' : 'opacity-30'
          }`} />

          {state === 'speaking' && audioTrack ? (
            <div className="h-24 w-64 flex items-center justify-center z-20">
              <BarVisualizer
                state={state}
                barCount={20} // Increased for a denser, premium look
                trackRef={audioTrack}
                className="h-full w-full"
                style={{ height: '100px', width: '100%' }}
                // You can override CSS colors for bars here if needed via global CSS or style props
              />
            </div>
          ) : (
            // Idle / Listening Animation (Breathing Circle)
            <div className="relative z-20 flex items-center justify-center">
               <div className={`w-20 h-20 rounded-full border-4 border-gray-200 flex items-center justify-center transition-all duration-500 ${
                 state === 'listening' ? 'border-primary animate-pulse shadow-[0_0_30px_rgba(0,0,0,0.1)]' : ''
               }`}>
                 <Mic className={`w-8 h-8 transition-colors duration-300 ${
                   state === 'listening' ? 'text-primary' : 'text-gray-300'
                 }`} />
               </div>
            </div>
          )}
        </div>

        {/* Status Text */}
        <h2 className="text-2xl md:text-3xl font-light text-center mb-10 transition-all duration-500 h-10">
          {state === 'speaking' ? (
             <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent font-medium animate-pulse">
               Speaking...
             </span>
          ) : state === 'listening' ? (
             <span className="text-gray-600">Listening...</span>
          ) : (
             <span className="text-gray-300">Tap mic to start</span>
          )}
        </h2>

        {/* Floating Transcript History */}
        <div 
          ref={containerRef}
          className="w-full px-6 flex-1 overflow-y-auto custom-scrollbar mask-image-linear-fade"
          style={{ 
            maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
          }}
        >
          <div className="max-w-2xl mx-auto space-y-6 py-4">
            {transcripts.map((msg, index) => {
              const isLast = index === transcripts.length - 1;
              return (
                <div 
                  key={msg.id} 
                  className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    
                    {/* Label */}
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 px-1 flex items-center gap-1">
                      {msg.sender === 'agent' ? <Sparkles size={10} /> : <User size={10} />}
                      {msg.sender === 'agent' ? 'AI Assistant' : 'You'}
                    </span>

                    {/* Bubble */}
                    <div className={`
                      relative px-6 py-4 text-base md:text-lg leading-relaxed rounded-2xl shadow-sm transition-all duration-500
                      ${msg.sender === 'user' 
                        ? 'bg-white border border-gray-100 text-gray-700 rounded-tr-sm' 
                        : 'bg-white/80 backdrop-blur-sm border border-primary/10 text-gray-800 rounded-tl-sm shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
                      }
                      ${isLast && state === 'speaking' && msg.sender === 'agent' ? 'border-primary/40 shadow-md' : ''}
                    `}>
                       {msg.text}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={transcriptEndRef} />
          </div>
        </div>

      </div>

      {/* BOTTOM: Controls */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-50">
        <div className="bg-white/90 backdrop-blur-2xl border border-white/20 rounded-full p-2 pl-3 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] hover:scale-105 transition-transform duration-300">
           <ControlBar 
              variation="minimal" 
              controls={{ microphone: true, camera: false, screenShare: false, chat: false, leave: true, settings: false }} 
            />
        </div>
      </div>

    </div>
  );
};

export default VoiceAssistant;