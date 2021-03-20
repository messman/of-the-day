import * as React from 'react';
import { decorate } from '@/test/decorate';
import { Margin } from '@/core/layout/common';
import { text } from '@storybook/addon-knobs';
import { RegularText } from '@/core/symbol/text';
import { Button } from './button';
import { iconTypes } from '@/core/symbol/icon';

export default { title: 'Core/Form/Button' };

export const TestButton = decorate('Button', null, () => {

	const buttonText = text('Button Text', 'Click Here');

	const [counter, setCounter] = React.useState(0);

	function onClick() {
		setCounter((p) => {
			return p + 1;
		});
	}

	const ExampleMargin = Margin.Dog16;

	return (
		<div>
			<RegularText>Counter: {counter.toString()}</RegularText>
			<ExampleMargin>
				<Button
					onClick={onClick}
					title={buttonText}
				>
					{buttonText}
				</Button>
			</ExampleMargin>
			<ExampleMargin>
				<Button
					onClick={onClick}
					title={buttonText}
					isDisabled={true}
				>
					{buttonText}
				</Button>
			</ExampleMargin>
			<ExampleMargin>
				<Button
					onClick={onClick}
					title={buttonText}
					isDisabled={true}
					isSelected={true}
				>
					{buttonText}
				</Button>
			</ExampleMargin>
			<ExampleMargin>
				<Button
					onClick={onClick}
					title={buttonText}
					isSelected={true}
				>
					{buttonText}
				</Button>
			</ExampleMargin>
			<ExampleMargin>
				<Button
					onClick={onClick}
					title={buttonText}
					isSpecial={true}
				>
					{buttonText}
				</Button>
			</ExampleMargin>
			<ExampleMargin>
				<Button
					onClick={onClick}
					title={buttonText}
					isSpecial={true}
					iconAfter={iconTypes.right}
				>
					{buttonText}
				</Button>
			</ExampleMargin>
			<ExampleMargin>
				<Button
					onClick={onClick}
					title={buttonText}
					iconBefore={iconTypes.music}
				>
					{buttonText}
				</Button>
			</ExampleMargin>

			<ExampleMargin>
				<Button
					onClick={onClick}
					title={buttonText}
					iconBefore={iconTypes.music}
					iconAfter={iconTypes.right}
				>
					{buttonText}
				</Button>
			</ExampleMargin>

			<ExampleMargin>
				<Button
					onClick={onClick}
					title={buttonText}
					iconBefore={iconTypes.video}
					iconAfter={iconTypes.right}
				>
					{buttonText}
				</Button>
			</ExampleMargin>
		</div>
	);
});