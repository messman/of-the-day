import * as React from 'react';
import { IPostDayReference } from 'oftheday-shared';

export const dayReferencesText: Record<keyof typeof IPostDayReference, string> = {
	other: '',
	tomorrow: 'Tomorrow',
	today: 'Today',
	yesterday: 'Yesterday'
};

export function getDayReferenceRender(dayReference: IPostDayReference): JSX.Element | null {
	if (dayReference !== IPostDayReference.other) {
		const dayReferenceText = dayReferencesText[IPostDayReference[dayReference] as keyof typeof IPostDayReference];
		return <>{dayReferenceText}&nbsp;&middot;&nbsp;</>;
	}
	return null;
}