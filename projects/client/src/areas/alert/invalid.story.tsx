import * as React from 'react';
import { RegularText } from '@/core/symbol/text';
import { boolean, text } from '@storybook/addon-knobs';
import { InvalidCheck } from './invalid';
import { decorate } from '@/test/decorate';

export default { title: 'Areas/Alert/Invalid' };

export const TestInvalid = decorate('Invalid', () => {

	// Set up knobs.
	const isForceAlertMessages = boolean('Force Alert Messages', false, 'Build Alert');
	const firstAlertMessage = text('First Alert Message', 'Houston, we have a problem.', 'Build Alert');
	const secondForceAlertMessage = text('Second Alert Message', 'but we probably do not know what that problem is.', 'Build Alert');

	// Require checkbox before we pass any strings.
	const alertMessages = [];
	if (isForceAlertMessages && firstAlertMessage) {
		alertMessages.push(firstAlertMessage);
		if (secondForceAlertMessage) {
			alertMessages.push(secondForceAlertMessage);
		}
	}

	const isForceInternetExplorer = boolean('Force Internet Explorer', false);
	const isForceInvalidLayout = boolean('Force Invalid Layout', false);

	return (
		<InvalidCheck
			forceAlertMessages={alertMessages}
			isForceInternetExplorer={isForceInternetExplorer}
			isForceInvalidLayout={isForceInvalidLayout}
			error={null}
		>
			<div>
				<ErrorThrower />
			</div>
		</InvalidCheck>
	);
});

const ErrorThrower: React.FC = () => {

	const [isError, setIsError] = React.useState(false);

	function onClick() {
		setIsError(true);
	}

	if (isError) {
		throw new Error('Error while rendering!');
	}

	return (
		<div onClick={onClick}>
			<RegularText>
				Click here to cause an error!
			</RegularText>
		</div>
	);
};