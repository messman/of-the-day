export interface Route {
	name: string,
	path: string;
}

export const routes = {
	posts: {
		name: 'Week',
		path: '/'
	},
	other: {
		name: 'Info',
		path: '/info'
	},
	archive: {
		name: 'Archive',
		path: '/archive'
	},
	about: {
		name: 'About',
		path: '/about'
	}
};