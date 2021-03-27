import * as React from 'react';
import { InvalidCheck } from '@/areas/alert/invalid';
import { ThemeProvider } from '@/core/style/theme';
import { DataProvider } from '@/services/data/data-context';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import { WindowMediaLayoutProvider, FlexRoot, DocumentVisibilityProvider } from '@messman/react-common';
import { lowerBreakpoints } from '@/services/layout/window-layout';
import { OverlayPortalRoot } from '@/core/overlay/overlay';
import { ElementActionsProvider } from '@/areas/posts/element-action-overlay';

/*
	Holds all of our providers that pass data down the render tree.
*/

export const Wrapper: React.FC = (props) => {
	return (
		<BrowserRouter>
			<InnerProviders testForceHidden={false}>
				{props.children}
			</InnerProviders>
		</BrowserRouter>
	);
};

export interface TextProvidersProps {
	entry: string | null;
	testForceHidden: boolean;
}

export const TestWrapper: React.FC<TextProvidersProps> = (props) => {
	const { entry, testForceHidden } = props;

	const initialEntries = entry ? [entry] : undefined;
	const initialIndex = entry ? 0 : undefined;
	return (
		<MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
			<InnerProviders testForceHidden={testForceHidden}>
				{props.children}
			</InnerProviders>
		</MemoryRouter>
	);
};

interface InnerProvidersProps {
	testForceHidden: boolean;
}

const InnerProviders: React.FC<InnerProvidersProps> = (props) => {
	return (
		<DocumentVisibilityProvider testForceHidden={props.testForceHidden}>
			<ThemeProvider>
				<OverlayPortalRoot>
					<WindowMediaLayoutProvider lowerBreakpoints={lowerBreakpoints} breakpointUnit='rem'>
						<FlexRoot flexDirection='column'>
							<InvalidCheck error={null}>
								<DataProvider>
									<ElementActionsProvider>
										{props.children}
									</ElementActionsProvider>
								</DataProvider>
							</InvalidCheck>
						</FlexRoot>
					</WindowMediaLayoutProvider>
				</OverlayPortalRoot>
			</ThemeProvider>
		</DocumentVisibilityProvider>
	);
};