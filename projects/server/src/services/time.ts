import { DateTime } from 'luxon';

const zone = 'America/New_York';
export const startDateTime = DateTime.fromISO('2020-03-25', { zone: zone });
export function getDayNumber(): number {
	return Math.floor(DateTime.local().setZone(zone).diff(startDateTime, 'days').days);
}

export function seconds(seconds: number): number {
	return seconds * 1000;
}

export function minutes(minutes: number): number {
	return seconds(minutes * 60);
}