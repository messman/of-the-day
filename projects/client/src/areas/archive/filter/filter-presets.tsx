import { Button } from '@/core/form/button/button';
import { Spacing } from '@/core/layout/common';
import { tStyled } from '@/core/style/styled';
import { filterPresets, IArchiveFilter, IArchiveFilterPreset } from 'oftheday-shared';
import * as React from 'react';
import { archiveFilterPresetForDisplay } from './filter-common';

export interface FilterPresetsProps {
	selectedFilter?: IArchiveFilter;
	onClickPreset: (filter: IArchiveFilter) => void;
}

/**
 * Holds some common buttons for selecting common presets.
 */
export const FilterPresets: React.FC<FilterPresetsProps> = (props) => {
	const { selectedFilter, onClickPreset } = props;

	function onClick(filterPreset: IArchiveFilterPreset): () => void {
		return function () {
			onClickPreset(filterPresets[IArchiveFilterPreset[filterPreset] as keyof typeof IArchiveFilterPreset]);
		};
	}

	return (
		<ButtonsContainer>
			<Button
				isSelected={selectedFilter?.preset === IArchiveFilterPreset.recentTop}
				onClick={onClick(IArchiveFilterPreset.recentTop)}
			>
				{archiveFilterPresetForDisplay.recentTop}
			</Button>
			<Button
				isSelected={selectedFilter?.preset === IArchiveFilterPreset.random7Days}
				onClick={onClick(IArchiveFilterPreset.random7Days)}
			>
				{archiveFilterPresetForDisplay.random7Days}
			</Button>
			<Button
				isSelected={selectedFilter?.preset === IArchiveFilterPreset.recentMusic}
				onClick={onClick(IArchiveFilterPreset.recentMusic)}
			>
				{archiveFilterPresetForDisplay.recentMusic}
			</Button>
			<Button
				isSelected={selectedFilter?.preset === IArchiveFilterPreset.recentVideo}
				onClick={onClick(IArchiveFilterPreset.recentVideo)}
			>
				{archiveFilterPresetForDisplay.recentVideo}
			</Button>
		</ButtonsContainer>
	);
};

const ButtonsContainer = tStyled.div`
	${Button} + ${Button} {
		margin-top: ${Spacing.dog16};
	}
`;