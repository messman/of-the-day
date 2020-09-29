import * as React from 'react';
import { IOther } from 'oftheday-shared';
import { spacing, Spacing } from '@/core/layout/common';
import { Checklist } from './elements/checklist';
import { LookingForward } from './elements/looking-forward';
import { WorkingOn } from './elements/working-on';
import { Miles } from './elements/miles';
import { Tops } from './elements/tops';
import { CardGroup } from '@/core/card/card-group';

export interface OtherProps {
	overrideOther?: IOther;
}

export const Other: React.FC<OtherProps> = (props) => {

	const { overrideOther } = props;

	const other: IOther = overrideOther || {} as unknown as IOther;

	return (
		<Spacing margin={spacing.medium.vertical}>
			<CardGroup title='Plans' isAutoAlternateBackground={true}>
				<WorkingOn other={other} />
				<LookingForward other={other} />
			</CardGroup>
			<Checklist other={other} />
			<Tops other={other} />
			<Miles other={other} />
		</Spacing>
	);
};