import * as React from 'react';
import { themes, useLocalStorageTheme } from '@/core/style/theme';
import * as Cosmos from 'react-cosmos/fixture';
import { tStyled } from '@/core/style/styled';
import { TestWrapper } from '@/entry/wrapper';
import { IPost, IPostDayReference, keysOfIPostDayReference } from 'oftheday-shared';
import { PostElementProps } from '@/areas/posts/card/card';

export function wrap(routerEntry: string | null, Component: React.FC): React.FC {
	return () => {

		const forceHidden = useValue('Global - Hidden', false);

		return (
			<TestWrapper entry={routerEntry} testForceHidden={forceHidden}>
				<InnerTestWrapper>
					<ScrollContainer>
						<Component />
					</ScrollContainer>
				</InnerTestWrapper>
			</TestWrapper>
		);
	};
}

const ScrollContainer = tStyled.div`
	overflow-y: auto;
`;

const themeOptions: { [key: string]: number; } = {};
themes.forEach((theme, index) => {
	themeOptions[theme.themeInfo.fullName] = index;
});

const InnerTestWrapper: React.FC = (props) => {

	const localStorageThemeProvider = useLocalStorageTheme();
	const [themeIndex, setThemeIndex] = localStorageThemeProvider;
	const [selectedThemeName] = Cosmos.useSelect('Global - Theme', { options: Object.keys(themeOptions) });
	const selectedThemeIndex = themeOptions[selectedThemeName];

	React.useEffect(() => {
		if (themeIndex !== selectedThemeIndex) {
			setThemeIndex(selectedThemeIndex);
		}
	}, [selectedThemeIndex]);

	return (
		<>{props.children}</>
	);
};

export interface TestButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {

}

export const TestButton: React.FC<TestButtonProps> = (props) => {
	return (
		<InnerTestButton {...props} />
	);
};

const InnerTestButton = tStyled.button`
	display: block;
	border-radius: .5rem;
	background-color: ${p => p.theme.subtleFill.c2Button};
	color: ${p => p.theme.textDistinct};
	border: 1px solid ${p => p.theme.textDistinct};
	cursor: pointer;
	padding: .5rem 1.5rem;
	margin: .5rem;

	:hover {
		background-color: ${p => p.theme.subtleFill.e4Hover};
		border-color: blue;
	}
	:active {
		background-color: ${p => p.theme.subtleFill.b1Card};
	}
`;

export function useTestButton(title: string, onClick: () => void): JSX.Element {
	return <TestButton onClick={onClick}>{title}</TestButton>;
}

export type ButtonSetDefinition = { [key: string]: () => void; };

export function useTestButtons(buttonSetDefinition: ButtonSetDefinition): JSX.Element {

	const keys = Object.keys(buttonSetDefinition);
	const buttons = keys.map<JSX.Element>((key) => {
		const value = buttonSetDefinition[key];
		return <TestButton key={key} onClick={value}>{key}</TestButton>;
	});

	return (
		<InnerTestButtonSet>
			{buttons}
		</InnerTestButtonSet>
	);
}

const InnerTestButtonSet = tStyled.div`
	display: flex;
	flex-direction: flex-start;
	flex-wrap: wrap;
	margin: .5rem;
`;

export function useValue<T>(title: string, defaultValue: T): T {
	const [value] = Cosmos.useValue(title, { defaultValue: defaultValue as unknown as any });
	return value as T;
}

export function useSelect<T>(title: string, dictionary: { [key: string]: T; }): [string, T] {
	const [key] = Cosmos.useSelect(title, { options: Object.keys(dictionary) });
	return [key, dictionary[key]];
}

export function useSelectArray(title: string, options: string[]): string {
	const [key] = Cosmos.useSelect(title, { options: options });
	return key;
}

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
	dayReference: IPostDayReference.future,
	isDayOff: false,
	dayOffMessage: '',
};

const defaultPosts: Record<keyof typeof IPostDayReference, IPost> = {
	future: defaultPost,
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
	const dayReferenceKey = useSelectArray('Day Reference', keysOfIPostDayReference);
	const selectedPost = defaultPosts[dayReferenceKey as keyof typeof IPostDayReference];

	return {
		post: wrapForPost(post || selectedPost, extra),
		isOfSameElement: useValue('Is Same Element', false),
		isForArchive: useValue('Is For Archive', false),
		isShowingEmbeddedByDefault: useValue('Is Showing Embedded By Default', false),
	};
}

export function useTextParagraph(name: string, defaultValue: string): string[] {
	const input = useValue(name, defaultValue);
	return input.split(' /// ');
}