import * as React from 'react';
import { tStyled } from '@/core/style/styled';
import { FlexRow } from '@messman/react-common';
import { MenuBarItems } from './menu-bar-items';
import { useIsNeedingHomeBarPadding } from '@/services/feature';
import { Block } from '@/core/layout/common';

export interface LowerMenuBarProps {
	isMobileWidth: boolean;
	onPathClick: () => void;
}

export const LowerMenuBar: React.FC<LowerMenuBarProps> = (props) => {
	const { isMobileWidth, onPathClick } = props;

	const needsPadding = useIsNeedingHomeBarPadding();
	const paddingSpace = needsPadding ? <Block.Dog16 /> : null;

	if (!isMobileWidth) {
		return null;
	}

	return (
		<LowerMenuBarContainer>
			<FlexRow>
				<MenuBarItems isUpper={false} onPathClick={onPathClick} />
			</FlexRow>
			{paddingSpace}
		</LowerMenuBarContainer>
	);
};

const LowerMenuBarContainer = tStyled.div`
	flex: none;
	position: relative;
	background-color: ${p => p.theme.subtleFill.d3Nav};
	border-top: 1px solid ${p => p.theme.outlineDistinct};
`;