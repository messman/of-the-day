
import * as React from 'react';
import { decorate } from '@/test/decorate';
import { Checkbox, OpenSelect } from './filter-overlay-forms';
import { spacing, Spacing } from '@/core/layout/common';
import { RegularText } from '@/core/symbol/text';

export default { title: 'Areas/Archive/Filter Overlay/Forms' };

export const TestCheckbox = decorate('Checkbox', null, () => {

	const [isChecked, setIsChecked] = React.useState(false);

	return (
		<Spacing margin={spacing.large.value}>
			<Checkbox value={isChecked} onValueChange={setIsChecked}>Testing, here!</Checkbox>
		</Spacing>
	);
});

const options = [
	{
		value: 'hello',
		isDisabled: false,
	},
	{
		value: 'goodbye',
		isDisabled: false,
	},
	{
		value: 'this',
		isDisabled: true,
	},
	{
		value: 'that',
		isDisabled: false,
	}
];

export const TestSelect = decorate('Select', null, () => {

	const [selected, setIsSelected] = React.useState(0);


	return (
		<Spacing margin={spacing.large.value}>
			<OpenSelect options={options} selectedIndex={selected} onSelectedIndexChange={setIsSelected} />
			<Spacing margin={spacing.large.top}>
				<RegularText>{options[selected].value}</RegularText>
			</Spacing>
		</Spacing>
	);
});