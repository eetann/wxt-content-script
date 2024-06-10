import { defineConfig } from "wxt";
import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";

// See https://wxt.dev/api/config.html
export default defineConfig({
	manifest: {
		name: "wxt-content-script",
		version: "1.0.0",
	},
	srcDir: "src",
	vite: () => ({
		plugins: [
			svelte({
				// Using a svelte.config.js file causes a segmentation fault when importing the file
				configFile: false,
				preprocess: [vitePreprocess()],
			}),
		],
	}),
});
