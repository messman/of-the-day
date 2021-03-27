import * as React from 'react';
import { RegularText } from '@/core/symbol/text';
import { InvalidCheck } from './invalid';
import { useValue, wrap } from '@/test/decorate';
import { FlexRoot } from '@messman/react-common';
import { Padding } from '@/core/layout/common';

export default wrap(null, () => {

	// Set up knobs.
	const isForceAlertMessages = useValue('Force Alert Messages', false);
	const firstAlertMessage = useValue('First Alert Message', 'Houston, we have a problem.');
	const secondForceAlertMessage = useValue('Second Alert Message', 'but we probably do not know what that problem is.');

	// Require checkbox before we pass any strings.
	const alertMessages = [];
	if (isForceAlertMessages && firstAlertMessage) {
		alertMessages.push(firstAlertMessage);
		if (secondForceAlertMessage) {
			alertMessages.push(secondForceAlertMessage);
		}
	}

	const isForceInternetExplorer = useValue('Force Internet Explorer', false);
	const isForceInvalidLayout = useValue('Force Invalid Layout', false);

	return (
		<FlexRoot flexDirection='column'>

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
		</FlexRoot>
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
		<Padding.Dog16>
			<div onClick={onClick}>
				<RegularText>
					Click here to cause an error!
			</RegularText>
			</div>
		</Padding.Dog16>
	);
};