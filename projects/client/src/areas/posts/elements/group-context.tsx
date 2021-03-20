import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { Notes, Schedule, Location } from './basics';
import { EndThoughts } from './end-thoughts';
import { ColumnCardFlow } from '@/core/card/card-flow';
import { Spacing } from '@/core/layout/common';
import { Flex, FlexRow } from '@messman/react-common';
import { tStyled } from '@/core/style/styled';
import { LayoutBreakpointRem } from '@/services/layout/window-layout';

interface PostProps {
	post: IPost;
}

/**
 * Shows the notes, schedule, end thoughts, and location.
 */
export const ContextGroup: React.FC<PostProps> = (props) => {
	const { post } = props;

	return (
		<Container>
			<FlexRow>
				<Flex />
				<Flex flex='3'>
					<ColumnCardFlow $spacing={Spacing.dog16}>
						<EndThoughts value={post.endThoughts} />
						<Notes value={post.basics} />
						<Schedule value={post.basics} />
						<Location value={post.basics} />
					</ColumnCardFlow>
				</Flex>
				<Flex />
			</FlexRow>
		</Container>
	);
};

const Container = tStyled.div`
	margin-top: ${Spacing.elf24};
	max-width: ${LayoutBreakpointRem.d40};
`;