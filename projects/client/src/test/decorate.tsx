import * as React from 'react';
import { themes, useLocalStorageTheme } from '@/core/style/theme';
import { Providers } from '@/entry/wrapper';
import { select, withKnobs } from '@storybook/addon-knobs';

export interface StoryComponent {
	(): JSX.Element;
	story?: {
		name?: string;
		decorators?: any[];
	};
}

export function decorate(name: string, Component: React.FC) {

	/*
		Some funky stuff is required here.
		Never forget, you spent like 4 hours on this.
	
		See the issues below - it all comes down to how stories are exported with decorators.
		The first made me believe that I should use <Story /> in decorators. That would solve the issue where
		decorators (which supply the contexts) were not being applied.
		But that ends up causing the stories to unmount themselves every time a Knob is clicked, which broke the async promise story testing.
		Solution: wrap each story in another component to create that 'indirect' scenario. Move on with life.
	
		https://github.com/storybookjs/storybook/issues/10296
		https://github.com/storybookjs/storybook/issues/4059
	*/
	const story: React.FC = () => {
		return (
			<Component />
		);
	};

	const decorator = (story: () => JSX.Element) => {
		return (
			<TestWrapper>
				{story()}
			</TestWrapper>
		);
	};

	const storyComponent = story as StoryComponent;
	storyComponent.story = {
		name: name,
		decorators: [decorator, withKnobs]
	};
	return storyComponent;
};

const TestWrapper: React.FC = (props) => {
	return (
		<Providers>
			<InnerTestWrapper>
				{props.children}
			</InnerTestWrapper>
		</Providers>
	);
};

const InnerTestWrapper: React.FC = (props) => {

	const themeOptions: { [key: string]: number; } = {};
	themes.forEach((theme, index) => {
		const name = `${theme.colorName} (${theme.isLightMode ? 'Light' : 'Dark'})`;
		themeOptions[name] = index;
	});

	const [themeIndex, setThemeIndex] = useLocalStorageTheme();

	const selectedThemeIndex = select('Theme', themeOptions, themeIndex, 'Global');

	React.useEffect(() => {
		if (themeIndex !== selectedThemeIndex) {
			setThemeIndex(selectedThemeIndex);
		}
	}, [selectedThemeIndex]);

	return <>{props.children}</>;
};