
import * as React from 'react';
import { decorate } from '@/test/decorate';
import { Checkbox, OpenSelect } from './filter-overlay-forms';
import { Block, Margin } from '@/core/layout/common';
import { RegularText } from '@/core/symbol/text';

export default { title: 'Areas/Archive/Filter/Overlay/Forms' };

export const TestCheckbox = decorate('Checkbox', null, () => {

	const [isChecked, setIsChecked] = React.useState(false);

	return (
		<Margin.Dog16>
			<Checkbox value={isChecked} onValueChange={setIsChecked}>Testing, here!</Checkbox>
		</Margin.Dog16>
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
		<Margin.Dog16>
			<OpenSelect options={options} selectedIndex={selected} onSelectedIndexChange={setIsSelected} />
			<Block.Dog16 />
			<RegularText>{options[selected].value}</RegularText>
		</Margin.Dog16>
	);
});