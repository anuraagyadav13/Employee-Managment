import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  
  return {
    base: isProduction ? '/' : '/',
    plugins: [react()],
    server: {
      port: 3000,
      open: true,
    },
    preview: {
      port: 3000,
      open: true,
    },
    build: {
      outDir: 'dist',
      sourcemap: isProduction,
      minify: isProduction ? 'esbuild' : false,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            vendor: ['date-fns', 'react-icons'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
    define: {
      'process.env.NODE_ENV': `"${mode}"`,
    },
  };
});
