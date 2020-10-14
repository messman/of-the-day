import { IResponseWithMeta } from '../base';

export interface IOtherResponse extends IResponseWithMeta {
	other: IOther;
}

export interface IOther {
	workingOn: IOtherWorkingOn;
	lookingForward: IOtherLookingForward;

	milesByFoot: number;
	milesByBicycle: number;

	topLocations: IOtherCount[];
	topDayTypes: IOtherCount[];
	topArtists: IOtherCount[];

	checklistDone: string[];
	checklistToDo: string[];
}

export interface IOtherCount {
	text: string;
	count: number;
}

export interface IOtherWorkingOn {
	text: string;
	link: string;
	linkText: string;
}

export interface IOtherLookingForward {
	text: string;
	link: string;
	linkText: string;
}