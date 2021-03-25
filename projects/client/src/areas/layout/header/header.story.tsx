import * as React from 'react';
import { decorate } from '@/test/decorate';
import { Header } from './header';
import { boolean } from '@storybook/addon-knobs';

export default { title: 'Areas/Layout/Header/Header' };

export const TestHeader = decorate('Header', null, () => {

	const isActive = boolean('Is Active', true);

	return (
		<Header isActive={isActive} />
	);
});