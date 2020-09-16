import * as React from 'react';
import { tStyled, tCss } from '../style/styled';

export interface ParallaxProps {
	height: string;
	backgroundColorRender?: JSX.Element;
	parallaxRender?: JSX.Element;
}

export const Parallax: React.FC<ParallaxProps> = (props) => {
	const { height, backgroundColorRender, parallaxRender, children } = props;

	return (
		<ParallaxContainer dataHeight={height}>
			<ParallaxBackFrame>
				{backgroundColorRender}
			</ParallaxBackFrame>
			<ParallaxBackFrame>
				{parallaxRender}
			</ParallaxBackFrame>
			<ParallaxBaseFrame>
				{children}
			</ParallaxBaseFrame>
		</ParallaxContainer>
	);
};

interface ParallaxContainerProps {
	dataHeight: string;
}

const ParallaxContainer = tStyled.div<ParallaxContainerProps>`
	perspective: 1px;
	height: ${p => p.dataHeight};
	overflow-x: hidden;
	overflow-y: auto;
`;

const commonParallaxFrame = tCss`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
`;

const ParallaxBackFrame = tStyled.div`
	${commonParallaxFrame}
	transform: translateZ(-1px) scale(2);
`;

const ParallaxBaseFrame = tStyled.div`
	${commonParallaxFrame}
	transform: translateZ(0);
`;