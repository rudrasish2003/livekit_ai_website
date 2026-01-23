import React from 'react';
import {
    Menu,
    Shield,
    CreditCard,
    ArrowLeft,
    Phone,
    MapPin,
    Search,
    Globe,
    Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import bandhanLogo from '../../assets/bandhan_bank/bandhan-bank-Logo.png';

export const BandhanBankingUI: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div className="relative w-full h-screen bg-slate-50 font-sans overflow-hidden flex flex-col text-[#003366]">

            {/* TOP UTILITY BAR */}
            <div className="relative z-50 w-full bg-[#f8f9fa] border-b border-gray-200 px-4 md:px-10 py-1.5 flex justify-end items-center gap-6 text-[11px] font-medium text-gray-600">
                <a href="#" className="hover:text-[#c41230] transition-colors">Skip to Main Content</a>
                <div className="flex items-center gap-2">
                    <span className="cursor-pointer hover:text-[#c41230]">A-</span>
                    <span className="cursor-pointer hover:text-[#c41230]">A</span>
                    <span className="cursor-pointer hover:text-[#c41230]">A+</span>
                </div>
                <div className="flex items-center gap-1 cursor-pointer hover:text-[#c41230]">
                    <div className="w-4 h-4 rounded-sm bg-black border border-gray-300"></div>
                    <div className="w-4 h-4 rounded-sm bg-white border border-gray-300"></div>
                </div>
            </div>

            {/* HEADER */}
            <header className="relative z-50 w-full flex items-center justify-between px-4 md:px-10 py-3 bg-white shadow-sm border-b border-gray-100 shrink-0">
                {/* Logo Section */}
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                        title="Back to Home"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <img
                        src={bandhanLogo}
                        alt="Bandhan Bank"
                        className="h-12 md:h-14 w-auto object-contain"
                    />
                </div>

                {/* Desktop Navigation */}
                <div className="hidden xl:flex items-center gap-8">
                    <nav className="flex items-center h-full">
                        <NavLink label="Home" active />
                        <NavLink label="Personal" />
                        <NavLink label="Business" />
                        <NavLink label="NRI" />
                        <NavLink label="Rewards" />
                    </nav>

                    <div className="flex items-center gap-4 ml-4">
                        <button className="p-2 text-gray-500 hover:text-[#003366] transition-colors"><Search size={20} /></button>
                        <button className="p-2 text-gray-500 hover:text-[#003366] transition-colors"><MapPin size={20} /></button>

                        <div className="h-8 w-px bg-gray-200 mx-2"></div>

                        <button className="flex items-center gap-2 px-4 py-2 border border-blue-900 text-blue-900 rounded font-bold text-sm hover:bg-blue-50 transition-colors">
                            Reach us
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-blue-900 text-blue-900 rounded font-bold text-sm hover:bg-blue-50 transition-colors">
                            Pay
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2 bg-[#003366] text-white rounded font-bold text-sm shadow-md hover:bg-[#002244] transition-all transform hover:scale-[1.02]">
                            <Lock size={14} /> Login
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="xl:hidden flex items-center gap-3">
                    <button className="bg-[#003366] text-white text-xs font-bold px-4 py-2 rounded shadow-sm">Login</button>
                    <Menu size={24} className="text-gray-700" />
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="relative z-10 flex-1 flex flex-col overflow-y-auto overflow-x-hidden pt-8 md:pt-0">

                {/* Hero Section */}
                <section className="flex-1 flex items-center px-6 md:px-20 py-10 min-h-[500px]">
                    <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

                        {/* Hero Text */}
                        <div className="flex flex-col gap-8 animate-fade-in">
                            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] text-[#003366]">
                                Start banking with us!
                            </h1>

                            <p className="text-2xl md:text-4xl text-gray-700 font-medium">
                                Open a Savings Account today.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                <button className="bg-[#003366] hover:bg-[#002244] text-white font-bold text-lg px-12 py-4 rounded-md shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center">
                                    Open now
                                </button>
                            </div>

                            {/* Trust Indicator */}
                            <div className="flex items-center gap-4 mt-6 text-gray-500 text-sm">
                                <Shield size={18} className="text-[#c41230]" />
                                <span>Fast, Secure & 100% Digital Process</span>
                            </div>
                        </div>

                        {/* Animated Visual Section (Modernized version of the reference) */}
                        <div className="hidden lg:flex justify-center relative perspective-1000">
                            {/* Floating Background Effects */}
                            <div className="w-[450px] h-[450px] bg-blue-100 rounded-full blur-[100px] absolute -z-10 animate-pulse opacity-60"></div>

                            {/* The Premium Animated Card (Keeping user's favorite) */}
                            <div className="relative group cursor-pointer">
                                <div className="relative bg-gradient-to-br from-[#003366] to-[#001a33] p-8 rounded-[2rem] shadow-2xl w-[400px] h-[250px] flex flex-col justify-between transform transition-all duration-700 hover:rotate-y-12 hover:scale-105 border border-white/10 overflow-hidden">
                                    {/* Card Shine Effect */}
                                    <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:left-[150%] transition-all duration-1000"></div>

                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <div className="w-14 h-10 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-lg shadow-inner"></div>
                                            <div className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Safe Chip</div>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <div className="text-xl font-black italic text-white/90">Bandhan</div>
                                            <div className="text-[8px] text-white/60 font-bold tracking-tighter uppercase -mt-1">PREMIUM</div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="text-2xl tracking-[0.25em] font-mono text-white/90">4520 •••• •••• 8842</div>
                                        <div className="flex justify-between items-end">
                                            <div className="space-y-1">
                                                <div className="text-[8px] text-white/40 uppercase font-bold tracking-widest">Card Holder</div>
                                                <div className="text-sm font-semibold tracking-wide text-white uppercase italic">VALUED CUSTOMER</div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex gap-1.5 mb-1">
                                                    <div className="w-8 h-8 rounded-full bg-[#c41230]/80 -mr-4"></div>
                                                    <div className="w-8 h-8 rounded-full bg-[#fbaf17]/80"></div>
                                                </div>
                                                <div className="text-[7px] text-white/40 font-bold">WORLD ELITE</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Action Icons (Keeping user's favorite) */}
                                <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl animate-bounce-slow border border-gray-100">
                                    <Phone size={24} className="text-[#c41230]" />
                                </div>
                                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl animate-bounce-custom border border-gray-100">
                                    <Globe size={24} className="text-[#003366]" />
                                </div>
                                <div className="absolute top-1/2 -left-12 bg-white p-4 rounded-2xl shadow-xl animate-pulse border border-gray-100">
                                    <CreditCard size={24} className="text-[#fbaf17]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Trusted By Section (From reference) */}
                <section className="w-full bg-white py-20 px-6 border-t border-gray-100">
                    <div className="max-w-7xl mx-auto text-center space-y-4">
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-[#003366]">
                            Trusted by all, banking for all
                        </h2>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                            Bandhan Bank brings you a bouquet of services and products for your varied needs.
                        </p>

                        <div className="flex justify-center gap-2 pt-4">
                            <div className="w-10 h-1.5 bg-[#c41230] rounded-full"></div>
                            <div className="w-10 h-1.5 bg-blue-100 rounded-full"></div>
                        </div>
                    </div>
                </section>
            </main>

            {/* QUICK ACTIONS SIDEBAR */}
            <div className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-20">
                <VerticalAction icon={<Phone size={18} />} label="Contact" />
                <VerticalAction icon={<MapPin size={18} />} label="ATM/Branch" />
                <VerticalAction icon={<Shield size={18} />} label="Security" />
            </div>

            {/* LIVEKIT OVERLAY (Injected Children) */}
            {children}

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                @keyframes bounce-custom {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(15px); }
                }
                .animate-bounce-slow { animation: bounce-slow 4s infinite ease-in-out; }
                .animate-bounce-custom { animation: bounce-custom 5s infinite ease-in-out; }
                .perspective-1000 { perspective: 1000px; }
                .rotate-y-12 { transform: rotateY(12deg); }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 1s forwards; }
            `}} />
        </div>
    );
};

const NavLink: React.FC<{ label: string; active?: boolean }> = ({ label, active }) => (
    <a
        href="#"
        className={`px-4 h-full flex items-center text-sm font-bold border-b-4 transition-all ${active ? 'border-[#003366] text-[#003366] bg-blue-50/50' : 'border-transparent text-gray-700 hover:text-[#003366] hover:border-blue-100 hover:bg-gray-50'}`}
    >
        {label}
    </a>
);

const VerticalAction: React.FC<{ icon: React.ReactNode, label: string }> = ({ icon, label }) => (
    <div className="group flex flex-col items-center">
        <button className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-400 hover:text-[#003366] hover:shadow-xl transition-all border border-gray-100 transform hover:scale-110 mb-1">
            {icon}
        </button>
        <span className="text-[9px] uppercase font-bold tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 whitespace-nowrap">
            {label}
        </span>
    </div>
);
