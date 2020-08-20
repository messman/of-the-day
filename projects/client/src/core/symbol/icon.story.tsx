import * as React from 'react';
import { decorate } from '@/test/decorate';
import { Text } from '@/core/symbol/text';
import { iconTypes, Icon } from '@/core/symbol/icon';

export default { title: 'Core/Symbol/Icon' };

export const TestIcon = decorate('Icon', () => {

	const iconList = Object.keys(iconTypes).map((iconName) => {
		const icon = iconTypes[iconName as keyof typeof iconTypes];

		return (
			<div key={iconName}>
				<Text>{iconName}</Text>
				<Icon type={icon} height='2rem' />
			</div>
		);
	});

	return (
		<>
			{iconList}
		</>
	);
});