import { Spacing, spacing } from '@/core/layout/common';
import { OutLink } from '@/core/link';
import { borderRadiusStyle } from '@/core/style/common';
import { tStyled } from '@/core/style/styled';
import { FontSize, RegularText } from '@/core/symbol/text';
import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { FlexColumn, FlexRow, useWindowLayout } from '@messman/react-common';
import { filterPresets, IArchiveFilter, IArchiveFilterPreset } from 'oftheday-shared';
import * as React from 'react';
import { archiveFilterPresetForDisplay } from './filter-common';

export interface FilterPresetsProps {
	selectedFilter?: IArchiveFilter;
	onClickPreset: (filter: IArchiveFilter) => void;
}

export const FilterPresets: React.FC<FilterPresetsProps> = (props) => {
	const { selectedFilter, onClickPreset } = props;

	const { widthBreakpoint } = useWindowLayout();

	function onClick(filterPreset: IArchiveFilterPreset): () => void {
		return function () {
			onClickPreset(filterPresets[IArchiveFilterPreset[filterPreset] as keyof typeof IArchiveFilterPreset]);
		};
	}

	const allTopPresetButton = (
		<PresetButton
			$isSelected={selectedFilter?.preset === IArchiveFilterPreset.allTop}
			onClick={onClick(IArchiveFilterPreset.allTop)}
		>
			{archiveFilterPresetForDisplay.allTop}
		</PresetButton>
	);

	const randomWeekPresetButton = (
		<PresetButton
			$isSelected={selectedFilter?.preset === IArchiveFilterPreset.random7Days}
			onClick={onClick(IArchiveFilterPreset.random7Days)}
		>
			{archiveFilterPresetForDisplay.random7Days}
		</PresetButton>
	);

	const allMusicPresetButton = (
		<>
			<PresetButton
				$isSelected={selectedFilter?.preset === IArchiveFilterPreset.allMusic}
				onClick={onClick(IArchiveFilterPreset.allMusic)}
			>
				{archiveFilterPresetForDisplay.allMusic}
			</PresetButton>
			<Spacing margin={spacing.small.top} textAlign='center'>
				<RegularText isInline={true} isMaxLineLength={false}>Or <OutLink href='https://google.com'>see the Spotify Playlist</OutLink></RegularText>
			</Spacing>
		</>
	);

	const allVideoPresetButton = (
		<>
			<PresetButton
				$isSelected={selectedFilter?.preset === IArchiveFilterPreset.allVideo}
				onClick={onClick(IArchiveFilterPreset.allVideo)}
			>
				{archiveFilterPresetForDisplay.allVideo}
			</PresetButton>
			<Spacing margin={spacing.small.top}>
				<RegularText isInline={true} isMaxLineLength={false}>Or <OutLink href='https://google.com'>see the YouTube Playlist</OutLink></RegularText>
			</Spacing>
		</>
	);

	if (widthBreakpoint >= LayoutBreakpoint.mobileLarge) {
		return (
			<FlexRow justifyContent='space-evenly' flex='none'>
				<VerticalPresetButtonContainer flex='none'>
					{allTopPresetButton}
					{allMusicPresetButton}
				</VerticalPresetButtonContainer>
				<VerticalPresetButtonContainer flex='none'>
					{randomWeekPresetButton}
					{allVideoPresetButton}
				</VerticalPresetButtonContainer>
			</FlexRow>
		);
	}

	return (
		<FlexRow justifyContent='center' flex='none'>
			<VerticalPresetButtonContainer flex='none'>
				{allTopPresetButton}
				{randomWeekPresetButton}
				{allMusicPresetButton}
				{allVideoPresetButton}
			</VerticalPresetButtonContainer>
		</FlexRow>
	);
};

interface PresetButtonProps {
	$isSelected: boolean;
}

const PresetButton = tStyled.div<PresetButtonProps>`
	text-align: center;
	cursor: pointer;
	display: inline-block;
	border: 1px solid ${p => p.$isSelected ? p.theme.color.textAccentOnBackground : p.theme.color.bgComponent3};
	background-color: ${p => p.theme.color.bgComponent2};
	${borderRadiusStyle}
	padding: ${spacing.medium.value} ${spacing.large.value};
	font-size: ${FontSize.textRegular};
	color: ${p => p.$isSelected ? p.theme.color.textAccentOnBackground : p.theme.color.textRegular};
`;

const VerticalPresetButtonContainer = tStyled(FlexColumn)`
	${PresetButton}:not(:first-child) {
		margin-top: ${spacing.large.value};
	}
`;