import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/colorCube/colorCube.html'), // Your main entry
        // Add more games as needed
      }
    }
  }
});
