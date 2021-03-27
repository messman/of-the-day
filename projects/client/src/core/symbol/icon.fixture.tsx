import * as React from 'react';
import { RegularText } from '@/core/symbol/text';
import { iconTypes, SizedIcon, IconSize } from '@/core/symbol/icon';
import { wrap } from '@/test/decorate';

export default wrap(null, () => {

	const iconList = Object.keys(iconTypes).map((iconName) => {
		const icon = iconTypes[iconName as keyof typeof iconTypes];

		return (
			<div key={iconName}>
				<RegularText>{iconName}</RegularText>
				<SizedIcon type={icon} size={IconSize.a_medium} />
				<SizedIcon type={icon} size={IconSize.b_large} />
			</div>
		);
	});

	return (
		<>
			{iconList}
		</>
	);
});