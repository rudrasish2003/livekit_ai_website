import { Phone, Globe, ArrowRight } from 'lucide-react';
import type { AgentType } from '../types/agent';

interface AgentButtonProps {
    label: string;
    agentType: AgentType;
    onWebCall: (agent: AgentType) => void;
    onOutboundCall: (agent: AgentType) => void;
    onMobileClick: (agent: AgentType) => void;
    disabled?: boolean;
}

export function AgentButton({ label, agentType, onWebCall, onOutboundCall, onMobileClick, disabled }: AgentButtonProps) {
    return (
        <div className="relative group w-full max-w-xs mx-auto h-[60px]">
            {/* Default Button State (Mobile: Always visible, Desktop: Hidden on Hover) */}
            <button
                disabled={disabled}
                onClick={() => onMobileClick(agentType)}
                className="absolute inset-0 w-full h-full bg-primary text-white rounded-full font-semibold shadow-lg flex items-center justify-center gap-3 transition-all duration-300 transform md:group-hover:opacity-0 md:group-hover:scale-95 md:group-hover:pointer-events-none z-10"
            >
                <span>{label}</span>
                <ArrowRight size={18} className="opacity-70" />
            </button>

            {/* Split Options State (Desktop Only: Visible ON hover) */}
            <div className="hidden md:flex absolute inset-0 w-full h-full gap-2 opacity-0 scale-90 md:group-hover:opacity-100 md:group-hover:scale-100 transition-all duration-300 z-20">
                <button
                    onClick={() => onWebCall(agentType)}
                    disabled={disabled}
                    className="flex-1 bg-white border-2 border-primary text-primary hover:bg-primary-50 rounded-l-full font-medium shadow-md flex items-center justify-center gap-2 transition-colors duration-200"
                    title="Web Call"
                >
                    <Globe size={18} />
                    <span className="text-sm">Web</span>
                </button>
                <button
                    onClick={() => onOutboundCall(agentType)}
                    disabled={disabled}
                    className="flex-1 bg-primary text-white hover:bg-primary-hover rounded-r-full font-medium shadow-md flex items-center justify-center gap-2 transition-colors duration-200"
                    title="Outbound Call"
                >
                    <Phone size={18} />
                    <span className="text-sm">Phone</span>
                </button>
            </div>
        </div>
    );
}
