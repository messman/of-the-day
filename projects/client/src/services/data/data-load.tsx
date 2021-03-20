import * as React from 'react';
import { PromiseOutput } from '@messman/react-common';
import { keyframes, tStyled } from '@/core/style/styled';
import { Icon, iconTypes } from '@/core/symbol/icon';
import { RegularText } from '@/core/symbol/text';
import { Block, Spacing } from '@/core/layout/common';
import { ActionLink } from '@/core/link';

/*
	Shows a loading indicator or an error message for a promise.
*/

export interface DataLoadProps {
	promise: PromiseOutput<any>;
	isInvalidData?: boolean;
}

const iconSize = '2.5rem';

export const DataLoad: React.FC<DataLoadProps> = (props) => {
	const { promise, isInvalidData } = props;
	const { isStarted, error } = promise;

	if (!isStarted && !error && !isInvalidData) {
		return null;
	}

	let icon: JSX.Element = null!;
	let text: string = null!;
	let actionLink: JSX.Element | null = null;

	if (isStarted) {
		icon = (
			<LoadingCompassContainer>
				<Icon type={iconTypes.compass} fillColor={c => c.textRegular} height='100%' />
			</LoadingCompassContainer>
		);
		text = 'Loading';
	}
	else if (error || isInvalidData) {
		icon = (
			<div>
				<Icon type={iconTypes.alert} fillColor={c => c.error} height={iconSize} />
			</div>
		);
		text = 'There was an error with loading the data.';

		function onRefreshClick() {
			window.location.reload();
		}
		actionLink = (
			<>
				<Block.Dog16 />
				<RegularText>
					<ActionLink onClick={onRefreshClick}>Refresh</ActionLink>
				</RegularText>
			</>
		);
	}

	return (
		<DataLoadContainer>
			{icon}
			<Block.Dog16 />
			<RegularText>{text}</RegularText>
			{actionLink}
		</DataLoadContainer>
	);
};

const DataLoadContainer = tStyled.div`
	text-align: center;
	margin: ${Spacing.fan32} ${Spacing.dog16}
`;

const spin = keyframes`
	0% { 
        transform: rotate(-180deg);
    }
    100% {
        transform: rotate(180deg);
    }
`;

const LoadingCompassContainer = tStyled.div`
	display: inline-block;
	width: ${iconSize};
	height: ${iconSize};
	text-align: center;

	animation: ${spin} 3s 0s linear infinite;
`;