export async function waitForElement(
	selector: string,
): Promise<Element | undefined> {
	return new Promise((resolve) => {
		const elm = document.querySelector(selector);
		if (elm) {
			resolve(elm);
			return;
		}
		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (mutation.addedNodes.length === 0) {
					continue;
				}
				for (const node of mutation.addedNodes) {
					if (!(node instanceof HTMLElement)) continue;
					if (node.matches(selector)) {
						clearTimeout(timeout);
						observer.disconnect();
						resolve(node);
						return;
					}
				}
			}
		});
		const timeout = setTimeout(() => {
			clearTimeout(timeout);
			observer.disconnect();
			resolve(undefined);
			return;
		}, 15000);
		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	});
}
