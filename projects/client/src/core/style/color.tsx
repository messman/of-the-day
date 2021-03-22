export interface ColorAccentSet {
	/** Darker version of the accent main color. */
	bDark: string;
	/** The accent main color. */
	aMain: string;
	/** Lighter version of the accent main color. */
	cLight: string;
	/** Subtle version of the accent main color. */
	dSubtle: string;
	/** Gradient. */
	eGradient: string;
}

export interface ColorSet {
	/* 1/5: Darkest version of the color set. Typically the 'true' color. */
	a0Darkest: string;
	/* 2/5: Darker version of the color set. */
	b1Darker: string;
	/* 3/5: Middle version of the color set. */
	c2Middle: string;
	/* 4/5: Lighter version of the color set. */
	d3Lighter: string;
	/* 5/5: Lightest version of the color set. */
	e4Lightest: string;
}

export interface ColorElevationSet {
	/* Inset, for inputs. **/
	inset: string;
	/** 1/7: Background-level. */
	a0Background: string;
	/** 2/7: Cards and pressed buttons. */
	b1Card: string;
	/** 3/7: Buttons (default). */
	c2Button: string;
	/** 4/7: Navigation. */
	d3Nav: string;
	/** 5/7: Hover for buttons and cards. */
	e4Hover: string;
	/** 6/7: Pickers. */
	f5Picker: string;
	/** 7/7: Modals. */
	g6Overlay: string;
}

export interface SystemColors {
	/** For the 'top' tag. */
	tagTop: string;
	/** For the 'NSFW' tag. */
	tagNSFW: string;
	/** For selections. */
	selection: string;
	/** For warnings. */
	warning: string;
	/** For errors. */
	error: string;
	/** For success, like checkmarks. */
	success: string;
}

export interface Colors {
	accent: {
		purple: ColorAccentSet;
		yellow: ColorAccentSet;
		red: ColorAccentSet;
	};

	light: ColorSet;
	dark: ColorSet;

	system: {
		light: SystemColors;
		dark: SystemColors;
	};

	elevation: {
		lightFill: ColorElevationSet;
		lightShadow: ColorElevationSet;
		lightShadowBase: string;
		darkFill: ColorElevationSet;
		darkShadow: ColorElevationSet;
		darkShadowBase: string;
	};
}

export const colors: Colors = {
	accent: {
		purple: {
			aMain: '#5955D1',
			bDark: '#4744A7',
			cLight: '#7875E1',
			dSubtle: '#BBB9F3',
			eGradient: 'linear-gradient(134deg, #6551C7 0%, #5955D1 39%, #5955D1 58%, #3948BA 100%)'
		},
		yellow: {
			aMain: '#FFCD67',
			bDark: '#D2A4A1',
			cLight: '#FFD885',
			dSubtle: '#FFEBC0',
			eGradient: 'linear-gradient(-45deg, #CD9240 0%, #F5B83D 38%, #F5B83D 65%, #F8CF7C 100%)'
		},
		red: {
			aMain: '#CB697A',
			bDark: '#BB4964',
			cLight: '#DD819C',
			dSubtle: '#EEC0D0',
			eGradient: 'linear-gradient(135deg, #E078A4 0%, #CB697A 37%, #CB697A 65%, #DA5856 100%)'
		}
	},
	light: {
		a0Darkest: '#D3D4D9',
		b1Darker: '#E6E6E9',
		c2Middle: '#F3F3F4',
		d3Lighter: '#F9F9F9',
		e4Lightest: '#FFFFFF',
	},
	dark: {
		a0Darkest: '#202024',
		b1Darker: '#26262B',
		c2Middle: '#2F2F36',
		d3Lighter: '#5D5D68',
		e4Lightest: '#9495A0',
	},
	system: {
		light: {
			error: '#A63446',
			warning: '#DC965A',
			success: '#4B7F52',
			selection: '#55D170',
			tagNSFW: '#A63446',
			tagTop: '#FFC03D'
		},
		dark: {
			error: '#A63446',
			warning: '#DC965A',
			success: '#4B7F52',
			selection: '#55D170',
			tagNSFW: '#A63446',
			tagTop: '#CE9f3C'
		}
	},

	elevation: {
		lightFill: {
			a0Background: '#FFFFFF',
			b1Card: '#FFFFFF',
			c2Button: '#FFFFFF',
			d3Nav: '#FFFFFF',
			e4Hover: '#FFFFFF',
			f5Picker: '#FFFFFF',
			g6Overlay: '#FFFFFF',
			inset: '#FFFFFF',
		},
		lightShadow: {
			a0Background: 'none',
			b1Card: '0 0 1px 0 rgba(40,41,61,0.08), 0 0 2px 0 rgba(96,97,112,0.16)',
			c2Button: '0 0 1px 0 rgba(40,41,61,0.04), 0 2px 4px 0 rgba(96,97,112,0.16)',
			d3Nav: '0 0 2px 0 rgba(40,41,61,0.04), 0 4px 8px 0 rgba(96,97,112,0.16)',
			e4Hover: '0 2px 4px 0 rgba(40,41,61,0.04), 0 8px 16px 0 rgba(96,97,112,0.16)',
			f5Picker: '0 2px 8px 0 rgba(40,41,61,0.04), 0 16px 24px 0 rgba(96,97,112,0.16)',
			g6Overlay: '0 2px 8px 0 rgba(40,41,61,0.08), 0 20px 32px 0 rgba(96,97,112,0.24)',
			inset: 'inset 0 0 4px 0 rgba(96,97,112,0.32)',
		},
		lightShadowBase: 'rgba(40,41,61,0.04)',
		darkFill: {
			a0Background: '#2E2E38',
			b1Card: '#30303B',
			c2Button: '#33333E',
			d3Nav: '#353540',
			e4Hover: '#373743',
			f5Picker: '#3A3A46',
			g6Overlay: '#3C3C49',
			inset: '#2A2B37',
		},
		darkShadow: {
			a0Background: 'none',
			b1Card: '0 0 1px 0 rgba(40,41,61,0.08), 0 1px 2px 0 rgba(0,0,0,0.32)',
			c2Button: '0 0 1px 0 rgba(0,0,0,0.04), 0 2px 4px 0 rgba(0,0,0,0.32)',
			d3Nav: '0 0 2px 0 rgba(0,0,0,0.04), 0 4px 8px 0 rgba(0,0,0,0.32)',
			e4Hover: '0 2px 4px 0 rgba(0,0,0,0.04), 0 8px 16px 0 rgba(0,0,0,0.32)',
			f5Picker: '0 2px 8px 0 rgba(0,0,0,0.04), 0 16px 24px 0 rgba(0,0,0,0.32)',
			g6Overlay: '0 2px 8px 0 rgba(0,0,0,0.08), 0 20px 32px 0 rgba(0,0,0,0.32)',
			inset: 'inset 0 0 4px 0 rgba(0,0,0,0.32)',
		},
		darkShadowBase: 'rgba(0,0,0,0.04)',
	}
};