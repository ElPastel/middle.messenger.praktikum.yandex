import Block from "../block";

export default function renderElement(query: string, block: Block<any>): HTMLElement {
	const root = document.querySelector(query) as HTMLElement;
	if (!root) {
		throw new Error('Root not found');
	}

	root.appendChild(block.getContent());
	return root;
}
