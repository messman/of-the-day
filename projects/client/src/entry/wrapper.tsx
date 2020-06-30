import * as React from 'react';
import { InvalidCheck } from '@/areas/alert/invalid';
import { Popup, PopupProvider } from '@/areas/alert/popup';
import { FlexRoot } from '@/core/layout/flex';
import { ThemeProvider } from '@/core/style/theme';
import { AllResponseProvider } from '@/services/data/data';
import { defaultLowerBreakpoints, LayoutInfoProvider } from '@/services/layout/layout-info';
import { WindowDimensionsProvider } from '@/services/layout/window-dimensions';

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
	return (
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