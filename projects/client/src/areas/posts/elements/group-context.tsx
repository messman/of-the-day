import * as React from 'react';
import { IPost } from 'oftheday-shared';
import { Notes, Schedule, Location } from './basics';
import { EndThoughts } from './end-thoughts';
import { ColumnCardFlow, useMaximumRowChildren } from '@/core/card/card-flow';
import { ApplicationMaxWidth, spacing, Spacing, useResponsiveEdgeSpacing } from '@/core/layout/common';
import { Flex, FlexRow } from '@messman/react-common';

interface PostProps {
	post: IPost;
}

/**
 * Shows the notes, schedule, end thoughts, and location.
 */
export const ContextGroup: React.FC<PostProps> = (props) => {
	const { post } = props;

	const maximumRowChildren = Math.min(useMaximumRowChildren(), 2);
	const spacingBetween = useResponsiveEdgeSpacing();

	const isCentered = maximumRowChildren === 1;
	const centeredLeftFlex = isCentered ? null : <Flex />;
	const centeredRightFlex = isCentered ? null : <Flex />;


	return (
		<Spacing margin={spacing.large.top}>
			<ApplicationMaxWidth>
				<FlexRow>
					{centeredLeftFlex}
					<Flex flex='3'>
						<ColumnCardFlow $spacing={spacingBetween.value}>
							<EndThoughts value={post.endThoughts} />
							<Notes value={post.basics} />
							<Schedule value={post.basics} />
							<Location value={post.basics} />
						</ColumnCardFlow>
					</Flex>
					{centeredRightFlex}
				</FlexRow>
			</ApplicationMaxWidth>
		</Spacing>
	);
};