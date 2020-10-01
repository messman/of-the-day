import * as React from 'react';
import { decorate } from '@/test/decorate';
import { RegularText } from '@/core/symbol/text';
import { iconTypes, Icon } from '@/core/symbol/icon';

export default { title: 'Core/Symbol/Icon' };

export const TestIcon = decorate('Icon', null, () => {

	const iconList = Object.keys(iconTypes).map((iconName) => {
		const icon = iconTypes[iconName as keyof typeof iconTypes];

		return (
			<div key={iconName}>
				<RegularText>{iconName}</RegularText>
				<Icon type={icon} height='2rem' fillColor={c => c.textAccentOnBackground} />
			</div>
		);
	});

	return (
		<>
			{iconList}
		</>
	);
});