import * as React from 'react';
import { decorate } from '@/test/decorate';
import { Header } from './header';

export default { title: 'Areas/Layout/Header/Header' };

export const TestHeader = decorate('Header', () => {
	return (
		<Header />
	);
});

// export const TestHeaderImageOverlay = decorate('Image Overlay', () => {
// 	return (
// 		<TextContainer>
// 			<HeaderImageOverlay />
// 		</TextContainer>
// 	);
// });

// const TextContainer = tStyled.div`
// 	height: 20rem;
// 	position: relative;
// 	background-color: #333;
// 	border: 1px solid red;
// `;