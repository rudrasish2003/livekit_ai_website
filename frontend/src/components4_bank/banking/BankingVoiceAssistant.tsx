import React, { useMemo, useCallback, useState } from 'react';
import {
  useVoiceAssistant,
  useLocalParticipant,
  useRoomContext,
} from '@livekit/components-react';
import { Track } from 'livekit-client';

import './VoiceAgentStyles.css';
import { AgentCardUI } from './AgentCardUI';
import { BankingDashboardUI } from './BankingDashboardUI';

// --- Types & Helpers ---
type VisualizerState = 'speaking' | 'listening' | 'connected' | 'disconnected';

function mapAgentToVisualizerState(s: string): VisualizerState {
  if (s === 'connecting') return 'connected';
  if (s === 'speaking' || s === 'listening' || s === 'connected' || s === 'disconnected') return s as VisualizerState;
  return 'connected';
}

const BankingVoiceAssistant: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  // --- LiveKit Hooks ---
  const { state, audioTrack: agentTrack } = useVoiceAssistant();
  const { localParticipant, microphoneTrack } = useLocalParticipant();
  const room = useRoomContext();
  const [isMicMuted, setIsMicMuted] = useState(false); // Default to UNMUTED because usage is explicit now

  // --- Audio Track Logic ---
  // Ensure we start enabled since user clicked "Ask Vyom" to get here
  React.useEffect(() => {
    if (localParticipant) {
      localParticipant.setMicrophoneEnabled(true);
    }
  }, [localParticipant]);

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
  const handleDisconnect = useCallback(() => {
    room?.disconnect();
  }, [room]);

  // --- UI Render ---
  return (
    <BankingDashboardUI onBack={onBack}>
      {/* 
            ========================================
            ACTIVE VOICE AGENT OVERLAY
            ========================================
        */}
      <div className="fixed bottom-24 md:bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        <AgentCardUI
          state="active"
          onClose={handleDisconnect}
          onDisconnect={handleDisconnect}
          onToggleMic={() => {
            if (!localParticipant) return;
            const newVal = !isMicMuted;
            localParticipant.setMicrophoneEnabled(!newVal);
            setIsMicMuted(newVal);
          }}
          isMicMuted={isMicMuted}
          isAgentSpeaking={isAgentSpeaking}
          visualizerState={visualizerState}
          trackRef={activeTrack}
        />
      </div>
    </BankingDashboardUI>
  );
};

export default BankingVoiceAssistant;