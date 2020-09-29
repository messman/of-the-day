import { ApplicationMaxWidth } from '@/core/layout/common';
import * as React from 'react';

export interface AboutProps {

}

export const About: React.FC<AboutProps> = () => {

	return (
		<ApplicationMaxWidth>

			<p>About</p>
		</ApplicationMaxWidth>
	);
};