import * as React from 'react';
import { useValue, wrap } from '@/test/decorate';
import { Header } from './header';

export default wrap(null, () => {

	const isActive = useValue('Is Active', true);

	return (
		<>
			<Header isActive={isActive} />
		</>
	);
});