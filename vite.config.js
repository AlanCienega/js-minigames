// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        fred: resolve(__dirname, 'fred/index.html'),
        hangman: resolve(__dirname, 'hangman/index.html'),
        memo: resolve(__dirname, 'memo/index.html'),
        rps: resolve(__dirname, 'rps/index.html'),
        ticTacToe: resolve(__dirname, 'tic-tac-toe/index.html'),
      },
    },
  },
})
