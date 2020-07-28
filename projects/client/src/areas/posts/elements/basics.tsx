import * as React from 'react';
import { DailyRecord } from 'oftheday-shared';
import { LabelValue, Value } from '@/core/layout/common';

export interface BasicsProps {
	day: DailyRecord;
}

export const Basics: React.FC<BasicsProps> = (props) => {
	const { day } = props;

	return (
		<>
			<Value value={day.specialEvent} margin='1rem' />
			<Value value={day.note} margin='1rem' />
			<LabelValue label='Location' value={day.location} margin='1rem' />
			<LabelValue label='Schedule' value={day.schedule} margin='1rem' />
		</>
	);
};

