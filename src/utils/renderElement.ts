import Block, { T } from "../modules/block";

export default function renderElement(query: string, block: Block<T>): HTMLElement {
	const root = document.querySelector(query) as HTMLElement;
	if (!root) {
		throw new Error('Root not found');
	}

	root.appendChild(block.getContent());
	return root;
}
