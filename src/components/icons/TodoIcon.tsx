import { SVGProps } from "react";

export default function TodoIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			data-id="6"
			{...props}>
			<rect x="3" y="5" width="6" height="6" rx="1"></rect>
			<path d="m3 17 2 2 4-4"></path>
			<path d="M13 6h8"></path>
			<path d="M13 12h8"></path>
			<path d="M13 18h8"></path>
		</svg>
	);
}
