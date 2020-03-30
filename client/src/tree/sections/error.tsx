import * as React from "react";
import * as Common from "@/styles/common";

export const Error: React.FC = () => {
	return (
		<Common.BadText>
			Unfortunately, something's gone wrong with this page.
			Please check back later.
		</Common.BadText>
	);
}
