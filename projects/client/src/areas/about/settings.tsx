import { Block, Spacing } from '@/core/layout/common';
import { borderRadiusStyle } from '@/core/style/common';
import { tStyled } from '@/core/style/styled';
import { Theme, themes, useCurrentTheme, useLocalStorageTheme } from '@/core/style/theme';
import { IconSize, iconTypes, SizedIcon } from '@/core/symbol/icon';
import { Heading3, Paragraph } from '@/core/symbol/text';
import { FlexRow } from '@messman/react-common';
import * as React from 'react';

export const Settings: React.FC = () => {
	return (
		<SettingsSectionContainer>
			<FlexRow justifyContent='space-between' alignItems='center'>
				<Heading3>Theme</Heading3>
				<SizedIcon type={iconTypes.gear} size={IconSize.b_large} />
			</FlexRow>
			<Block.Bat08 />
			<ThemeControl />
		</SettingsSectionContainer>
	);
};

const SettingsSectionContainer = tStyled.div`
	border: 1px solid ${p => p.theme.outlineDistinct};
	${borderRadiusStyle}
	padding: ${Spacing.dog16};
`;

interface ThemeControlOption {
	theme: Theme;
	index: number;
}

const themeOptions = themes.map<ThemeControlOption>((theme, i) => {
	return {
		theme: theme,
		index: i
	};
});

const ThemeControl: React.FC = () => {
	const [themeIndex, setThemeIndex] = useLocalStorageTheme();
	const theme = useCurrentTheme();
	return (
		<div>
			<Paragraph>{theme.themeInfo.fullName}</Paragraph>
			<ThemeControlRow activeThemeIndex={themeIndex} setActiveThemeIndex={setThemeIndex} themeOptions={themeOptions} />
		</div>
	);
};

interface ThemeControlRowProps {
	setActiveThemeIndex: (index: number) => void;
	activeThemeIndex: number;
	themeOptions: ThemeControlOption[];
}

const ThemeControlRow: React.FC<ThemeControlRowProps> = (props) => {

	const { activeThemeIndex, themeOptions, setActiveThemeIndex } = props;

	const themesRender = themeOptions.map((option) => {

		function onClick() {
			setActiveThemeIndex(option.index);
		}

		return (
			<ThemeControlChoice
				key={option.index}
				choiceTheme={option.theme}
				isChosen={option.index === activeThemeIndex}
				onChooseTheme={onClick}
			/>
		);
	});

	return (
		<FlexRow>
			{themesRender}
		</FlexRow>
	);
};

interface ThemeControlChoiceProps {
	onChooseTheme: () => void;
	choiceTheme: Theme;
	isChosen: boolean;
}

const ThemeControlChoice: React.FC<ThemeControlChoiceProps> = (props) => {

	const { onChooseTheme, ...otherProps } = props;
	const { choiceTheme } = otherProps;
	const { accentColor, isLight } = choiceTheme.themeInfo;
	const choiceName = `${accentColor}, ${isLight ? 'Light' : 'Dark'}`;

	return (
		<ThemeControlChosenSquare onClick={onChooseTheme} title={choiceName} {...otherProps}>
			<ThemeControlBackgroundSquare {...otherProps}>
				<ThemeControlAccentCircle {...otherProps} />
			</ThemeControlBackgroundSquare>
		</ThemeControlChosenSquare>
	);
};

interface ThemeControlChoicePieceProps extends Omit<ThemeControlChoiceProps, 'onChooseTheme'> {
}

const ThemeControlChosenSquare = tStyled.div<ThemeControlChoicePieceProps>`
	flex: none;
	padding: ${Spacing.ant04};
	background-color: ${p => p.isChosen ? p.theme.system.selection : p.theme.outlineDistinct};
	${borderRadiusStyle}

	cursor: pointer;

	& + & {
		margin-left: ${Spacing.cat12};
	}
`;

const ThemeControlBackgroundSquare = tStyled.div<ThemeControlChoicePieceProps>`
	padding: ${Spacing.bat08};
	background-color: ${p => p.choiceTheme.bg};
	box-shadow: ${p => p.theme.shadow.c2Button};
	${borderRadiusStyle}
`;

const ThemeControlAccentCircle = tStyled.div<ThemeControlChoicePieceProps>`
	width: ${Spacing.elf24};
	height: ${Spacing.elf24};
	border-radius: 50%;
	background: ${p => p.choiceTheme.accent.eGradient};
`;