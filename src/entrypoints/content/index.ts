import App from "./App.svelte";
import { waitForElement } from "./waitForElement";

export default defineContentScript({
	matches: ["https://example.com/"],
	// 要素の発見までに時間がかかるやつを試すならYouTube
	// matches: ["https://*.youtube.com/"],
	async main(ctx) {
		const anchor = await waitForElement("body > div");
		// const anchor = await waitForElement("a[title='高く評価した動画']");
		if (typeof anchor === "undefined") {
			console.log("見つかりませんでした。");
			return;
		}
		const ui = createIntegratedUi(ctx, {
			position: "inline",
			anchor: anchor,
			append: "first",
			onMount: (container) => {
				const app = new App({
					target: container,
				});
				return app;
			},
			onRemove: (app) => {
				app?.$destroy();
			},
			tag: "wxt-content-script",
		});
		ui.mount();
	},
});
