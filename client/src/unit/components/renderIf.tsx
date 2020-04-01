import * as React from "react";

export interface RenderIfProps {
	/** truthy/falsy value to indicate whether to show the children. */
	show: any,
	/** Child render function. */
	children: () => any
}

/**
 * Simple render component that only renders the children based on a boolean expression. 
 * Not the most performant in regular circumstances, but for this project it is really only used for
 * loading logic. 
 */
export const RenderIf: React.FC<RenderIfProps> = (props) => {
	if (!props.show) {
		return null;
	}
	return <>{props.children()}</>;
}
