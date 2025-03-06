// store/leadStore.ts
import { create } from 'zustand';
import axios from 'axios';
import { Lead, CreateLeadDto } from '@/types/lead';

interface LeadState {
  leads: Lead[];
  isLoading: boolean;
  error: string | null;
  fetchLeads: () => Promise<void>;
  createLead: (lead: CreateLeadDto) => Promise<Lead>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const useLeadStore = create<LeadState>((set) => ({
  leads: [],
  isLoading: false,
  error: null,
  
  fetchLeads: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/leads`);
      set({ leads: response.data, isLoading: false });
    } catch (error) {
      console.error('Error fetching leads:', error);
      set({ error: 'Failed to fetch leads', isLoading: false });
    }
  },
  
  createLead: async (leadData: CreateLeadDto) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/leads`, leadData);
      const newLead = response.data;
      set(state => ({ 
        leads: [newLead, ...state.leads],
        isLoading: false
      }));
      return newLead;
    } catch  {
      console.error('Error creating lead:');
      set({ 
        error:  'Failed to create lead', 
        isLoading: false 
      });
    }
  }
}));