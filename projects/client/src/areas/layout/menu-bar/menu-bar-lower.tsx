import * as React from 'react';
import { tStyled } from '@/core/style/styled';
import { FlexRow } from '@messman/react-common';
import { MenuBarItems } from './menu-bar-items';

export interface LowerMenuBarProps {
	isMobileWidth: boolean;
	onPathClick: () => void;
}

export const LowerMenuBar: React.FC<LowerMenuBarProps> = (props) => {
	const { isMobileWidth, onPathClick } = props;

	if (!isMobileWidth) {
		return null;
	}

	return (
		<LowerMenuBarContainer flex='none'>
			<MenuBarItems isUpper={false} onPathClick={onPathClick} />
		</LowerMenuBarContainer>
	);
};

const LowerMenuBarContainer = tStyled(FlexRow)`
	position: relative;
	background-color: ${p => p.theme.color.bg2};
	border-top: 1px solid ${p => p.theme.color.bgComponent3};
`;