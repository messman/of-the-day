export interface ColorAccentSet {
	/** The accent main color. */
	aMain: string;
	/** Darker version of the accent main color. */
	bDark: string;
	/** Lighter version of the accent main color. */
	cLight: string;
	/** Gradient. */
	gradient: string;
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

	outlineDistinct: string;
	outlineSubtle: string;
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
	tagTopFore: string;
	/** For the 'top' tag. */
	tagTopBack: string;
	/** For the 'NSFW' tag. */
	tagNSFWFore: string;
	/** For the 'NSFW' tag. */
	tagNSFWBack: string;
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
		//red: ColorAccentSet;
	};

	light: ColorSet;
	dark: ColorSet;

	system: SystemColors;

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
			aMain: '#6966CE',
			bDark: '#4A48AB',
			cLight: '#8683EC',
			gradient: 'linear-gradient(-45deg, #8566CE 0%, #6966CE 42%, #6966CE 62%, #6680CE 100%)'
		},
		yellow: {
			aMain: '#F5B83D',
			bDark: '#F1AC22',
			cLight: '#FFCC65',
			gradient: 'linear-gradient(-45deg, #CD9240 0%, #F5B83D 38%, #F5B83D 65%, #F8CF7C 100%)'
		},
	},
	light: {
		a0Darkest: '#D3D4D9',
		b1Darker: '#E6E6E9',
		c2Middle: '#F3F3F4',
		d3Lighter: '#F9F9F9',
		e4Lightest: '#FFFFFF',
		outlineDistinct: '#D3D4D9',
		outlineSubtle: '#E6E6E9'
	},
	dark: {
		a0Darkest: '#1B1B1D',
		b1Darker: '#29292E',
		c2Middle: '#29292E',
		d3Lighter: '#5D5D65',
		e4Lightest: '#9898A0',
		outlineDistinct: '#46464E',
		outlineSubtle: '#3A3A41'
	},
	system: {
		error: '#A63446',
		warning: '#DC965A',
		success: '#4B7F52',
		selection: '#55D170',
		tagNSFWFore: '#FFFFFF',
		tagNSFWBack: '#A63446',
		tagTopFore: '#1B1B1D',
		tagTopBack: '#FFC03D'
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
			a0Background: '#29292E',
			b1Card: '#29292E',
			c2Button: '#2B2B31',
			d3Nav: '#2B2B31',
			e4Hover: '#2E2E33',
			f5Picker: '#2E2E33',
			g6Overlay: '#303036',
			inset: '#26262C',
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