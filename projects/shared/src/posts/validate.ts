import { IPostBasics, IPostCustom, IPostEndThoughts, IPostImage, IPostMusic, IPostQuote, IPostVideo } from '.';

/*
	Below are the validators for each subsection of a post.
	These validators help determine if:
	- the data from the back end is valid (server)
	- the data is complete enough to render (client)
*/

function note(basics: IPostBasics | undefined): boolean {
	return !!basics && (!!basics.event || !!basics.note);
}

function schedule(basics: IPostBasics | undefined): boolean {
	return !!basics && (!!basics.schedule || !!(basics.dayTypes && basics.dayTypes.length));
}

function location(basics: IPostBasics | undefined): boolean {
	return !!basics && !!basics.location;
}

function basics(basics: IPostBasics | undefined): boolean {
	return !!basics && (note(basics) || schedule(basics) || location(basics));
}

function endThoughts(endThoughts: IPostEndThoughts | undefined): boolean {
	return !!endThoughts && !!endThoughts.value;
}

function music(music: IPostMusic | undefined): boolean {
	if (!music) {
		return false;
	}
	const { title, artist, spotifyLink, geniusLink, youTubeLink } = music;
	return !!title && !!artist && !!spotifyLink && !!geniusLink && !!youTubeLink;
}

function video(video: IPostVideo | undefined): boolean {
	if (!video) {
		return false;
	}
	const { originalTitle, description, link, isRemoved } = video;
	return !!originalTitle && (!!link || isRemoved) && (!!description || isRemoved);
}

function image(image: IPostImage | undefined): boolean {
	return !!image && !!image.link;
}

function quote(quote: IPostQuote | undefined): boolean {
	return !!quote && !!quote.a;
}

function custom(custom: IPostCustom | undefined): boolean {
	return !!custom && !!custom.value && !!custom.title;
}

export const isValidPostElement = {
	note,
	schedule,
	location,
	basics,
	endThoughts,
	music,
	video,
	image,
	quote,
	custom
};