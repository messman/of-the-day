import * as React from "react";
import * as Common from "@/styles/common";

export interface RenderIfProps {
	show: boolean,
	children: () => any
}

export const RenderIf: React.FC<RenderIfProps> = (props) => {
	if (!props.show) {
		return null;
	}
	return <>{props.children()}</>;
}
