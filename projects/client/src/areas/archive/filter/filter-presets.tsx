import { spacing } from '@/core/layout/common';
import { borderRadiusStyle } from '@/core/style/common';
import { tStyled } from '@/core/style/styled';
import { FontSize } from '@/core/symbol/text';
import { filterPresets, IArchiveFilter, IArchiveFilterPreset } from 'oftheday-shared';
import * as React from 'react';
import { archiveFilterPresetForDisplay } from './filter-common';

export interface FilterPresetsProps {
	selectedFilter?: IArchiveFilter;
	onClickPreset: (filter: IArchiveFilter) => void;
}

export const FilterPresets: React.FC<FilterPresetsProps> = (props) => {
	const { selectedFilter, onClickPreset } = props;

	function onClick(filterPreset: IArchiveFilterPreset): () => void {
		return function () {
			onClickPreset(filterPresets[IArchiveFilterPreset[filterPreset] as keyof typeof IArchiveFilterPreset]);
		};
	}

	return (
		<>
			<PresetButton
				$isSelected={selectedFilter?.preset === IArchiveFilterPreset.allTop}
				onClick={onClick(IArchiveFilterPreset.allTop)}
			>
				{archiveFilterPresetForDisplay.allTop}
			</PresetButton>
			<PresetButton
				$isSelected={selectedFilter?.preset === IArchiveFilterPreset.random7Days}
				onClick={onClick(IArchiveFilterPreset.random7Days)}
			>
				{archiveFilterPresetForDisplay.random7Days}
			</PresetButton>
			<PresetButton
				$isSelected={selectedFilter?.preset === IArchiveFilterPreset.allMusic}
				onClick={onClick(IArchiveFilterPreset.allMusic)}
			>
				{archiveFilterPresetForDisplay.allMusic}
			</PresetButton>
			<PresetButton
				$isSelected={selectedFilter?.preset === IArchiveFilterPreset.allVideo}
				onClick={onClick(IArchiveFilterPreset.allVideo)}
			>
				{archiveFilterPresetForDisplay.allVideo}
			</PresetButton>
		</>
	);
};

interface PresetButtonProps {
	$isSelected: boolean;
}

const PresetButton = tStyled.div<PresetButtonProps>`
	text-align: center;
	cursor: pointer;
	display: block;
	border: 1px solid ${p => p.$isSelected ? p.theme.color.textAccentOnBackground : p.theme.color.bgComponent3};
	background-color: ${p => p.theme.color.bgComponent2};
	${borderRadiusStyle}
	margin-top: ${spacing.medium.value};
	padding: ${spacing.medium.value} ${spacing.large.value};
	font-size: ${FontSize.textRegular};
	color: ${p => p.$isSelected ? p.theme.color.textAccentOnBackground : p.theme.color.textRegular};
`;
