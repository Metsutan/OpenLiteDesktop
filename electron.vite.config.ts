import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    main: {
      plugins: [externalizeDepsPlugin()],
    },
    preload: {
      plugins: [externalizeDepsPlugin()]
    },
    renderer: {
      plugins: [],
      resolve: {
        alias: {
          "@static": resolve(__dirname, "static")
        }
      },
      ...(isDev && {
        server: {
          fs: {
            allow: ['..']
          },
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
          },
          proxy: {
            '/socket.io': {
              target: 'https://server1.openspell.dev',
              changeOrigin: true,
              secure: true,
              headers: {
                'Origin': 'https://openspell.dev',
                'Referer': 'https://openspell.dev/'
              }
            },
            '/play': {
              target: 'https://openspell.dev',
              changeOrigin: true,
              secure: true,
              headers: {
                'Origin': 'https://openspell.dev',
                'Referer': 'https://openspell.dev/'
              }
            },
            '/game': {
              target: 'https://openspell.dev',
              changeOrigin: true,
              secure: true,
              headers: {
                'Origin': 'https://openspell.dev',
                'Referer': 'https://openspell.dev/'
              }
            },
            '/api': {
              target: 'https://api.openspell.dev',
              changeOrigin: true,
              secure: true,
              headers: {
                'Origin': 'https://openspell.dev',
                'Referer': 'https://openspell.dev/'
              }
            }
          }
        }
      }),
      publicDir: resolve(__dirname, "static"),
      root: resolve(__dirname, 'src/renderer'),
      build: {
        rollupOptions: {
          input: {
            client: resolve(__dirname, 'src/renderer/client.html'),
            update: resolve(__dirname, 'src/renderer/update.html'),
            console: resolve(__dirname, 'src/renderer/console.html'),
            settings: resolve(__dirname, 'src/renderer/settings.html'),
          }
        }
      }
    }
  };
})
