import * as React from "react";
import styled from "@/styles/theme";
import { IconDefinition, faSpinner, faCompactDisc, faSun, faCompass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

export interface IconProps extends FontAwesomeIconProps {
}

const IconSpacer = styled.span`
	display: inline-block;
	margin-right: .3rem;
`;

export const Icon: React.FC<IconProps> = (props) => {
	let { fixedWidth, size, ...otherProps } = props;
	if (fixedWidth === undefined) {
		fixedWidth = true;
	}

	return (
		<IconSpacer>
			<FontAwesomeIcon {...otherProps} fixedWidth={fixedWidth} size={size} />
		</IconSpacer>
	);
};

export const LoadingIcon: React.FC = () => {
	return (
		<LoadingIconCenter>
			<FontAwesomeIcon icon={faCompass} spin={true} size="3x" />
		</LoadingIconCenter>
	);
}

const LoadingIconCenter = styled.div`
	text-align: center;
	margin-top: 5rem;
	margin-bottom: 40rem;
`;

export const IconPad = styled.div`
	padding-left: 2rem;
`;