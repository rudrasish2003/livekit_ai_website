import React, { useEffect, useState, useRef } from 'react';
import {
  useVoiceAssistant,
  BarVisualizer,
  ControlBar,
  useChat,
} from '@livekit/components-react';
import type { TranscriptionMessage } from '../../types';
import { Sparkles } from 'lucide-react';

const VoiceAssistant: React.FC = () => {
  const { state, audioTrack } = useVoiceAssistant();
  const { chatMessages } = useChat();
  const [transcripts, setTranscripts] = useState<TranscriptionMessage[]>([]);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // Sync chat messages to our transcript view
  useEffect(() => {
    if (chatMessages) {
      const formattedMessages: TranscriptionMessage[] = chatMessages.map((msg) => ({
        id: msg.id || Date.now().toString(),
        text: msg.message,
        sender: msg.from?.identity === 'agent' ? 'agent' : 'user', 
        timestamp: msg.timestamp
      }));
      setTranscripts(formattedMessages);
    }
  }, [chatMessages]);

  // Auto-scroll to bottom of transcripts
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcripts, state]);

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] text-[#212529] font-sans">
      
      {/* NAVBAR */}
      <nav className="bg-white px-6 md:px-10 py-5 sticky top-0 z-50 shadow-[0_4px_6px_rgba(0,0,0,0.04)] flex flex-col items-center gap-5">
         <div className="w-full max-w-[1000px] flex justify-between items-center">
           <a href="/" className="text-2xl font-bold text-[#0056b3] no-underline flex items-center gap-2">
             INT. <span className="font-normal text-[#6c757d]">Intelligence</span>
           </a>
           
           {/* Visualizer in Nav/Header area representing the "Voice Form" */}
           <div className="hidden md:flex items-center gap-4 bg-[#f8f9fa] px-4 py-2 rounded-full border border-[#e9ecef]">
              <div className={`w-2 h-2 rounded-full ${state === 'speaking' || state === 'listening' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
              <span className="text-sm font-medium text-[#6c757d] uppercase tracking-wide">
                {state === 'speaking' ? 'Agent Speaking' : state === 'listening' ? 'Listening...' : 'Connected'}
              </span>
           </div>
         </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full max-w-[1000px] mx-auto p-6 md:p-10 flex flex-col gap-8 relative">
        
        {/* Voice Visualizer / Interaction Area */}
        <div className="bg-white rounded-xl border border-[#e9ecef] p-8 shadow-sm flex flex-col items-center justify-center min-h-[200px] transition-all duration-500 hover:shadow-md hover:border-[#0056b3]/30">
           
           {/* Dynamic Icon */}
           <div className={`mb-4 transition-all duration-500 ${state === 'speaking' ? 'text-[#0056b3] scale-110' : 'text-[#6c757d]'}`}>
             <Sparkles size={32} className={state === 'speaking' ? 'animate-pulse' : ''} />
           </div>

           {/* Audio Visualizer */}
           <div className="h-16 w-full max-w-sm flex items-center justify-center">
             {audioTrack ? (
               <BarVisualizer
                 state={state}
                 barCount={7}
                 trackRef={audioTrack}
                 className="h-full w-full"
                 style={{ height: '64px' }}
                 // Customizing bar colors via CSS variable usually, but fallback to style override in CSS
               />
             ) : (
               <div className="text-[#6c757d] text-sm animate-pulse">Initializing audio stream...</div>
             )}
           </div>

           <p className="mt-4 text-[#6c757d] font-medium">
              {state === 'speaking' 
                ? "INT. AI is speaking..." 
                : state === 'listening' 
                  ? "Listening to you..." 
                  : "Tap the mic below to speak"}
           </p>
        </div>

        {/* Transcript Section (AI Answer Section style) */}
        {transcripts.length > 0 && (
          <div className="flex-1 overflow-y-auto space-y-6 pb-24 pr-2 custom-scrollbar">
            <div className="flex items-center gap-2 mb-4 text-[#6c757d] text-sm font-bold uppercase tracking-wider">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
               Conversation History
            </div>
            
            {transcripts.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col gap-1 animate-in slide-in-from-bottom-2 duration-500 ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <span className="text-xs font-bold text-[#adb5bd] uppercase tracking-wide px-1">
                  {msg.sender === 'agent' ? 'INT. AI' : 'You'}
                </span>
                <div 
                  className={`max-w-[85%] p-4 rounded-2xl text-lg leading-relaxed shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-[#f1f3f5] text-[#212529] rounded-tr-sm' 
                      : 'bg-white border border-[#e9ecef] text-[#212529] rounded-tl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={transcriptEndRef} />
          </div>
        )}
      </main>

      {/* Floating Controls (Bottom) */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md border border-[#e9ecef] rounded-full p-2 shadow-[0_10px_20px_rgba(0,0,0,0.1)] pointer-events-auto">
           <ControlBar 
              variation="minimal" 
              controls={{ microphone: true, camera: false, screenShare: false, chat: false, leave: true }} 
            />
        </div>
      </div>

    </div>
  );
};

export default VoiceAssistant;