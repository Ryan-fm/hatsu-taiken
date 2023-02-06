import { defineStore } from 'pinia'

const defaultState = {
    
}

export const useSystemStore = defineStore('system', {
    state: () => {
        return {
            ...defaultState
        };
    },
    actions: {
       
    }
})