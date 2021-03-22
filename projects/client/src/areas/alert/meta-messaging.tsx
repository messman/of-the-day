import { Spacing } from '@/core/layout/common';
import { borderRadiusStyle } from '@/core/style/common';
import { tStyled } from '@/core/style/styled';
import { Paragraph } from '@/core/symbol/text';
import { useMeta } from '@/services/data/data-context';
import { LayoutBreakpointRem } from '@/services/layout/window-layout';
import * as React from 'react';

export interface MetaMessagingProps {
}

/**
 * Messaging blocks that might show at the top of the screen with information.
 * Data comes from the meta object, which is returned in requests.
 * So, the content will flash onto the screen after the request completes.
 * Not ideal, but oh well.
 * In shutdown mode, the children are not rendered - the app is effectively shut down.
 */
export const MetaMessaging: React.FC<MetaMessagingProps> = (props) => {
	const { children } = props;
	const meta = useMeta();

	if (!meta || ((!meta.shutdown || !meta.shutdown.length) && (!meta.error || !meta.error.length) && (!meta.important || !meta.important.length))) {
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
			<Paragraph key={key}>
				{line}
			</Paragraph>
		);
	});
	return (
		<>{textRender}</>
	);
};

const TextBox = tStyled.div`
	padding: ${Spacing.dog16};
	margin: 0 ${Spacing.dog16};
	${borderRadiusStyle};
	background-color: ${p => p.theme.subtleFill.b1Card};
	border: .5rem solid transparent;
`;

const BadTextBox = tStyled(TextBox)`
	color: ${p => p.theme.system.error};
	border-color: ${p => p.theme.system.error};
`;

const ImportantTextBox = tStyled(TextBox)`
	color: ${p => p.theme.accent.aMain};
	border-color: ${p => p.theme.accent.aMain};
`;

const MultiMessagingContainer = tStyled.div`
	max-width: ${LayoutBreakpointRem.e50}rem;
	margin: ${Spacing.dog16} auto;

	${TextBox} + ${TextBox} {
		margin-top: ${Spacing.dog16};
	}
`;