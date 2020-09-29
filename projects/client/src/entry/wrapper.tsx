import * as React from 'react';
import { InvalidCheck } from '@/areas/alert/invalid';
import { Popup, PopupProvider } from '@/areas/alert/popup';
import { ThemeProvider } from '@/core/style/theme';
import { PostResponseProvider } from '@/services/data/data';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import { WindowLayoutProvider, WindowDimensionsProvider, FlexRoot, DocumentVisibilityProvider } from '@messman/react-common';
import { FontSizeManager } from '@/core/symbol/text';
import { lowerBreakpoints } from '@/services/layout/window-layout';

export const Wrapper: React.FC = (props) => {
	return (
		<Providers>
			<UI>
				{props.children}
			</UI>
		</Providers>
	);
};

export interface TextProvidersProps {
	entry?: string;
}

export const TestProviders: React.FC<TextProvidersProps> = (props) => {
	const { entry } = props;

	const initialEntries = entry ? [entry] : undefined;
	const initialIndex = entry ? 0 : undefined;
	return (
		<MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
			<InnerProviders>
				{props.children}
			</InnerProviders>
		</MemoryRouter>
	);
};

const Providers: React.FC = (props) => {
	return (
		<BrowserRouter>
			<InnerProviders>
				{props.children}
			</InnerProviders>
		</BrowserRouter>
	);
};


const InnerProviders: React.FC = (props) => {

	return (
		<DocumentVisibilityProvider>
			<ThemeProvider>
				<WindowDimensionsProvider>
					<WindowLayoutProvider lowerBreakpoints={lowerBreakpoints}>
						<FontSizeManager>
							<PopupProvider>
								<PostResponseProvider>
									{props.children}
								</PostResponseProvider>
							</PopupProvider>
						</FontSizeManager>
					</WindowLayoutProvider>
				</WindowDimensionsProvider>
			</ThemeProvider>
		</DocumentVisibilityProvider>
	);
};

const UI: React.FC = (props) => {
	return (
		<FlexRoot flexDirection='column'>
			<InvalidCheck error={null}>
				<Popup>
					{props.children}
				</Popup>
			</InvalidCheck>
		</FlexRoot>
	);
};