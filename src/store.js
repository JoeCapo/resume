import { create } from 'zustand'

export const useStore = create((set) => ({
    selectedItem: null,
    selectItem: (item) => {
        console.log('STORE: Selecting item', item);
        set({ selectedItem: item });
    },
    clearSelection: () => {
        console.log('STORE: Clearing selection');
        set({ selectedItem: null });
    },
}))
