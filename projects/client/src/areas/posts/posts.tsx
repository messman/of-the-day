import * as React from 'react';
import { Text, Title } from '@/core/symbol/text';

export interface PostsProps {

}

export const Posts: React.FC<PostsProps> = () => {

	return (
		<div>
			<Title isBold={true}>Of The Day</Title>
			<Text>A place for daily updates by Andrew.</Text>
		</div>
	);
};