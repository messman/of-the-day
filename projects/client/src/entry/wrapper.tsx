import * as React from 'react';
import { InvalidCheck } from '@/areas/alert/invalid';
import { Popup, PopupProvider } from '@/areas/alert/popup';
import { ThemeProvider } from '@/core/style/theme';
import { PostResponseProvider } from '@/services/data/data';
import { DEFINE } from '@/services/define';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import { WindowLayoutProvider, WindowDimensionsProvider, defaultLowerBreakpoints, FlexRoot, DocumentVisibilityProvider } from '@messman/react-common';
import { FontSizeManager } from '@/core/style/common';

export const Wrapper: React.FC = (props) => {
	return (
		<Providers>
			<UI>
				{props.children}
			</UI>
		</Providers>
	);
};

export const Providers: React.FC = (props) => {

	const Router: React.ElementType = DEFINE.isStorybook ? MemoryRouter : BrowserRouter;

	return (
		<Router>
			<DocumentVisibilityProvider>
				<ThemeProvider>
					<WindowDimensionsProvider>
						<WindowLayoutProvider lowerBreakpoints={defaultLowerBreakpoints}>
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