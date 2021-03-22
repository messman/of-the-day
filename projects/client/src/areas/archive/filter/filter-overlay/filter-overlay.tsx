import * as React from 'react';
import { ActionLink } from '@/core/link';
import { OverlayBox } from '@/core/overlay/overlay';
import { ManagedOverlayBoxProps } from '@/services/overlay/overlay-manager';
import { FlexColumn, FlexRow } from '@messman/react-common';
import { IArchiveFilter, cloneFilter, isFilterValid } from 'oftheday-shared';
import { tStyled } from '@/core/style/styled';
import { Spacing, Block } from '@/core/layout/common';
import { RegularText } from '@/core/symbol/text';
import { matchToPreset } from '../filter-common';
import { IconSize, iconTypes, SizedIcon } from '@/core/symbol/icon';
import { HighlightBar } from '@/core/style/common';
import { FilterOverlayAdvanced } from './filter-overlay-advanced';
import { FilterPresets } from '../filter-presets';
import { MenuBarItem } from '@/areas/layout/menu-bar/menu-bar-items';

export interface FilterOverlayProps extends ManagedOverlayBoxProps {
	isShowingPresetsInitially: boolean;
	filter: IArchiveFilter;
	onFilterSubmit: (filter: IArchiveFilter) => void;
}

/**
 * Overlay to edit the filter choice.
 * Contains two tabs - one for selecting a preset and another for fine-tuning the filter
 * to choose the types (music, video, etc), range, sort, etc.
 */
export const FilterOverlay: React.FC<FilterOverlayProps> = (props) => {

	const { isActive, onSetInactive, filter, onFilterSubmit, isShowingPresetsInitially } = props;

	const [isShowingPresets, setIsShowingPresets] = React.useState(isShowingPresetsInitially);

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
		<FooterWarning>
			<WarningIcon type={iconTypes.alert} size={IconSize.a_medium} />
			The selected filter options won't return anything.
		</FooterWarning>
	) : null;

	const tabPadding = Spacing.dog16;
	const tabIndex = isShowingPresets ? 0 : 1;
	let tabContent: JSX.Element = null!;
	if (isShowingPresets) {
		tabContent = (
			<>
				<CenteredRegularText>Select a preset, or choose the 'advanced' tab.</CenteredRegularText>
				<Block.Dog16 />
				<FilterPresets
					selectedFilter={filterWorkingCopy}
					onClickPreset={onFilterWorkingCopyChanged}
				/>
			</>
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
		setIsShowingPresets(true);
	}

	function onAdvancedTabClick() {
		setIsShowingPresets(false);
	}

	return (
		<OverlayBox
			isActive={isActive}
			onSetInactive={onSetInactive}
			headerTitle='Filter'
			isSetInactiveOnBackdropClick={false}
			isMaxHeight={true}
		>
			<TabHeaderContainer flex='none'>
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
			<ScrollFlexColumn flex='1'>
				{tabContent}
			</ScrollFlexColumn>
			{invalidWarning}
			<Footer flex='none'>
				<FooterActionLink onClick={onSetInactive}>Cancel</FooterActionLink>
				<FooterActionLink onClick={onSubmit}>Submit</FooterActionLink>
			</Footer>
		</OverlayBox>
	);
};


const TabHeaderContainer = tStyled(FlexRow)`
	position: relative;
	border-bottom: 1px solid ${p => p.theme.outlineDistinct};
`;

export interface FilterOverlayTabProps {
	filterWorkingCopy: IArchiveFilter;
	onFilterWorkingCopyChanged: (newFilter: IArchiveFilter) => void;
}

const ScrollFlexColumn = tStyled(FlexColumn)`
	overflow-y: auto;
	padding: ${Spacing.dog16};
`;

const Footer = tStyled(FlexRow)`
	border-top: 1px solid ${p => p.theme.outlineDistinct};
`;

const FooterActionLink = tStyled(ActionLink)`
	flex: 1;
	text-align: center;
	padding: ${Spacing.dog16};
`;

const FooterWarning = tStyled(RegularText)`
	border-top: 1px solid ${p => p.theme.outlineDistinct};
	text-align: center;
	padding: ${Spacing.dog16};
`;

const CenteredRegularText = tStyled(RegularText)`
	text-align: center;
`;

const WarningIcon = tStyled(SizedIcon)`
	display: inline-block;
	margin-right: ${Spacing.bat08};
	color: ${p => p.theme.system.warning};
`;
