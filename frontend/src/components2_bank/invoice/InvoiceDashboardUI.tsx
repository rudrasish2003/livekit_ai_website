import React from 'react';
import {
    Search,
    Bell,
    User,
    ShoppingCart,
    RotateCw,
    FileText,
    AlertCircle,
    ChevronRight,
    Home,
    Package,
    IndianRupee,
    Headphones,
    ArrowUp,
    ChevronDown,
    Menu,
    X,
    TrendingUp
} from 'lucide-react';

export const InvoiceDashboardUI: React.FC<{ children?: React.ReactNode; onBack?: () => void }> = ({ children, onBack }) => {
    return (
        <div className="min-h-screen w-full bg-[#f0f2f5] font-sans relative overflow-x-hidden text-slate-800 pb-24 md:pb-0">

            {/* HEADER - Blue Background */}
            <header className="bg-blue-600 text-white pt-4 pb-2 px-4 sticky top-0 z-30">
                {/* Top Bar */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm">
                            <Package size={20} className="text-white" />
                        </div>
                        <span className="font-bold text-lg">PK Packaging</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><Search size={20} /></button>
                        <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-blue-600"></span>
                        </button>
                        <button className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-sm">
                            R
                        </button>
                    </div>
                </div>

                {/* Greeting & Sync */}
                <div className="flex justify-between items-end pb-2">
                    <div>
                        <p className="text-blue-100 text-xs mb-0.5">Good morning,</p>
                        <h2 className="text-lg font-bold">Rajesh Kumar</h2>
                    </div>
                    <p className="text-blue-200 text-[10px] mb-1">Last sync: 2 min ago</p>
                </div>
            </header>

            {/* SCROLLABLE MAIN CONTENT */}
            <div className="p-4 flex flex-col gap-4 max-w-lg mx-auto md:max-w-7xl md:grid md:grid-cols-2 lg:grid-cols-3 md:items-start">

                {/* ROW 1: Sales Stats */}
                <div className="grid grid-cols-2 gap-3 md:col-span-2 lg:col-span-2">
                    <StatCard
                        label="Today's Sales"
                        value="₹ 58,450"
                        trend="+12.5%"
                        trendUp={true}
                        sub="vs yesterday"
                    />
                    <StatCard
                        label="MTD Sales"
                        value="₹ 6.8L"
                        trend="+8.2%"
                        trendUp={true}
                        sub=""
                    />

                    {/* Orders Overview */}
                    <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 col-span-2 sm:col-span-1">
                        <h3 className="text-xs font-semibold text-slate-500 mb-3">Orders Overview</h3>
                        <div className="grid grid-cols-2 gap-y-4">
                            <OrderStat count="12" label="New" color="text-blue-600" />
                            <OrderStat count="8" label="Confirmed" color="text-purple-600" />
                            <OrderStat count="15" label="Dispatched" color="text-orange-500" />
                            <OrderStat count="23" label="Delivered" color="text-emerald-500" />
                        </div>
                    </div>

                    {/* Fill Rate & Outstanding */}
                    <div className="flex flex-col gap-3">
                        <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 flex-1 flex flex-col justify-center relative overflow-hidden">
                            {/* Circular Progress Mockup */}
                            <div className="absolute right-2 top-2 w-16 h-16 rounded-full border-4 border-blue-100 border-t-blue-600 flex items-center justify-center">
                                <span className="text-xs font-bold text-blue-800">96%</span>
                            </div>
                            <h3 className="text-xs font-semibold text-slate-500 mb-1">Fill Rate</h3>
                            <p className="text-[10px] text-slate-400 w-1/2">Delivered vs Ordered</p>
                        </div>
                        <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 flex-1">
                            <h3 className="text-xs font-semibold text-slate-500 mb-1">Outstanding</h3>
                            <p className="text-xl font-bold text-slate-800">₹ 18.4L</p>
                            <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                                <AlertCircle size={10} /> 3 critical {'>'} 45 days
                            </p>
                        </div>
                    </div>
                </div>


                {/* ROW 2: Quick Actions (Blue Card) */}
                <div className="bg-blue-600 rounded-xl p-4 text-white shadow-lg shadow-blue-200 md:col-span-2 lg:col-span-1">
                    <h3 className="text-sm font-semibold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-4 gap-2">
                        <QuickActionBtn icon={<ShoppingCart size={20} />} label="Create Order" />
                        <QuickActionBtn icon={<RotateCw size={20} />} label="Repeat Order" />
                        <QuickActionBtn icon={<FileText size={20} />} label="Record Payment" />
                        <QuickActionBtn icon={<AlertCircle size={20} />} label="Raise Return" />
                    </div>
                </div>

                {/* ROW 3: Needs Attention */}
                <div className="bg-rose-50 border border-rose-100 rounded-xl p-3 md:col-span-1">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-semibold text-slate-800">Needs Attention</h3>
                        <ChevronDown size={16} className="text-slate-400" />
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-rose-100 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-slate-800">Credit limit breached</p>
                            <p className="text-[10px] text-slate-500">2 parties exceeded credit limit</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-medium">Critical</span>
                            <ChevronRight size={14} className="text-slate-300" />
                        </div>
                    </div>
                </div>

                {/* ROW 4: Alert Banners */}
                <div className="flex flex-col gap-2 md:col-span-1">
                    <AlertBanner
                        title="Stockout alert"
                        sub="4 high-movers out of stock"
                        tag="Warning"
                        tagColor="bg-slate-800 text-white"
                        bg="bg-amber-100/50"
                    />
                    <AlertBanner
                        title="Near expiry batches"
                        sub="12 batches expiring in 30 days"
                        tag="Warning"
                        tagColor="bg-slate-800 text-white"
                        bg="bg-amber-50"
                    />
                </div>

                {/* ROW 5: Recent Orders */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 md:col-span-2 lg:col-span-1">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-bold text-slate-800">Recent Orders</h3>
                        <button className="text-xs text-blue-600 font-medium">View all</button>
                    </div>
                    <div className="flex flex-col gap-3">
                        <OrderItem id="ORD-2458" client="Modern Retail" amount="₹ 24,500" status="Delivered" statusColor="text-emerald-600 bg-emerald-50" />
                        <OrderItem id="ORD-2455" client="Star Traders" amount="₹ 18,200" status="Dispatched" statusColor="text-orange-600 bg-orange-50" />
                        <OrderItem id="ORD-2454" client="City Mart" amount="₹ 31,800" status="Confirmed" statusColor="text-purple-600 bg-purple-50" />
                    </div>
                </div>

                <div className="md:hidden h-12"></div> {/* Spacer for fab */}
            </div>

            {/* INJECTED CHILDREN (Agent Overlay) */}
            {children}

            {/* BOTTOM NAV (Mobile Fixed) */}
            <div className="fixed bottom-0 w-full bg-white border-t border-slate-200 py-2 px-6 flex justify-between items-center z-40 pb-6 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                <NavIcon icon={<Home size={22} />} label="Home" active />
                <NavIcon icon={<ShoppingCart size={22} />} label="Orders" />
                <NavIcon icon={<Package size={22} />} label="Inventory" />
                <NavIcon icon={<IndianRupee size={22} />} label="Finance" />
                <NavIcon icon={<Headphones size={22} />} label="Support" />
            </div>

        </div>
    );
};

// --- Sub Components ---

const StatCard: React.FC<{ label: string, value: string, trend?: string, trendUp?: boolean, sub?: string }> = ({ label, value, trend, trendUp, sub }) => (
    <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100">
        <h3 className="text-xs font-medium text-slate-500 mb-1">{label}</h3>
        <p className="text-xl font-bold text-slate-800 mb-1">{value}</p>
        {trend && (
            <p className="text-[10px] flex items-center gap-1">
                <span className={`${trendUp ? 'text-emerald-600' : 'text-red-500'} font-bold flex items-center`}>
                    {trendUp ? <ArrowUp size={10} /> : <TrendingUp size={10} className="rotate-180" />}
                    {trend}
                </span>
                <span className="text-slate-400">{sub}</span>
            </p>
        )}
    </div>
);

const OrderStat: React.FC<{ count: string, label: string, color: string }> = ({ count, label, color }) => (
    <div className="flex flex-col items-center">
        <span className={`text-lg font-bold ${color}`}>{count}</span>
        <span className="text-[10px] text-slate-500 font-medium">{label}</span>
    </div>
);

const QuickActionBtn: React.FC<{ icon: React.ReactNode, label: string }> = ({ icon, label }) => (
    <button className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors">
        <div className="w-12 h-12 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-md">
            {icon}
        </div>
        <span className="text-[10px] font-medium text-center leading-tight opacity-90">{label}</span>
    </button>
);

const AlertBanner: React.FC<{ title: string, sub: string, tag: string, tagColor: string, bg: string }> = ({ title, sub, tag, tagColor, bg }) => (
    <div className={`${bg} rounded-xl p-3 border border-transparent hover:border-slate-200 transition-colors flex items-center justify-between cursor-pointer`}>
        <div>
            <h4 className="text-xs font-bold text-slate-800">{title}</h4>
            <p className="text-[10px] text-slate-500">{sub}</p>
        </div>
        <div className="flex items-center gap-2">
            <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${tagColor}`}>{tag}</span>
            <ChevronRight size={14} className="text-slate-400" />
        </div>
    </div>
);

const OrderItem: React.FC<{ id: string, client: string, amount: string, status: string, statusColor: string }> = ({ id, client, amount, status, statusColor }) => (
    <div className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors rounded-lg px-2 -mx-2">
        <div>
            <div className="flex items-baseline gap-2">
                <span className="text-xs font-bold text-slate-800">{id}</span>
                <span className="text-[10px] text-slate-400">{client}</span>
            </div>
            <p className="text-sm font-bold text-slate-800 mt-0.5">{amount}</p>
        </div>
        <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${statusColor}`}>
            {status}
        </span>
    </div>
);

const NavIcon: React.FC<{ icon: React.ReactNode, label: string, active?: boolean }> = ({ icon, label, active }) => (
    <div className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${active ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
        {icon}
        <span className="text-[9px] font-medium tracking-wide">{label}</span>
    </div>
);
