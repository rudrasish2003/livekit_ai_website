import React, { useMemo, useCallback, useState } from 'react';
import {
  useVoiceAssistant,
  useLocalParticipant,
  useRoomContext,
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import {
  Mic,
  MicOff,
  PhoneOff,
  Bell,
  User,
  Eye,
  IndianRupee,
  Smartphone,
  Receipt,
  Home,
  Wallet,
  Headphones,
  LayoutDashboard,
  PieChart,
  Utensils,     // Added for Swiggy
  ShoppingBag,  // Added for Amazon
  Zap,          // Added for Electricity Bill
  CreditCard,   // Added for DCB Card
  Bot,          // Added for Agent Icon
  X             // Added for closing the agent
} from 'lucide-react';

import './VoiceAgentStyles.css';

import { VisualizerSection } from './Visualizer';

// --- Types & Helpers ---
type VisualizerState = 'speaking' | 'listening' | 'connected' | 'disconnected';

function mapAgentToVisualizerState(s: string): VisualizerState {
  if (s === 'connecting') return 'connected';
  if (s === 'speaking' || s === 'listening' || s === 'connected' || s === 'disconnected') return s as VisualizerState;
  return 'connected';
}

const BankingVoiceAssistant: React.FC = () => {
  // --- LiveKit Hooks ---
  const { state, audioTrack: agentTrack } = useVoiceAssistant();
  const { localParticipant, microphoneTrack } = useLocalParticipant();
  const room = useRoomContext();
  const [isMicMuted, setIsMicMuted] = useState(true); // Default to muted
  const [isAssistantActive, setIsAssistantActive] = useState(false);

  // --- Audio Track Logic ---
  // Ensure we start muted
  React.useEffect(() => {
    if (localParticipant) {
      localParticipant.setMicrophoneEnabled(false);
    }
  }, [localParticipant]);

  const toggleAssistant = useCallback(async () => {
    if (!localParticipant) return;

    if (isAssistantActive) {
      // Deactivate
      setIsAssistantActive(false);
      await localParticipant.setMicrophoneEnabled(false);
      setIsMicMuted(true);
    } else {
      // Activate
      setIsAssistantActive(true);
      await localParticipant.setMicrophoneEnabled(true);
      setIsMicMuted(false);
    }
  }, [isAssistantActive, localParticipant]);

  const userTrackRef = useMemo(() => {
    if (!localParticipant) return undefined;
    return {
      participant: localParticipant,
      source: Track.Source.Microphone,
      publication: microphoneTrack,
    };
  }, [localParticipant, microphoneTrack]);

  const agentTrackRef = useMemo(() => {
    if (!agentTrack || !agentTrack.participant || !agentTrack.publication) return undefined;
    return {
      participant: agentTrack.participant,
      source: Track.Source.Unknown,
      publication: agentTrack.publication,
    };
  }, [agentTrack]);

  const isAgentSpeaking = state === 'speaking';
  const activeTrack = isAgentSpeaking ? agentTrackRef : (!isMicMuted ? userTrackRef : undefined);
  const visualizerState = mapAgentToVisualizerState(state as string);

  // --- Handlers ---
  const toggleMic = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!localParticipant) return;
    const newVal = !isMicMuted;
    try {
      await localParticipant.setMicrophoneEnabled(!newVal);
      setIsMicMuted(newVal);
    } catch (error) {
      console.error("Error toggling microphone:", error);
    }
  }, [localParticipant, isMicMuted]);

  const handleDisconnect = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    room?.disconnect();
  }, [room]);

  // --- UI Render ---
  return (
    <div className="min-h-screen w-full bg-[#0B1426] text-white font-sans flex flex-col md:flex-row">

      {/* 
        ========================================
        SIDEBAR NAVIGATION (Desktop Only)
        ========================================
      */}
      <aside className="hidden md:flex flex-col w-64 bg-[#080f1e] border-r border-white/5 h-screen sticky top-0 z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] bg-[#D4AF37]/10">
            <span className="text-2xl font-serif font-bold pt-1">L</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-[#D4AF37] leading-none">लक्ष्मी बैंक</span>
            <span className="text-[10px] text-slate-400 tracking-wider">VYOM ASSISTANT</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
          <DesktopNavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <DesktopNavItem icon={<Wallet size={20} />} label="Accounts" />
          <DesktopNavItem icon={<CreditCard size={20} />} label="Cards" />
          <DesktopNavItem icon={<IndianRupee size={20} />} label="Transfers" />
          <DesktopNavItem icon={<PieChart size={20} />} label="Investments" />
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
              <User size={20} className="text-slate-300" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium truncate">Priya Sharma</span>
              <span className="text-xs text-slate-400 truncate">Savings ...3812</span>
            </div>
          </div>
        </div>
      </aside>

      {/* 
        ========================================
        MAIN CONTENT AREA
        ========================================
      */}
      <main className="flex-1 flex flex-col min-h-screen relative pb-32 md:pb-10">

        {/* TOP HEADER */}
        <header className="sticky top-0 z-10 bg-[#0B1426]/95 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
          {/* Mobile Logo Only */}
          <div className="md:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
              <span className="text-xl font-serif font-bold">L</span>
            </div>
            <span className="font-bold text-[#D4AF37]">Laxmi Bank</span>
          </div>

          {/* Desktop Welcome Message */}
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold text-white">Hello, Priya! 👋</h1>
            <p className="text-xs text-slate-400">Jan 2, 2026 • Overview</p>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors relative">
              <Bell size={20} />
              {/* Active Notification Dot for the Due Bill */}
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#0B1426]"></span>
            </button>
            <div className="md:hidden">
              <User size={20} />
            </div>
            <button className="hidden md:flex items-center gap-2 text-xs font-medium bg-[#1A263E] px-3 py-1.5 rounded-full border border-white/5 hover:border-[#D4AF37] transition-colors">
              <Headphones size={14} /> Help Support
            </button>
          </div>
        </header>

        {/* SCROLLABLE DASHBOARD CONTENT */}
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* 1. BALANCE CARD - Updated with Prompt Data */}
            <div className="lg:col-span-7 bg-gradient-to-br from-[#1A263E] to-[#0f1729] rounded-[32px] p-6 md:p-8 border border-white/5 shadow-2xl relative overflow-hidden group">
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none group-hover:bg-[#D4AF37]/10 transition-colors duration-700"></div>

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-sm md:text-base text-slate-400 mb-1">Savings Account <span className="text-slate-500 text-xs tracking-wider ml-1">XX3812</span></h2>
                    <div className="flex items-center gap-3">
                      {/* Updated Balance from Prompt */}
                      <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">₹ 42,650.75</h1>
                      <button className="text-slate-500 hover:text-white transition-colors"><Eye size={18} /></button>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Ledger Balance: ₹ 43,210.75</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
                    <Wallet size={24} />
                  </div>
                </div>

                <div className="flex gap-4 mt-4">
                  <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#bfa03a] text-[#0B1426] px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                    Send Money
                  </button>
                  <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 px-6 py-3 rounded-xl text-sm text-slate-300 border border-white/10 transition-colors">
                    View History
                  </button>
                </div>
              </div>
            </div>

            {/* 2. QUICK ACTIONS */}
            <div className="lg:col-span-5 bg-[#16293F]/50 md:bg-[#16293F] rounded-[32px] p-6 border border-white/5">
              <h3 className="text-sm font-semibold text-slate-400 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-4 gap-4">
                <ActionButton icon={<IndianRupee size={24} />} label="Transfer" />
                <ActionButton icon={<Receipt size={24} />} label="Pay Bills" />
                <ActionButton icon={<Smartphone size={24} />} label="Recharge" />
                <ActionButton icon={<CreditCard size={24} />} label="DCB Card" />
                {/* Extra desktop items */}
                <div className="hidden md:flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-16 h-16 rounded-[24px] bg-[#1A263E] border border-white/5 text-slate-400 flex items-center justify-center shadow-lg group-hover:bg-[#D4AF37] group-hover:text-[#0B1426] transition-all">
                    <PieChart size={24} />
                  </div>
                  <span className="text-xs text-slate-400 font-medium group-hover:text-white">FDs</span>
                </div>
              </div>
            </div>

            {/* 3. RECENT ACTIVITY - Updated with Prompt Data */}
            <div className="lg:col-span-12 bg-[#111e33] rounded-[32px] p-6 md:p-8 border border-white/5">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
                <button className="text-xs text-[#D4AF37] font-medium hover:underline">View All</button>
              </div>

              <div className="flex flex-col gap-4">
                {/* Urgent Bill - Highlighted */}
                <TransactionItem
                  icon={<Zap size={20} />}
                  bg="bg-amber-500/10"
                  color="text-amber-500"
                  title="Electricity Bill (CESC)"
                  amount="₹ 1,840"
                  sub="Consumer: XX7712"
                  date="Due Jan 10, 2026"
                  isDebit={false}
                  isBill={true}
                />

                {/* Recent Transactions from Prompt */}
                <TransactionItem
                  icon={<Utensils size={20} />}
                  bg="bg-rose-500/10"
                  color="text-rose-500"
                  title="Swiggy"
                  amount="- ₹ 487"
                  sub="Food & Dining"
                  date="Jan 1, 2026"
                  isDebit
                />
                <TransactionItem
                  icon={<ShoppingBag size={20} />}
                  bg="bg-indigo-500/10"
                  color="text-indigo-400"
                  title="Amazon India"
                  amount="- ₹ 2,349"
                  sub="Shopping"
                  date="Dec 29, 2025"
                  isDebit
                />
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* 
        ========================================
        FLOATING VOICE ASSISTANT 
        ========================================
      */}
      {/* 
        ========================================
        FLOATING VOICE ASSISTANT (Bottom Right)
        ========================================
      */}
      <div className="fixed bottom-24 md:bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">

        {/* Expanded Agent View (Only when Active) */}
        {isAssistantActive && (
          <div className="pointer-events-auto bg-[#151f32]/90 backdrop-blur-2xl border border-[#D4AF37]/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-[24px] p-4 flex flex-col items-center gap-4 w-[280px] animate-fade-in-up transition-all">

            {/* Header / Controls */}
            <div className="w-full flex justify-between items-center border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs text-[#D4AF37] font-semibold tracking-wide">VYOM ACTIVE</span>
              </div>
              <button
                onClick={toggleAssistant}
                className="text-slate-400 hover:text-white transition-colors p-1"
              >
                <X size={16} />
              </button>
            </div>

            {/* Agent Visual / Animation */}
            <div className="relative w-24 h-24 flex items-center justify-center my-2">
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-xl transition-all duration-300 ${isAgentSpeaking ? 'scale-125 opacity-100' : 'scale-100 opacity-50'}`}></div>

              {/* The Face / Icon */}
              <div className={`relative z-10 w-20 h-20 bg-gradient-to-b from-[#D4AF37] to-[#8a7020] rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-200 ${isAgentSpeaking ? 'animate-mouth-move' : ''}`}>
                <Bot size={40} className="text-[#0B1426]" />
              </div>
            </div>

            {/* Status Text & Waveform */}
            <div className="w-full flex flex-col items-center gap-2 h-16">
              <span className="text-sm font-medium text-slate-200">
                {isAgentSpeaking ? "Speaking..." : "Listening..."}
              </span>

              {/* Visualizer (Reused) */}
              <div className="h-8 w-full flex items-center justify-center">
                <VisualizerSection
                  state={visualizerState}
                  trackRef={activeTrack}
                />
              </div>
            </div>

            {/* User Mic Controls */}
            <div className="w-full flex gap-2">
              <button
                onClick={toggleMic}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${!isMicMuted ? 'bg-[#D4AF37] text-[#0B1426]' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}
              >
                {isMicMuted ? <><MicOff size={14} /> Muted</> : <><Mic size={14} /> Mute Mic</>}
              </button>
              <button
                onClick={handleDisconnect}
                className="w-10 flex items-center justify-center rounded-xl bg-slate-700/50 text-slate-400 hover:bg-rose-500 hover:text-white transition-colors"
              >
                <PhoneOff size={16} />
              </button>
            </div>

          </div>
        )}

        {/* Floating Trigger Button (Always Visible when inactive) */}
        {!isAssistantActive && (
          <button
            onClick={toggleAssistant}
            className="pointer-events-auto group relative w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#bfa03a] shadow-[0_4px_20px_rgba(212,175,55,0.4)] flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
          >
            {/* Tooltip */}
            <div className="absolute right-full mr-4 bg-[#151f32] text-[#D4AF37] px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[#D4AF37]/20">
              Ask Vyom
            </div>

            <div className="relative z-10">
              <Bot size={32} className="text-[#0B1426]" />
            </div>
            {/* Ping animation to draw attention */}
            <div className="absolute inset-0 rounded-full bg-[#D4AF37] opacity-50 animate-ping"></div>
          </button>
        )}

      </div>

      {/* 
        ========================================
        BOTTOM NAVIGATION (Mobile Only)
        ========================================
      */}
      <div className="md:hidden fixed bottom-0 w-full bg-[#0B1426]/95 backdrop-blur-xl border-t border-white/5 pb-6 pt-3 px-8 flex justify-between items-center z-40">
        <NavIcon icon={<Home size={24} />} label="Home" active />
        <NavIcon icon={<Wallet size={24} />} label="Accounts" />
        <NavIcon icon={<Headphones size={24} />} label="Support" />
      </div>

    </div>
  );
};

// --- Sub Components ---

const DesktopNavItem: React.FC<{ icon: React.ReactNode, label: string, active?: boolean }> = ({ icon, label, active }) => (
  <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${active ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
    {icon}
    <span className="font-medium text-sm">{label}</span>
  </a>
);

const ActionButton: React.FC<{ icon: React.ReactNode, label: string }> = ({ icon, label }) => (
  <div className="flex flex-col items-center gap-2 cursor-pointer group">
    <div className="w-14 h-14 md:w-16 md:h-16 rounded-[24px] bg-[#1A263E] border border-white/5 text-[#D4AF37] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200 group-hover:bg-[#D4AF37] group-hover:text-[#0B1426]">
      {icon}
    </div>
    <span className="text-[11px] md:text-xs text-center text-slate-400 font-medium leading-tight group-hover:text-white transition-colors">{label}</span>
  </div>
);

const TransactionItem: React.FC<{
  title: string,
  amount: string,
  sub: string,
  date: string,
  icon: React.ReactNode,
  bg: string,
  color: string,
  isDebit?: boolean,
  isBill?: boolean
}> = ({ title, amount, sub, date, icon, bg, color, isDebit, isBill }) => (
  <div className={`flex justify-between items-center group cursor-pointer hover:bg-white/5 p-3 rounded-2xl transition-colors border border-transparent hover:border-white/5 ${isBill ? 'bg-amber-500/5 border-amber-500/20' : ''}`}>
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full ${bg} ${color} flex items-center justify-center`}>
        {icon}
      </div>
      <div className="flex flex-col">
        <span className={`text-sm md:text-base font-medium ${isBill ? 'text-amber-400' : 'text-slate-200'}`}>{title}</span>
        <span className="text-xs text-slate-500 mt-0.5">{sub}</span>
      </div>
    </div>
    <div className="flex flex-col items-end">
      <span className={`text-sm md:text-base font-bold ${isBill ? 'text-amber-400' : (isDebit ? 'text-white' : 'text-emerald-400')}`}>
        {amount}
      </span>
      <span className={`text-[10px] md:text-xs mt-1 ${isBill ? 'text-amber-500/80 font-medium' : 'text-slate-500'}`}>{date}</span>
    </div>
  </div>
);

const NavIcon: React.FC<{ icon: React.ReactNode, label: string, active?: boolean }> = ({ icon, label, active }) => (
  <div className={`flex flex-col items-center gap-1 cursor-pointer hover:text-[#D4AF37] transition-colors ${active ? 'text-[#D4AF37]' : 'text-slate-500'}`}>
    {icon}
    <span className="text-[10px] font-medium tracking-wide">{label}</span>
    {active && <div className="w-1 h-1 rounded-full bg-[#D4AF37] mt-1" />}
  </div>
);

export default BankingVoiceAssistant;