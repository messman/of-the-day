import * as React from 'react';
import { spacing, Spacing } from '@/core/layout/common';
import { Checklist } from './elements/checklist';
import { Miles } from './elements/miles';
import { Tops } from './elements/tops';
import { DataLoad } from '@/services/data/data-load';
import { useOtherResponse } from '@/services/data/data-context';
import { Plans } from './elements/plans';
import { IOther } from 'oftheday-shared';

/**
 * Top-level layout component for the 'Info' page.
*/
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
			<Plans other={other} />
			<Checklist other={other} />
			<Tops other={other} />
			<Miles other={other} />
		</Spacing>
	);
};