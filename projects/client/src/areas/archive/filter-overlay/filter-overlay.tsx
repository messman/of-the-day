import * as React from 'react';
import { ActionLink } from '@/core/link';
import { OverlayBox } from '@/core/overlay/overlay';
import { ManagedOverlayBoxProps } from '@/services/overlay/overlay-manager';
import { FlexColumn, FlexRow } from '@messman/react-common';
import { IArchiveFilter, cloneFilter, isFilterValid } from 'oftheday-shared';
import { tStyled } from '@/core/style/styled';
import { Spacing, spacing } from '@/core/layout/common';
import { FontSize, RegularText } from '@/core/symbol/text';
import { matchToPreset } from '../filter-common';
import { Icon, iconTypes } from '@/core/symbol/icon';
import { HighlightBar } from '@/core/style/common';
import { FilterOverlayAdvanced } from './filter-overlay-advanced';
import { FilterPresets } from '../filter-presets';
import { MenuBarItem } from '@/areas/layout/menu-bar/menu-bar-items';

export interface FilterOverlayProps extends ManagedOverlayBoxProps {
	filter: IArchiveFilter;
	onFilterSubmit: (filter: IArchiveFilter) => void;
	isShowingPresets: boolean;
	onShowingPresetsChange: (isShowingPresets: boolean) => void;
}

export const FilterOverlay: React.FC<FilterOverlayProps> = (props) => {

	const { isActive, onSetInactive, filter, onFilterSubmit, isShowingPresets, onShowingPresetsChange } = props;

	const [filterWorkingCopy, setFilterWorkingCopy] = React.useState(() => {
		return cloneFilter(filter);
	});

	React.useEffect(() => {
		setFilterWorkingCopy(cloneFilter(filter));
	}, [filter, isActive]);


	function onSubmit() {
		onFilterSubmit(filterWorkingCopy);
	}

	function onFilterWorkingCopyChanged(newFilter: IArchiveFilter): void {
		matchToPreset(newFilter);
		setFilterWorkingCopy(newFilter);
	}

	const invalidWarning = !isFilterValid(filterWorkingCopy) ? (
		<RegularText isMaxLineLength={false} textAlign='center' margin={spacing.medium.value}>
			<Spacing isInline={true} margin={spacing.small.right}>
				<Icon type={iconTypes.alert} fillColor={c => c.warning} height={FontSize.textRegular} />
			</Spacing>
			This won't return anything.
		</RegularText>
	) : null;

	const tabPadding = spacing.medium.value;
	const tabIndex = isShowingPresets ? 0 : 1;
	let tabContent: JSX.Element = null!;
	if (isShowingPresets) {
		tabContent = (
			<FilterPresets
				selectedFilter={filterWorkingCopy}
				onClickPreset={onFilterWorkingCopyChanged}
			/>
		);
	}
	else {
		tabContent = (
			<FilterOverlayAdvanced
				filterWorkingCopy={filterWorkingCopy}
				onFilterWorkingCopyChanged={onFilterWorkingCopyChanged}
			/>
		);
	}

	function onPresetTabClick() {
		onShowingPresetsChange(true);
	}

	function onAdvancedTabClick() {
		onShowingPresetsChange(false);
	}

	return (
		<OverlayBox
			isActive={isActive}
			onSetInactive={onSetInactive}
			headerTitle='Filter'
			isSetInactiveOnBackdropClick={false}
		>
			<TabHeaderContainer>
				<HighlightBar position='bottom' index={tabIndex} count={2} />
				<MenuBarItem
					title='Presets'
					isActive={isShowingPresets}
					isDisabled={false}
					onClick={onPresetTabClick}
					padding={tabPadding}
				/>
				<MenuBarItem
					title='Advanced'
					isActive={!isShowingPresets}
					isDisabled={false}
					onClick={onAdvancedTabClick}
					padding={tabPadding}
				/>
			</TabHeaderContainer>
			<ScrollFlexColumn>
				{tabContent}
			</ScrollFlexColumn>
			{invalidWarning}
			<Footer>
				<FooterActionLink onClick={onSetInactive}>Cancel</FooterActionLink>
				<FooterActionLink onClick={onSubmit}>Submit</FooterActionLink>
			</Footer>
		</OverlayBox>
	);
};


const TabHeaderContainer = tStyled(FlexRow)`
	position: relative;
`;

export interface FilterOverlayTabProps {
	filterWorkingCopy: IArchiveFilter;
	onFilterWorkingCopyChanged: (newFilter: IArchiveFilter) => void;
}

const ScrollFlexColumn = tStyled(FlexColumn)`
	overflow-y: auto;
	padding: ${spacing.medium.value};
`;

const Footer = tStyled(FlexRow)`
	border-top: 1px solid ${p => p.theme.color.bgComponent3};
`;

const FooterActionLink = tStyled(ActionLink)`
	flex: 1;
	text-align: center;
	padding: ${spacing.medium.value};
`;
