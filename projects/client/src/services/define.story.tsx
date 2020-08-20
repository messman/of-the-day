import * as React from 'react';
import { DEFINE } from '@/services/define';
import { decorate } from '@/test/decorate';
import { largerSpacingValue, addMargin } from '@/core/style/common';
import { Text } from '@/core/symbol/text';

export default { title: 'Services/Define' };

export const TestDefine = decorate('Define', () => {

	console.log(DEFINE);

	return (
		<>
			<TextPara>Build Time: {DEFINE.buildTime} ({new Date(DEFINE.buildTime).toISOString()})</TextPara>
			<TextPara>Build Version: {DEFINE.buildVersion}</TextPara>
			<TextPara>Server Base: {DEFINE.serverBase}</TextPara>
		</>
	);
});

const TextPara = addMargin(Text, largerSpacingValue);