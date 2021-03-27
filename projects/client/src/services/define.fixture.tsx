import * as React from 'react';
import { DEFINE } from '@/services/define';
import { wrap } from '@/test/decorate';
import { Spacing } from '@/core/layout/common';
import { tStyled } from '@/core/style/styled';

export default wrap(null, () => {

	console.log(DEFINE);

	return (
		<>
			<TextPara>Build Time: {DEFINE.buildTime} ({new Date(DEFINE.buildTime).toISOString()})</TextPara>
			<TextPara>Build Version: {DEFINE.buildVersion}</TextPara>
			<TextPara>Server Base: {DEFINE.serverBase}</TextPara>
		</>
	);
});

const TextPara = tStyled.p`
	margin: ${Spacing.dog16};
`;