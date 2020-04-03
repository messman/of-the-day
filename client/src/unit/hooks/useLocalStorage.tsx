import * as React from "react";

interface Wrapper<T> {
	v: T
}

type UseLocalStorageReturn<T> = [T, (value: T) => void];

export function useLocalStorage<T>(key: string, initialValue: T): UseLocalStorageReturn<T> {
	const [storedValue, setStoredValue] = React.useState(() => {
		try {
			const item = window.localStorage.getItem(key);
			if (item) {
				const wrapped = JSON.parse(item) as Wrapper<T>;
				return wrapped.v;
			}
		} catch (error) {
			console.log(error);
		}
		return initialValue;
	});

	function setValue(value: T): void {
		try {
			setStoredValue(value);
			const wrapper: Wrapper<T> = {
				v: value
			};
			window.localStorage.setItem(key, JSON.stringify(wrapper));
		} catch (error) {
			console.log(error);
		}
	};
	return [storedValue, setValue];
}