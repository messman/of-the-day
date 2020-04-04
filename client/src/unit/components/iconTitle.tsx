// Handles the special combination of icon and subtitle.
import * as React from "react";
import * as Common from "@/styles/common";
import { Icon, IconProps } from "./icon";
import styled from "@/styles/theme";

export interface IconTitleProps extends IconProps {
}

export const IconTitle: React.FC<IconTitleProps> = (props) => {
	const { children, ...otherProps } = props;

	return (
		<Common.SubTitle>
			<Container>
				<Offset>
					<Icon {...otherProps} />
				</Offset>
				{children}
			</Container>
		</Common.SubTitle>
	)
};

// Note how we achieve this - absolute positioning.
// This is not ideal, and if I did it all again from scratch I would have used Flexbox and avoided the IconPadding element.
// But this works.

const Container = styled.span`
	position: relative;
	display: inline-block;
`;

const Offset = styled.span`
	position: absolute;
	top: 0;
	left: -2rem;
	display: inline-block;
`;