
import { defineStore } from 'pinia';

export const useWindowSize = defineStore('windowSize', {
  state: () => ({
    screenWidth: window.innerWidth,
  }),
  actions: {
    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    },
  },
});