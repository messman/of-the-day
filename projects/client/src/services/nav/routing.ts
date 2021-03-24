export interface Route {
	name: string,
	path: string;
}

export const routes = {
	posts: {
		name: 'Recent',
		path: '/'
	},
	archive: {
		name: 'Archive',
		path: '/archive'
	},
	about: {
		name: 'About',
		path: '/about'
	},
	aboutYear: {
		name: 'One Year',
		path: '/about/year'
	}
};