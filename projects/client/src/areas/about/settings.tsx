import { Card, CardPadding } from '@/core/card/card';
import { Block, Spacing } from '@/core/layout/common';
import { borderRadiusStyle } from '@/core/style/common';
import { tStyled } from '@/core/style/styled';
import { Theme, themes, useLocalStorageTheme } from '@/core/style/theme';
import { iconTypes } from '@/core/symbol/icon';
import { LeadText } from '@/core/symbol/text';
import { FlexRow } from '@messman/react-common';
import * as React from 'react';

export const Settings: React.FC = () => {
	return (
		<Card title='Settings' icon={iconTypes.gear}>
			<CardPadding>
				<LeadText>Theme</LeadText>
				<Block.Dog16 />
				<ThemeControl />
			</CardPadding>
		</Card>
	);
};

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

	const darkThemes = themeOptions.filter((option) => {
		return !option.theme.themeInfo.isLight;
	});
	const lightThemes = themeOptions.filter((option) => {
		return option.theme.themeInfo.isLight;
	});

	const [themeIndex, setThemeIndex] = useLocalStorageTheme();

	return (
		<div>
			<ThemeControlRow activeThemeIndex={themeIndex} setActiveThemeIndex={setThemeIndex} themeOptions={darkThemes} />
			<Block.Dog16 />
			<ThemeControlRow activeThemeIndex={themeIndex} setActiveThemeIndex={setThemeIndex} themeOptions={lightThemes} />
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
	padding: ${Spacing.bat08};
	background-color: ${p => p.isChosen ? p.theme.system.selection : p.theme.outlineDistinct};
	${borderRadiusStyle}

	cursor: pointer;

	& + & {
		margin-left: ${Spacing.dog16};
	}
`;

const ThemeControlBackgroundSquare = tStyled.div<ThemeControlChoicePieceProps>`
	padding: ${Spacing.dog16};
	background-color: ${p => p.choiceTheme.bg};
	box-shadow: ${p => p.theme.shadow.c2Button};
	${borderRadiusStyle}
`;

const ThemeControlAccentCircle = tStyled.div<ThemeControlChoicePieceProps>`
	width: ${Spacing.fan32};
	height: ${Spacing.fan32};
	border-radius: 50%;
	background: ${p => p.choiceTheme.accent.eGradient};
`;