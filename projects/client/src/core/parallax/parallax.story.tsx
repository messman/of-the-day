import * as React from 'react';
import { decorate } from '@/test/decorate';
import { Title } from '@/core/symbol/text';
import { tStyled } from '../style/styled';
import { Spacing } from '../layout/common';
import { FlexRoot, FlexColumn } from '@messman/react-common';

export default { title: 'Core/Parallax/Parallax' };

export const TestParallax = decorate('Parallax', () => {
	return (
		<FlexRoot flexDirection='column'>
			<Static>Above</Static>
			<ScrollContainer>
				<AntiParallaxGroup>

					<StaticInner>Above Inner</StaticInner>
					<Spacing padding='20rem 0 0 0' />
					<StaticInner>Above Inner</StaticInner>
				</AntiParallaxGroup>
				<Container>
					<BackgroundColor />
					<HeaderImg />
					<InnerContent>

						<Title >
							Title
					</Title>
						<Title >
							Title
					</Title>
						<Title >
							Title
					</Title>
						<Title >
							Title
					</Title>
					</InnerContent>
				</Container>
				<AntiParallaxGroup>

					<StaticInner>Below Inner</StaticInner>
					<Spacing padding='20rem 0 0 0' />
					<StaticInner>Below Inner</StaticInner>
				</AntiParallaxGroup>
			</ScrollContainer>
			<Static>Below</Static>
		</FlexRoot>

	);
});

const ScrollContainer = tStyled(FlexColumn)`
	overflow-y: auto;

	perspective: 2px;
	overflow-x: hidden;
	background-color: ${p => p.theme.color.backgroundC};

`;

const Static = tStyled.div`
	padding: 1rem;
	background-color: ${p => p.theme.color.backgroundA};
`;

const StaticInner = tStyled.div`
	padding: 5rem 1rem;
	background-color: ${p => p.theme.color.backgroundB};
`;

const AntiParallaxGroup = tStyled.div`
	position: relative;
	z-index: 1;
	background-color: ${p => p.theme.color.backgroundC};
`;

const Container = tStyled.div`
	position: relative;
	height: 50rem;
	transform-style: preserve-3d;
`;

const InnerContent = tStyled.div`
	padding: 5rem;
	position: relative;
	z-index: 1;
	transform: translateZ(0);
`;

const BackgroundColor = tStyled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 150%;
	transform: translateZ(-.5px) scale(2);
	z-index: -1;

	background-color: ${p => p.theme.color.primary};
`;

const headerImgDataUrl = require('@/static/images/header-background.png').default as string;
const HeaderImg = tStyled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 200%;
	height: 200%;
	transform: translateZ(-.5px) scale(1.5);
	z-index: -1;

	background-image: url(${headerImgDataUrl});
	background-position: center;
	background-size: 810px auto;
	background-repeat: repeat;
`;