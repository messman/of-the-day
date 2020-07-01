import * as React from 'react';
import { AboutProps } from '@/areas/about/about';
import { PostsProps } from '@/areas/posts/posts';
import { OtherProps } from '@/areas/other/other';
import { ArchiveProps } from '@/areas/archive/archive';
import { AccountProps } from '@/areas/account/account';
import { Flex } from '@/core/layout/flex';
import { styled } from '@/core/style/styled';
import { Text } from '@/core/symbol/text';

export const MockPosts: React.FC<PostsProps> = () => {
	return (
		<Area><Text>Posts</Text></Area>
	);
};

export const MockOther: React.FC<OtherProps> = () => {
	return (
		<Area><Text>Other</Text></Area>
	);
};

export const MockArchive: React.FC<ArchiveProps> = () => {
	return (
		<Area><Text>Archive</Text></Area>
	);
};

export const MockAccount: React.FC<AccountProps> = () => {
	return (
		<Area><Text>Account</Text></Area>
	);
};

export const MockAbout: React.FC<AboutProps> = () => {
	return (
		<Area><Text>About</Text></Area>
	);
};

const Area = styled(Flex)`
	color: darkred;
	border: 1px solid darkred;
	padding: 1rem;
`;