import { Card, CardPadding } from '@/core/card/card';
import { Spacing, spacing, TopMargin } from '@/core/layout/common';
import { borderRadiusStyle } from '@/core/style/common';
import { tStyled } from '@/core/style/styled';
import { Theme, themes, useLocalStorageTheme } from '@/core/style/theme';
import { iconTypes } from '@/core/symbol/icon';
import { Heading3 } from '@/core/symbol/text';
import { FlexRow } from '@messman/react-common';
import * as React from 'react';

export const Settings: React.FC = () => {
	return (
		<Card title='Settings' icon={iconTypes.gear}>
			<CardPadding>
				<Heading3>Theme</Heading3>
				<TopMargin.Medium>
					<ThemeControl />
				</TopMargin.Medium>
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
		return !option.theme.isLightMode;
	});
	const lightThemes = themeOptions.filter((option) => {
		return option.theme.isLightMode;
	});

	const [themeIndex, setThemeIndex] = useLocalStorageTheme();

	return (
		<div>
			<Spacing margin={spacing.medium.bottom}>
				<ThemeControlRow activeThemeIndex={themeIndex} setActiveThemeIndex={setThemeIndex} themeOptions={darkThemes} />
			</Spacing>
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
	const choiceName = `${choiceTheme.colorName}, ${choiceTheme.isLightMode ? 'Light' : 'Dark'}`;

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
	padding: ${spacing.small.value};
	background-color: ${p => p.isChosen ? p.theme.color.settingsSelection : p.theme.color.bgComponent3};
	${borderRadiusStyle}

	cursor: pointer;

	& + & {
		margin-left: ${spacing.medium.value};
	}
`;

const ThemeControlBackgroundSquare = tStyled.div<ThemeControlChoicePieceProps>`
	padding: ${spacing.medium.value};
	background-color: ${p => p.choiceTheme.color.bg1};
	box-shadow: 0 2px 8px 0 ${p => p.theme.color.bgComponentShadow1};
	${borderRadiusStyle}
`;

const ThemeControlAccentCircle = tStyled.div<ThemeControlChoicePieceProps>`
	width: calc(${spacing.medium.value} * 2);
	height: calc(${spacing.medium.value} * 2);
	border-radius: 50%;
	background: ${p => p.choiceTheme.color.accentGradient};
`;