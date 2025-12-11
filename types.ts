export type ViewState = 'HOME' | 'ORDER_FLOW' | 'CHAT' | 'PRICES';

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface OrderData {
  fullName: string;
  phone: string;
  address: string;
  notes: string;
}
