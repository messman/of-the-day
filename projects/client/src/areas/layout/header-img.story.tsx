import * as React from 'react';
import { decorate } from '@/test/decorate';
import { number } from '@storybook/addon-knobs';
import { styled } from '@/core/style/styled';
import { HeaderImg } from './header-img';

export default { title: 'Areas/Layout/Header Img' };

export const TestHeaderImg = decorate('Header Img', () => {

	const height = number('Rem Height', 30, { min: 2, max: 80, step: 5 });

	return (
		<Container dataHeight={height}>
			<HeaderImg />
		</Container>
	);
});

interface ContainerProps {
	dataHeight: number;
}

const Container = styled.div<ContainerProps>`
	position: relative;
	height: ${p => p.dataHeight}rem;
	background-color: ${p => p.theme.color.primaryA};
`;