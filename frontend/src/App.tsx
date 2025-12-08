import React, { useState, useCallback } from 'react';
import { LiveKitRoom, RoomAudioRenderer, StartAudio } from '@livekit/components-react';
import VoiceAssistant from './compotents/VoiceAssistant';
import { Loader2, AlertCircle, Mic } from 'lucide-react';

// Use 127.0.0.1 to avoid IPv6 resolution issues with localhost on some systems
const TOKEN_ENDPOINT = 'http://127.0.0.1:8000/api/getToken';
const LIVEKIT_URL = 'wss://aiewebsitetest-4ewipk42.livekit.cloud';

export default function App() {
  const [token, setToken] = useState<string>('');
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async () => {
    setConnecting(true);
    setError(null);
    try {
      // Generate a random user ID to avoid identity conflicts in the room
      const userId = `user_${Math.floor(Math.random() * 10000)}`;
      const url = `${TOKEN_ENDPOINT}?name=${userId}`;

      // Add mode: 'cors' to be explicit
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }
      
      // The backend returns a PlainTextResponse (JWT string), not JSON.
      const accessToken = await response.text();
      
      if (!accessToken || accessToken.trim().length === 0) {
        throw new Error("Received empty token from backend");
      }
      setToken(accessToken);
    } catch (err: any) {
      console.error("Connection failed:", err);
      let msg = "Failed to connect to backend.";
      if (err.message && err.message.includes('Failed to fetch')) {
         msg = `Could not reach server at ${TOKEN_ENDPOINT}. Ensure your backend is running on port 8000 and allows CORS.`;
      } else if (err.message) {
         msg = err.message;
      }
      setError(msg);
    } finally {
      setConnecting(false);
    }
  }, []);

  if (!token) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f8f9fa] text-[#212529] font-sans">
        {/* Nav Placeholder */}
        <nav className="bg-white px-10 py-5 sticky top-0 z-50 shadow-sm flex flex-col items-center gap-5 border-b border-[#e9ecef]">
           <div className="w-full max-w-[1000px]">
             <a href="/" className="text-2xl font-bold text-[#0056b3] no-underline">INT. <span className="font-normal text-[#6c757d]">Intelligence</span></a>
           </div>
        </nav>

        <main className="flex-1 flex flex-col items-center justify-center p-5">
          <div className="max-w-md w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-[#e9ecef] rounded-full flex items-center justify-center mx-auto text-[#0056b3]">
                 <Mic size={32} />
              </div>
              <h2 className="text-3xl font-bold text-[#0056b3]">How can I help you today?</h2>
              <p className="text-[#6c757d]">Connect to start a voice conversation with the agent.</p>
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-left">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={connect}
              disabled={connecting}
              className="w-full py-3 px-4 bg-[#0056b3] hover:bg-[#004494] text-white rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {connecting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Start Conversation"
              )}
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <LiveKitRoom
      video={false}
      audio={true}
      token={token}
      serverUrl={LIVEKIT_URL}
      data-lk-theme="default"
      style={{ height: '100vh', backgroundColor: '#f8f9fa' }}
      onError={(err) => {
        console.error("LiveKit Error:", err);
        setError(err.message);
        setToken('');
      }}
      onDisconnected={() => {
        setToken('');
      }}
    >
      <VoiceAssistant />
      <RoomAudioRenderer />
      <StartAudio label="Click to allow audio playback" />
    </LiveKitRoom>
  );
}