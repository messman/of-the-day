import * as React from 'react';
import { DEFINE } from '@/services/define';
import { decorate } from '@/test/storybook/decorate';
import { spacingBValue, addMargin } from '@/core/style/common';
import { Text } from '@/core/symbol/text';

export default { title: 'services' };

export const TestDefine = decorate(() => {

	console.log(DEFINE);

	return (
		<>
			<TextPara>Build Time: {DEFINE.buildTime} ({new Date(DEFINE.buildTime).toISOString()})</TextPara>
			<TextPara>Build Version: {DEFINE.buildVersion}</TextPara>
			<TextPara>Server Base: {DEFINE.serverBase}</TextPara>
		</>
	);
});

const TextPara = addMargin(Text, spacingBValue);