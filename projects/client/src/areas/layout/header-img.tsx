import { styled } from '@/core/style/styled';

const headerImgDataUrl = require('@/static/images/header-background.png').default as string;

export const HeaderImg = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	background-image: url(${headerImgDataUrl});
	background-position: center;
`;