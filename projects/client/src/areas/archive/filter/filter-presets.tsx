import { Button } from '@/core/form/button/button';
import { spacing } from '@/core/layout/common';
import { tStyled } from '@/core/style/styled';
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
		<ButtonsContainer>
			<Button
				isSelected={selectedFilter?.preset === IArchiveFilterPreset.allTop}
				onClick={onClick(IArchiveFilterPreset.allTop)}
			>
				{archiveFilterPresetForDisplay.allTop}
			</Button>
			<Button
				isSelected={selectedFilter?.preset === IArchiveFilterPreset.random7Days}
				onClick={onClick(IArchiveFilterPreset.random7Days)}
			>
				{archiveFilterPresetForDisplay.random7Days}
			</Button>
			<Button
				isSelected={selectedFilter?.preset === IArchiveFilterPreset.allMusic}
				onClick={onClick(IArchiveFilterPreset.allMusic)}
			>
				{archiveFilterPresetForDisplay.allMusic}
			</Button>
			<Button
				isSelected={selectedFilter?.preset === IArchiveFilterPreset.allVideo}
				onClick={onClick(IArchiveFilterPreset.allVideo)}
			>
				{archiveFilterPresetForDisplay.allVideo}
			</Button>
		</ButtonsContainer>
	);
};

const ButtonsContainer = tStyled.div`
	button + button {
		margin-top: ${spacing.medium.value};
	}
`;