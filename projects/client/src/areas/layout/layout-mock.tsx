import * as React from 'react';
import { AboutProps } from '@/areas/about/about';
import { PostsProps } from '@/areas/posts/posts';
import { ArchiveProps } from '@/areas/archive/archive';
import { tStyled } from '@/core/style/styled';
import { RegularText } from '@/core/symbol/text';
import { Flex } from '@messman/react-common';

export const MockPosts: React.FC<PostsProps> = () => {
	return (
		<Area><RegularText>Posts</RegularText></Area>
	);
};

export const MockOther: React.FC = () => {
	return (
		<Area><RegularText>Other</RegularText></Area>
	);
};

export const MockArchive: React.FC<ArchiveProps> = () => {
	return (
		<Area><RegularText>Archive</RegularText></Area>
	);
};

export const MockAbout: React.FC<AboutProps> = () => {
	return (
		<Area><RegularText>About</RegularText></Area>
	);
};

const Area = tStyled(Flex)`
	color: darkred;
	border: 1px solid darkred;
	padding: 1rem;
	min-height: 100rem;
`;