import * as React from "react";
import styled from "@/styles/theme";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

export interface IconProps {
	definition: IconDefinition,
	color?: string,
	fixedWidth?: boolean,
	size?: SizeProp
}

const IconSpacer = styled.span`
	display: inline-block;
	margin-right: .3rem;
`;

/** Creates a link if the url exists. */
export const Icon: React.FC<IconProps> = (props) => {
	const fixedWidth = props.fixedWidth === undefined ? true : props.fixedWidth;
	const size = props.size || "lg";

	return (
		<IconSpacer>
			<FontAwesomeIcon icon={props.definition} fixedWidth={fixedWidth} size={size} color={props.color} />
		</IconSpacer>
	);
};