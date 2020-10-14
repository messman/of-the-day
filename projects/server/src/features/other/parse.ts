
import { stringAt, tryParseFloat, tryParseInt } from '../../services/primitives';
import { createCell, rowsFrom } from '../../services/google-sheets/cell';
import { IOther, IOtherCount } from 'oftheday-shared';
import { notNull } from '../../services/util';

const otherValueRowStart = 2;
const otherValueRowStop = 9;
/** The range of our key-value responses. */
export const otherValueRange = createCell('Read_Other', 'B', otherValueRowStart).toRange('B', otherValueRowStop);

const otherChecklistRowStart = 3;
const otherChecklistRowStop = 13;
/** The full range of our checklist items - only 10 rows allowed. */
export const otherChecklistRange = createCell('Read_Other', 'D', otherChecklistRowStart).toRange('E', otherChecklistRowStop);

const otherTopRowStart = 2;
const otherTopRowStop = 19;
/** THe range of our 'top' aggregations. */
export const otherTopRange = createCell('Read_Other', 'H', otherTopRowStart).toRange('H', otherTopRowStop);

export function parseOther(valueRows: any[][], checklistRows: any[][], topRows: any[][]): IOther {

	const other: IOther = {} as unknown as IOther;

	parseAttachValues(other, valueRows);
	parseAttachChecklist(other, checklistRows);
	parseAttachTop(other, topRows);

	return other;
}

function parseAttachValues(other: IOther, valueRows: any[][]): void {
	/*
		Data arrangement: each data point is the first column in each row.
	*/
	const row = rowsFrom(otherValueRowStart);
	function stringAtRow(rowNumber: number): string {
		return stringAt(valueRows[row(rowNumber)], 0);
	}

	other.workingOn = {
		text: stringAtRow(2),
		link: stringAtRow(3),
		linkText: stringAtRow(4)
	};

	other.lookingForward = {
		text: stringAtRow(5),
		link: stringAtRow(6),
		linkText: stringAtRow(7)
	};

	other.milesByFoot = tryParseFloat(stringAtRow(8), 0, true);
	other.milesByBicycle = tryParseFloat(stringAtRow(otherValueRowStop), 0, true);
}

function parseAttachChecklist(other: IOther, checklistRows: any[][]): void {
	/*
		Data arrangement: First column is the 'to-do', second column is the 'done'.
	*/
	const toDoItems: string[] = [];
	const doneItems: string[] = [];

	checklistRows.forEach((row) => {
		const toDoItem = stringAt(row, 0);
		if (toDoItem) {
			toDoItems.push(toDoItem);
		}
		const doneItem = stringAt(row, 1);
		if (doneItem) {
			doneItems.push(doneItem);
		}
	});

	other.checklistToDo = toDoItems;
	other.checklistDone = doneItems;
}

function parseAttachTop(other: IOther, topRows: any[][]): void {
	/*
		Data arrangement: each data point is the first column in each row.
	*/
	const row = rowsFrom(otherTopRowStart);
	function stringAtRow(rowNumber: number): string {
		return stringAt(topRows[row(rowNumber)], 0);
	}
	function countAt(startRowNumber: number, stopRowNumber: number): IOtherCount | null {
		return processCount(stringAtRow, startRowNumber, stopRowNumber);
	}

	other.topLocations = [
		countAt(otherTopRowStart, 3),
		countAt(4, 5),
		countAt(6, 7),
	].filter(notNull);

	other.topDayTypes = [
		countAt(8, 9),
		countAt(10, 11),
		countAt(12, 13),
	].filter(notNull);

	other.topArtists = [
		countAt(14, 15),
		countAt(16, 17),
		countAt(18, otherTopRowStop),
	].filter(notNull);
}

function processCount(stringAt: (rowNumber: number) => string, startRowNumber: number, stopRowNumber: number): IOtherCount | null {
	const text = stringAt(startRowNumber);
	const count = tryParseInt(stringAt(stopRowNumber), -1);
	if (!text || count < 0) {
		return null;
	}
	return {
		text: text,
		count: count
	};
}