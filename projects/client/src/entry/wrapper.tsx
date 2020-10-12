import * as React from 'react';
import { InvalidCheck } from '@/areas/alert/invalid';
import { ThemeProvider } from '@/core/style/theme';
import { DataProvider } from '@/services/data/data-context';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import { WindowLayoutProvider, WindowDimensionsProvider, FlexRoot, DocumentVisibilityProvider } from '@messman/react-common';
import { FontSizeManager } from '@/core/symbol/text';
import { lowerBreakpoints } from '@/services/layout/window-layout';
import { Popup, PopupProvider } from '@/services/data/data-error';
import { OverlayPortalRoot } from '@/core/overlay/overlay';

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
				<OverlayPortalRoot>
					<WindowDimensionsProvider>
						<WindowLayoutProvider lowerBreakpoints={lowerBreakpoints}>
							<FontSizeManager>
								<PopupProvider>
									<DataProvider>
										{props.children}
									</DataProvider>
								</PopupProvider>
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
				<Popup>
					{props.children}
				</Popup>
			</InvalidCheck>
		</FlexRoot>
	);
};