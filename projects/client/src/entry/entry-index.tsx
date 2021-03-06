import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Wrapper } from './wrapper';
import { ApplicationLayout } from '@/areas/layout/layout';

/*
	Root of the application.
*/
ReactDOM.render(
	<Wrapper>
		<ApplicationLayout />
	</Wrapper>,
	document.getElementById('react-root')
);