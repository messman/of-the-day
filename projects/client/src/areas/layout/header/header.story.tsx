import * as React from 'react';
import { decorate } from '@/test/decorate';
import { Header, Header2 } from './header';
import { boolean } from '@storybook/addon-knobs';
import { Block } from '@/core/layout/common';

export default { title: 'Areas/Layout/Header/Header' };

export const TestHeader = decorate('Header', null, () => {

	const isActive = boolean('Is Active', true);

	return (
		<>
			<Header isActive={isActive} />
			<Block.Dog16 />
			<Header2 isActive={isActive} />
		</>
	);
});