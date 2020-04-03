interface Wrapper<T> {
	v: T
}

export function keyFactory(namespace: string): (key: string) => string {
	return function getKey(key: string) {
		return `${namespace}_${key}`;
	}
}

export function get<T>(key: string): T {
	try {
		const item = window.localStorage.getItem(key);
		if (item) {
			const wrapped = JSON.parse(item) as Wrapper<T>;
			return wrapped.v;
		}
	} catch (error) {
		console.log(error);
	}
	return null;
}

export function set<T>(key: string, value: T): void {
	try {
		const wrapper: Wrapper<T> = {
			v: value
		};
		window.localStorage.setItem(key, JSON.stringify(wrapper));
	} catch (error) {
		console.log(error);
	}
}