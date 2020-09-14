import { addParameters } from '@storybook/react';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

/*
	Default Viewports:
	- Small mobile = 320 x 568
	- Large mobile = 414 x 896
	- Tablet = 834 x 1112
*/

const customViewports = {
	iPhone8Plus: {
		name: 'iPhone 8 Plus',
		styles: {
			width: '414px',
			height: '736px',
		},
	},
	iPhoneX: {
		name: 'iPhone X',
		styles: {
			width: '375px',
			height: '812px',
		},
	},
	mobileLarge: {
		name: 'Mobile Large Layout',
		styles: {
			width: '600px',
			height: '812px',
		}
	},
	iPadPro: {
		name: 'iPad Pro',
		styles: {
			width: '1024px',
			height: '1366px',
		}
	}
};

addParameters({
	options: {
		showRoots: true,
	},
	viewport: {
		viewports: {
			...MINIMAL_VIEWPORTS,
			...customViewports,
		},
	}
});