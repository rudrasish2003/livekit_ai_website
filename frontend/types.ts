export interface TranscriptionMessage {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: number;
}

export interface ConnectionDetails {
  serverUrl: string;
  token: string;
}
