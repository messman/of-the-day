import * as React from 'react';
import { decorate } from '@/test/decorate';
import { createContextConsumer, useRenderCount } from '@messman/react-common';

export default { title: 'Test/Sandbox' };

const [FirstProvider, useFirst] = createContextConsumer<number>(0);
const [SecondProvider, useSecond] = createContextConsumer<number>(0);

export const TestSandbox = decorate('Sandbox', null, () => {

	const [counter, setCounter] = React.useState(0);

	const renderCount = useRenderCount('Top');

	function onClick() {
		setCounter((p) => {
			return p + 1;
		});
	}

	return (
		<div>
			<button onClick={onClick}>Increment</button>
			<p>Top: {renderCount}</p>
			<FirstProvider value={counter}>
				<Second>
					<Parent>
						<Child />
					</Parent>
				</Second>
			</FirstProvider>
		</div>
	);
});

const Second: React.FC = (props) => {
	const first = useFirst();

	// const [counter, setCounter] = React.useState(0);
	const renderCount = useRenderCount('Second');

	// React.useLayoutEffect(() => {
	// 	setCounter(first);
	// }, [first]);

	return (
		<SecondProvider value={first}>
			<p>Second: {renderCount}</p>
			{props.children}
		</SecondProvider>
	);
};

const Parent: React.FC = (props) => {
	const first = useFirst();
	const second = useSecond();
	const renderCount = useRenderCount('Parent');

	if (first !== second) {
		console.log('Parent mismatch');
	}

	return (
		<div>
			<p>Parent: {renderCount}</p>
			<p>first: {first}, second: {second}</p>
			<>{props.children}</>
		</div>
	);
};

const Child: React.FC = () => {
	const first = useFirst();
	const second = useSecond();
	const renderCount = useRenderCount('Child');

	if (first !== second) {
		console.log('Child mismatch');
	}

	return (
		<div>
			<p>Child: {renderCount}</p>
			<p>first: {first}, second: {second}</p>
		</div>
	);
};