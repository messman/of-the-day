import * as React from 'react';
import { IOther } from 'oftheday-shared';
import { DynamicMargin } from '@/core/layout/common';
import { spacing } from '@/core/style/common';
import { Checklist } from './elements/checklist';
import { ListLinks } from './elements/list-links';
import { LookingForward } from './elements/looking-forward';
import { WorkingOn } from './elements/working-on';
import { Miles } from './elements/miles';
import { Tops } from './elements/tops';

export interface OtherProps {
	overrideOther?: IOther;
}

export const Other: React.FC<OtherProps> = (props) => {

	const { overrideOther } = props;

	const other: IOther = overrideOther || {} as unknown as IOther;

	return (
		<DynamicMargin margin={spacing.medium.vertical}>
			<WorkingOn other={other} />
			<LookingForward other={other} />
			<Checklist other={other} />
			<ListLinks other={other} />
			<Miles other={other} />
			<Tops other={other} />
		</DynamicMargin>
	);
};