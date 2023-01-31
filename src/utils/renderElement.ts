import Block from "../modules/block";
import { Props } from "../modules/types";

export default function renderElement(query: string, block: Block<Props>): HTMLElement {
	const root = document.querySelector(query) as HTMLElement;
	if (!root) {
		throw new Error('Root not found');
	}

	root.appendChild(block.getContent());
	return root;
}
