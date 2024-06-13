export async function waitForElement(
	selector: string,
): Promise<Element | undefined> {
	return new Promise((resolve) => {
		const elm = document.querySelector(selector);
		if (elm) {
			console.log("最初に見つかった");
			return resolve(elm);
		}

		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				for (const node of mutation.addedNodes) {
					if (node instanceof Element && node.matches(selector)) {
						observer.disconnect();
						clearTimeout(timeout);
						console.log("差分で見つかった");
						return resolve(node);
					}
				}
			}
		});
		const timeout = setTimeout(() => {
			observer.disconnect();
			console.log("見つからなかった");
			return resolve(undefined);
		}, 10000);
		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	});
}
