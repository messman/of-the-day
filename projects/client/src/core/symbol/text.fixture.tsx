import * as React from 'react';
import { wrap } from '@/test/decorate';
import { Heading1, Heading2, Heading3, RegularText, SmallText } from '@/core/symbol/text';
import { IconSize, iconTypes, SizedIcon } from '@/core/symbol/icon';
import { tStyled } from '../style/styled';
import { Spacing } from '../layout/common';

export default wrap(null, () => {

	const iconType = iconTypes.activity;

	return (
		<>
			<Padding>
				<Heading1>
					<SpacedIcon type={iconType} size={IconSize.b_large} />
					Heading 1
				</Heading1>
			</Padding>
			<Padding>
				<Heading2>
					<SpacedIcon type={iconType} size={IconSize.b_large} />
					Heading 2
				</Heading2>
			</Padding>
			<Padding>
				<Heading3>
					<SpacedIcon type={iconType} size={IconSize.b_large} />
					Heading 3
				</Heading3>
			</Padding>
			<Padding>
				<RegularText>
					<SpacedIcon type={iconType} size={IconSize.a_medium} />
					Regular Text
					</RegularText>
			</Padding>
			<Padding>
				<SmallText>
					<SpacedIcon type={iconType} size={IconSize.a_medium} />
					Small Text
				</SmallText>
			</Padding>
		</>
	);
});

const Padding = tStyled.div`
	margin: ${Spacing.dog16};
`;

const SpacedIcon = tStyled(SizedIcon)`
	margin-right: ${Spacing.ant04};
`;