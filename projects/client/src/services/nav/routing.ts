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
	account: {
		name: 'You',
		path: '/account'
	},
	about: {
		name: 'About',
		path: '/about'
	}
};