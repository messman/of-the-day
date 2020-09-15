import * as React from 'react';
import { IPostEndThoughts, IPostCustom } from 'oftheday-shared';
import { Custom } from './custom';

export interface EndThoughtsProps {
	endThoughts: IPostEndThoughts;
}

export const EndThoughts: React.FC<EndThoughtsProps> = (props) => {
	const { endThoughts } = props;
	const { value } = endThoughts;

	if (!value) {
		return null;
	}

	const custom: IPostCustom = {
		title: 'End-of-day Thoughts',
		value: value,
		link: '',
		linkText: '',
		hiddenValue: '',
		previewLink: false
	};

	return (
		<Custom custom={custom} />
	);
};