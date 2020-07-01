import * as React from 'react';
import { Text } from '@/core/symbol/text';

export interface PostsProps {

}

export const Posts: React.FC<PostsProps> = () => {

	return (
		<div>
			<Text>A place for daily updates by Andrew.</Text>
		</div>
	);
};