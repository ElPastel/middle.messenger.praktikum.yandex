import Block from "./block";

export type Events = {
	[key: string]: (e: Event) => void
}

export type Props = {
	[key: string]: string | string[] | number | Block<Props> | Events;
}
