import * as React from 'react';
import { InvalidCheck } from '@/areas/alert/invalid';
import { ThemeProvider } from '@/core/style/theme';
import { DataProvider } from '@/services/data/data-context';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import { WindowLayoutProvider, WindowDimensionsProvider, FlexRoot, DocumentVisibilityProvider } from '@messman/react-common';
import { FontSizeManager } from '@/core/symbol/text';
import { lowerBreakpoints } from '@/services/layout/window-layout';
import { OverlayPortalRoot } from '@/core/overlay/overlay';
import { ElementActionsProvider } from '@/areas/posts/element-action-overlay';

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
				<InvalidCheck error={null}>
					{props.children}
				</InvalidCheck>
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
				<OverlayPortalRoot>
					<WindowDimensionsProvider>
						<WindowLayoutProvider lowerBreakpoints={lowerBreakpoints}>
							<FontSizeManager>
								<DataProvider>
									<ElementActionsProvider>
										{props.children}
									</ElementActionsProvider>
								</DataProvider>
							</FontSizeManager>
						</WindowLayoutProvider>
					</WindowDimensionsProvider>
				</OverlayPortalRoot>
			</ThemeProvider>
		</DocumentVisibilityProvider>
	);
};

const UI: React.FC = (props) => {
	return (
		<FlexRoot flexDirection='column'>
			<InvalidCheck error={null}>
				{props.children}
			</InvalidCheck>
		</FlexRoot>
	);
};