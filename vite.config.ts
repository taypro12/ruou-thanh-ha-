// vite.config.ts
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load biến môi trường từ file .env (ví dụ .env, .env.production)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // QUAN TRỌNG khi deploy lên GitHub Pages: đặt base theo tên repo
    // Ví dụ repo: https://github.com/USERNAME/ruouthanhha
    // URL deploy: https://USERNAME.github.io/ruouthanhha/
    base: '/ruouthanhha/',

    server: {
      port: 3000,      // chạy local http://localhost:3000
      host: '0.0.0.0', // mở cho LAN nếu cần
    },

    plugins: [react()],

    // Nếu bạn thật sự cần expose giá trị env vào runtime dưới tên process.env...
    // (không khuyến nghị, nhưng vẫn giữ cho backward compatibility)
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },

    resolve: {
      alias: {
        // Alias @ → src (chuẩn)
        '@': path.resolve(__dirname, 'src'),
      },
    },

    build: {
      // Tuỳ chọn: tạo source map để dễ debug nếu cần
      sourcemap: true,
    },
  };
});
