import { spacing } from '@/core/layout/common';
import { borderRadiusStyle } from '@/core/style/common';
import { tStyled } from '@/core/style/styled';
import { FontWeight } from '@/core/style/theme';
import { Paragraph } from '@/core/symbol/text';
import { useMeta } from '@/services/data/data-context';
import { LayoutBreakpoint } from '@/services/layout/window-layout';
import * as React from 'react';

export interface MetaMessagingProps {
}

export const MetaMessaging: React.FC<MetaMessagingProps> = (props) => {
	const { children } = props;
	const meta = useMeta();

	if (!meta) {
		return <>{children}</>;
	}

	const { important, error, shutdown } = meta;

	let showChildren = false;
	let shutdownRender: JSX.Element | null = null;
	let errorRender: JSX.Element | null = null;
	let importantRender: JSX.Element | null = null;

	if (shutdown && shutdown.length) {
		shutdownRender = (
			<BadTextBox>
				<MetaMessagingLines text={shutdown} />
			</BadTextBox>
		);
	}
	else {
		showChildren = true;
		errorRender = (error && error.length) ? (
			<BadTextBox>
				<MetaMessagingLines text={error} />
			</BadTextBox>
		) : null;

		importantRender = (important && important.length) ? (
			<ImportantTextBox>
				<MetaMessagingLines text={important} />
			</ImportantTextBox>
		) : null;
	}

	return (
		<>
			<MultiMessagingContainer>
				{shutdownRender}
				{errorRender}
				{importantRender}
			</MultiMessagingContainer>
			{showChildren ? children : null}
		</>
	);
};

interface MetaMessagingLinesProps {
	text: string[];
}

const MetaMessagingLines: React.FC<MetaMessagingLinesProps> = (props) => {
	const { text } = props;
	const textRender = text.map((line, i) => {
		const key = i;
		return (
			<Paragraph fontWeight={FontWeight.bold} key={key}>{line}</Paragraph>
		);
	});
	return (
		<>{textRender}</>
	);
};

const TextBox = tStyled.div`
	padding: ${spacing.large.value};
	margin: ${spacing.medium.horizontal};
	${borderRadiusStyle};
`;

const BadTextBox = tStyled(TextBox)`
	color: ${p => p.theme.color.textDistinctOnErrorFill};
	background-color: ${p => p.theme.color.error};
`;

const ImportantTextBox = tStyled(TextBox)`
	color: ${p => p.theme.color.textDistinctOnAccent};
	background-color: ${p => p.theme.color.accentGradientFill};
`;

const MultiMessagingContainer = tStyled.div`
	max-width: ${LayoutBreakpoint.tablet}px;
	margin: auto;
	margin-top: ${spacing.large.value};

	${TextBox} + ${TextBox} {
		margin-top: ${spacing.medium.value};
	}
`;