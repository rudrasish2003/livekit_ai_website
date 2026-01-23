import React from 'react';
import {
    Menu,
    Shield,
    CreditCard,
    ArrowLeft,
    Phone,
    MapPin,
    Search,
    Bell,
    ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BandhanBankingUI: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div className="relative w-full h-screen bg-[#004a99] font-sans overflow-hidden flex flex-col text-white">

            {/* BACKGROUND IMAGE / GRADIENT */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?q=80&w=2070&auto=format&fit=crop"
                    alt="Banking Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#c41230]/90 via-[#004a99]/80 to-[#002d5e]/90 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* HEADER */}
            <header className="relative z-50 w-full flex items-center justify-between px-4 md:px-10 py-4 border-b border-white/10 bg-black/20 backdrop-blur-md shrink-0">
                {/* Logo Section */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                        title="Back to Home"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1 shadow-lg">
                            {/* SVG Placeholder for Bandhan Bank Logo */}
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                                <rect width="100" height="100" fill="#c41230" rx="15" />
                                <path d="M50 20 L80 80 L50 65 L20 80 Z" fill="white" />
                                <circle cx="50" cy="45" r="10" fill="#fbaf17" />
                            </svg>
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-xl font-bold tracking-tight">Bandhan Bank</span>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-medium">Aapka Bhala, Sabki Bhalai</span>
                        </div>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-8">
                    <nav className="flex items-center gap-6 text-sm font-medium">
                        <a href="#" className="hover:text-[#fbaf17] transition-colors border-b-2 border-[#fbaf17] pb-1">Personal</a>
                        <a href="#" className="hover:text-[#fbaf17] transition-colors pb-1">Business</a>
                        <a href="#" className="hover:text-[#fbaf17] transition-colors pb-1">NRI</a>
                        <a href="#" className="hover:text-[#fbaf17] transition-colors pb-1">About Us</a>
                    </nav>

                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Search size={20} /></button>
                        <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Bell size={20} /></button>
                        <button className="bg-[#c41230] hover:bg-[#a00e26] text-white font-bold px-6 py-2 rounded shadow-lg transition-all transform hover:scale-105">
                            Internet Banking
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Menu size={24} /></button>
                    </div>
                </div>

                {/* Mobile Icons */}
                <div className="lg:hidden flex items-center gap-3">
                    <button className="bg-[#c41230] text-white text-xs font-bold px-3 py-1.5 rounded">Login</button>
                    <Menu size={24} />
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-20 py-10 overflow-hidden">

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Hero Text */}
                    <div className="flex flex-col gap-8 max-w-2xl">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 w-fit">
                            <Shield size={16} className="text-[#fbaf17]" />
                            <span className="text-sm font-semibold tracking-wide">Trusted by 3 Crore+ Customers</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-tight drop-shadow-2xl">
                            Banking that <br />
                            <span className="text-[#fbaf17]">Empowers</span> You
                        </h1>

                        <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-xl">
                            Experience next-generation digital banking with Bandhan Bank. Secure, fast, and built for your convenience.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-[#fbaf17] hover:bg-[#e59e15] text-[#002d5e] font-bold text-lg px-10 py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xl hover:-translate-y-1">
                                Open Account <CreditCard size={20} />
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-lg px-10 py-4 rounded-xl border border-white/20 flex items-center justify-center gap-2 transition-all hover:-translate-y-1">
                                Explore Services <ExternalLink size={20} />
                            </button>
                        </div>

                        {/* Quick Stats */}
                        <div className="flex items-center gap-10 mt-8">
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold">1,600+</span>
                                <span className="text-white/60 text-sm">Branches</span>
                            </div>
                            <div className="h-10 w-px bg-white/20"></div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold">6,000+</span>
                                <span className="text-white/60 text-sm">Banking Units</span>
                            </div>
                            <div className="h-10 w-px bg-white/20"></div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold">24/7</span>
                                <span className="text-white/60 text-sm">Support</span>
                            </div>
                        </div>
                    </div>

                    {/* Visual Element (Right Side) */}
                    <div className="hidden lg:flex justify-center relative">
                        {/* This could be a 3D card or some animated circles */}
                        <div className="w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl absolute -z-10 animate-pulse"></div>
                        <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-md transform rotate-3 hover:rotate-0 transition-all duration-700">
                            <div className="flex justify-between items-start mb-12">
                                <div className="space-y-1">
                                    <div className="w-12 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-md"></div>
                                    <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Chip Secure</div>
                                </div>
                                <div className="text-2xl font-bold italic text-white/20">VISA</div>
                            </div>

                            <div className="space-y-6">
                                <div className="text-2xl tracking-[0.2em] font-mono">**** **** **** 8842</div>
                                <div className="flex justify-between items-end">
                                    <div className="space-y-1">
                                        <div className="text-[8px] text-white/40 uppercase">Card Holder</div>
                                        <div className="text-sm font-medium tracking-wide font-sans uppercase">PREMIUM CUSTOMER</div>
                                    </div>
                                    <div className="space-y-1 text-right">
                                        <div className="text-[8px] text-white/40 uppercase">Expires</div>
                                        <div className="text-sm font-medium font-sans uppercase">12/28</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating badges */}
                        <div className="absolute top-10 right-0 bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-2xl shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                            <Phone size={24} className="text-[#fbaf17]" />
                        </div>
                        <div className="absolute bottom-10 left-0 bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-2xl shadow-xl animate-bounce" style={{ animationDuration: '4s' }}>
                            <MapPin size={24} className="text-[#fbaf17]" />
                        </div>
                    </div>
                </div>
            </main>

            {/* QUICK ACTIONS SIDEBAR (Right) */}
            <div className="hidden xl:flex fixed right-10 top-1/2 -translate-y-1/2 flex-col gap-6 z-20">
                <QuickAction icon={<Phone size={20} />} label="Call" />
                <QuickAction icon={<MapPin size={20} />} label="Find" />
                <QuickAction icon={<Shield size={20} />} label="Secure" />
            </div>

            {/* Injected Children (Voice Agent Overlay) */}
            {children}

        </div>
    );
};

const QuickAction: React.FC<{ icon: React.ReactNode, label: string }> = ({ icon, label }) => (
    <div className="group flex items-center gap-3">
        <span className="bg-black/40 backdrop-blur text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {label}
        </span>
        <button className="w-12 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-white/60 hover:text-[#fbaf17] hover:border-[#fbaf17] transition-all transform hover:scale-110">
            {icon}
        </button>
    </div>
);
