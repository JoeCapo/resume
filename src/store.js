import { create } from 'zustand'

export const useStore = create((set) => ({
    selectedItem: null,
    godMode: false,
    selectItem: (item) => {
        console.log('STORE: Selecting item', item);
        set({ selectedItem: item });
    },
    clearSelection: () => {
        console.log('STORE: Clearing selection');
        set({ selectedItem: null });
    },
    mobileInput: { x: 0, y: 0, lookX: 0, lookY: 0 },
    setMobileInput: (input) => set((state) => ({ mobileInput: { ...state.mobileInput, ...input } })),
}))
