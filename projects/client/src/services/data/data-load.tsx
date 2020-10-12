import * as React from 'react';
import { PromiseOutput } from '@messman/react-common';
import { keyframes, tStyled } from '@/core/style/styled';
import { Icon, iconTypes } from '@/core/symbol/icon';
import { RegularText } from '@/core/symbol/text';
import { Spacing, spacing } from '@/core/layout/common';
import { ActionLink } from '@/core/link';

export interface DataLoadProps {
	promise: PromiseOutput<any>;
}

const iconSize = '2.5rem';

export const DataLoad: React.FC<DataLoadProps> = (props) => {
	const { promise } = props;
	const { isStarted, error } = promise;

	if (!isStarted && !error) {
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
	else if (error) {
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
			<RegularText isMaxLineLength={false} margin={spacing.medium.top}>
				<ActionLink onClick={onRefreshClick}>Refresh</ActionLink>
			</RegularText>
		);
	}

	return (
		<Spacing margin={spacing.medium.horizontal}>
			<Spacing margin={spacing.grand.top} textAlign='center'>
				<Spacing margin={spacing.medium.vertical}>
					{icon}
				</Spacing>
				<RegularText isMaxLineLength={false} margin={spacing.medium.value}>{text}</RegularText>
				{actionLink}
			</Spacing>
		</Spacing>
	);
};

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