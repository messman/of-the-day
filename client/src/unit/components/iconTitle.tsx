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

const Container = styled.div`
	position: relative;
	display: inline-block;
`;

const Offset = styled.div`
	position: absolute;
	top: 0;
	left: -2rem;
	display: inline-block;
`;