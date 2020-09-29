import * as React from 'react';
import { decorate } from '@/test/decorate';
import { Header } from './header';

export default { title: 'Areas/Layout/Header/Header' };

export const TestHeader = decorate('Header', null, () => {
	return (
		<Header />
	);
});