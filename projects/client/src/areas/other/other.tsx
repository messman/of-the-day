import * as React from 'react';
import { spacing, Spacing } from '@/core/layout/common';
import { Checklist } from './elements/checklist';
import { Miles } from './elements/miles';
import { Tops } from './elements/tops';
import { CardGroup } from '@/core/card/card-group';
import { EqualCardFlow } from '@/core/card/card-flow';
import { DataLoad } from '@/services/data/data-load';
import { useOtherResponse } from '@/services/data/data-context';
import { LookingForward, WorkingOn } from './elements/plans';
import { IOther } from 'oftheday-shared';

export const Other: React.FC = () => {

	const otherPromise = useOtherResponse();
	const { data, error, isStarted } = otherPromise;

	let other: IOther | null = null;
	if (data && (data.meta && !data.meta.shutdown.length)) {
		other = data.other;
	}

	if (isStarted || error || !other) {
		return <DataLoad promise={otherPromise} />;
	}

	return (
		<Spacing margin={spacing.medium.vertical}>
			<CardGroup title='Plans' isAutoAlternateBackground={true}>
				<EqualCardFlow>
					<WorkingOn other={other} />
					<LookingForward other={other} />
				</EqualCardFlow>
			</CardGroup>
			<Checklist other={other} />
			<Tops other={other} />
			<Miles other={other} />
		</Spacing>
	);
};