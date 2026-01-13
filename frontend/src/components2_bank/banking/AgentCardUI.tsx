import React, { useRef, useEffect } from 'react';
import { Bot, X, Mic, MicOff, PhoneOff, Loader2, MessageSquare, ChevronDown } from 'lucide-react';
import './VoiceAgentStyles.css';
import { VisualizerSection } from '../Visualizer';
import { ChatList } from '../Chatlist';
import type { ChatMessage } from '../Chatlist';

interface AgentCardUIProps {
    state: 'standby' | 'connecting' | 'active';
    onClose: () => void;
    onConnect?: () => void;
    onDisconnect?: () => void;
    onToggleMic?: () => void;
    isMicMuted?: boolean;
    isAgentSpeaking?: boolean;
    visualizerState?: 'speaking' | 'listening' | 'connected' | 'disconnected';
    trackRef?: any;
    statusText?: string;
    showChat?: boolean;
    onToggleChat?: () => void;
    messages?: ChatMessage[];
}

export const AgentCardUI: React.FC<AgentCardUIProps> = ({
    state,
    onClose,
    onConnect,
    onDisconnect,
    onToggleMic,
    isMicMuted = false,
    isAgentSpeaking = false,
    visualizerState = 'connected',
    trackRef,
    statusText,
    showChat = false,
    onToggleChat,
    messages = []
}) => {
    // Scroll to bottom of chat
    const chatEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (showChat && chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, showChat]);

    return (
        <div className={`pointer-events-auto bg-[#151f32]/95 backdrop-blur-3xl border border-[#D4AF37]/30 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(212,175,55,0.1)] rounded-[32px] p-5 flex flex-col items-center gap-4 transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${showChat ? 'w-[90vw] md:w-[420px] h-[650px]' : 'w-[300px] h-auto'}`}>

            {/* Header / Controls */}
            <div className="w-full flex justify-between items-center border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                    {state === 'active' ? (
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    ) : (
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    )}
                    <span className="text-xs text-[#D4AF37] font-semibold tracking-wide">
                        {state === 'active' ? 'VYOM ACTIVE' : 'VYOM STANDBY'}
                    </span>
                </div>
                <button
                    onClick={onClose}
                    className="text-slate-400 hover:text-white transition-colors p-1"
                >
                    <X size={16} />
                </button>
            </div>

            {/* Agent Visual / Animation (Compact only) */}
            {!showChat && (
                <div className="relative w-24 h-24 flex items-center justify-center my-2">
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-xl transition-all duration-300 ${isAgentSpeaking ? 'scale-125 opacity-100' : 'scale-100 opacity-50'}`}></div>

                    {/* The Face / Icon */}
                    <div className={`relative z-10 w-20 h-20 bg-gradient-to-b from-[#D4AF37] to-[#8a7020] rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-200 ${isAgentSpeaking ? 'animate-mouth-move' : ''}`}>
                        <Bot size={40} className="text-[#0B1426]" />
                    </div>
                </div>
            )}

            {/* CHAT AREA (Expanded only) */}
            {showChat && (
                <div className="flex-1 w-full flex flex-col min-h-0 overflow-hidden bg-[#0B1426]/50 rounded-xl relative border border-white/5">
                    <ChatList messages={messages} compact={true} />
                </div>
            )}

            {/* Status Text & Waveform / Connect Button */}
            <div className={`w-full flex flex-col items-center gap-2 justify-center ${showChat ? 'min-h-[60px] pt-2 border-t border-white/5' : 'min-h-[64px]'}`}>
                {state === 'active' ? (
                    <>
                        {!showChat && (
                            <span className="text-sm font-medium text-slate-200 text-center w-full px-2 break-words">
                                {statusText || (isAgentSpeaking ? "Speaking..." : "Listening...")}
                            </span>
                        )}
                        <div className="h-8 w-full flex items-center justify-center">
                            <VisualizerSection
                                state={visualizerState}
                                trackRef={trackRef}
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-2 w-full">
                        <span className="text-xs text-slate-400 text-center px-4 leading-tight">
                            Start a voice session to manage your account.
                        </span>
                    </div>
                )}
            </div>

            {/* Footer Actions */}
            <div className="w-full">
                {state === 'active' ? (
                    <div className="flex items-center gap-3 w-full">
                        {/* Mute Button */}
                        <button
                            onClick={onToggleMic}
                            className={`
                                flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300
                                ${isMicMuted
                                    ? 'bg-white text-[#0B1426] shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-[1.02]'
                                    : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/5 hover:border-white/10'}
                            `}
                        >
                            {isMicMuted ? <MicOff size={18} /> : <Mic size={18} />}
                            <span>{isMicMuted ? 'Unmute' : 'Mute'}</span>
                        </button>

                        {/* Disconnect Button */}
                        <button
                            onClick={onDisconnect}
                            className="
                                flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold 
                                bg-gradient-to-br from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 text-white 
                                shadow-[0_4px_16px_rgba(239,68,68,0.3)] 
                                transition-all duration-300 hover:scale-[1.02] active:scale-95 border border-red-400/20
                            "
                        >
                            <PhoneOff size={18} />
                            <span>End</span>
                        </button>

                        {/* Chat Toggle */}
                        {onToggleChat && (
                            <button
                                onClick={onToggleChat}
                                className={`
                                    w-12 h-12 flex-none flex items-center justify-center rounded-2xl transition-all duration-300
                                    ${showChat
                                        ? 'bg-[#D4AF37] text-[#0B1426] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                                        : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5'}
                                `}
                            >
                                {showChat ? <ChevronDown size={22} /> : <MessageSquare size={20} />}
                            </button>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={onConnect}
                        disabled={state === 'connecting'}
                        className="w-full py-4 rounded-2xl bg-[#D4AF37] text-[#0B1426] text-sm font-bold shadow-lg shadow-[#D4AF37]/20 hover:bg-[#bfa03a] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none"
                    >
                        {state === 'connecting' ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                <span>Connecting...</span>
                            </>
                        ) : (
                            <>
                                <Mic size={18} />
                                <span>Start Conversation</span>
                            </>
                        )}
                    </button>
                )}
            </div>

        </div>
    );
};
