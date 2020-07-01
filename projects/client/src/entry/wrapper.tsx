import * as React from 'react';
import { InvalidCheck } from '@/areas/alert/invalid';
import { Popup, PopupProvider } from '@/areas/alert/popup';
import { FlexRoot } from '@/core/layout/flex';
import { ThemeProvider } from '@/core/style/theme';
import { AllResponseProvider } from '@/services/data/data';
import { defaultLowerBreakpoints, LayoutInfoProvider } from '@/services/layout/layout-info';
import { WindowDimensionsProvider } from '@/services/layout/window-dimensions';
import { DEFINE } from '@/services/define';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';

export const Wrapper: React.FC = (props) => {
	return (
		<Providers>
			<UI>
				{props.children}
			</UI>
		</Providers>
	);
};

const Providers: React.FC = (props) => {

	const Router: React.ElementType = DEFINE.isStorybook ? MemoryRouter : BrowserRouter;

	return (
		<Router>
			<ThemeProvider>
				<WindowDimensionsProvider>
					<LayoutInfoProvider lowerBreakpoints={defaultLowerBreakpoints}>
						<AllResponseProvider>
							<PopupProvider>
								{props.children}
							</PopupProvider>
						</AllResponseProvider>
					</LayoutInfoProvider>
				</WindowDimensionsProvider>
			</ThemeProvider>
		</Router>
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