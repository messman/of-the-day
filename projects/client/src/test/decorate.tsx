import * as React from 'react';
import { themes, useLocalStorageTheme } from '@/core/style/theme';
import { TestWrapper } from '@/entry/wrapper';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { tStyled } from '@/core/style/styled';
import { IPost, IPostDayReference, keysOfIPostDayReference } from 'oftheday-shared';
import { PostElementProps } from '@/areas/posts/card/card';

export interface StoryComponent {
	(): JSX.Element;
	story?: {
		name?: string;
		decorators?: any[];
	};
}

export function decorate(name: string, entry: string | null, Component: React.FC) {

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
			<TestWrapper entry={entry || undefined}>
				<InnerTestWrapper>
					{story()}
				</InnerTestWrapper>
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

const InnerTestWrapper: React.FC = (props) => {

	const themeOptions: { [key: string]: number; } = {};
	themes.forEach((theme, index) => {
		const name = `${theme.themeInfo.accentColor} (${theme.themeInfo.isLight ? 'Light' : 'Dark'})`;
		themeOptions[name] = index;
	});

	const [themeIndex, setThemeIndex] = useLocalStorageTheme();

	const selectedThemeIndex = select('Theme', themeOptions, themeIndex, 'Global');

	React.useEffect(() => {
		if (themeIndex !== selectedThemeIndex) {
			setThemeIndex(selectedThemeIndex);
		}
	}, [selectedThemeIndex]);

	return (
		<ScrollContainer>
			{props.children}
		</ScrollContainer>
	);
};

const ScrollContainer = tStyled.div`
	overflow-y: auto;
`;

export function wrapForPost(post: IPost, extra: Partial<IPost>): IPost {
	return {
		...post,
		...extra
	};
}

const defaultPost: IPost = {
	date: '03/26/2021',
	dateText: 'Fri, Mar 26',
	dayNumber: 366,
	dayReference: IPostDayReference.tomorrow,
	isDayOff: false,
	dayOffMessage: '',
};

const defaultPosts: Record<keyof typeof IPostDayReference, IPost> = {
	tomorrow: defaultPost,
	today: {
		date: '03/25/2021',
		dateText: 'Thu, Mar 25',
		dayNumber: 365,
		dayReference: IPostDayReference.today,
		isDayOff: false,
		dayOffMessage: '',
	},
	yesterday: {
		date: '03/24/2021',
		dateText: 'Wed, Mar 24',
		dayNumber: 364,
		dayReference: IPostDayReference.yesterday,
		isDayOff: false,
		dayOffMessage: '',
	},
	other: {
		date: '03/22/2021',
		dateText: 'Mon, Mar 22',
		dayNumber: 362,
		dayReference: IPostDayReference.other,
		isDayOff: false,
		dayOffMessage: '',
	}
};

export function usePostControl(post: IPost | null, extra: Partial<IPost>): PostElementProps {
	const dayReferenceKey = select('Day Reference', keysOfIPostDayReference, keysOfIPostDayReference[0]);
	const selectedPost = defaultPosts[dayReferenceKey];

	return {
		post: wrapForPost(post || selectedPost, extra),
		isOfSameElement: boolean('Is Same Element', false),
		isForArchive: boolean('Is For Archive', false),
	};
}