import { IPostPersonal, IPostCustom, IPostImage, IPostMusic, IPostQuote, IPostVideo } from '.';

/*
	Below are the validators for each subsection of a post.
	These validators help determine if:
	- the data from the back end is valid (server)
	- the data is complete enough to render (client)
*/

function note(personal: IPostPersonal | undefined): boolean {
	return !!personal && (!!personal.event || !!personal.note.length);
}

function schedule(personal: IPostPersonal | undefined): boolean {
	return !!personal && (!!personal.schedule || !!personal.dayTypes.length);
}

function location(personal: IPostPersonal | undefined): boolean {
	return !!personal && !!personal.location;
}

function endThoughts(personal: IPostPersonal | undefined): boolean {
	return !!personal && !!personal.previousDayThoughts.length;
}

function personal(personal: IPostPersonal | undefined): boolean {
	return !!personal && (note(personal) || schedule(personal) || location(personal) || endThoughts(personal));
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
	const { originalTitle, link, isRemoved } = video;
	return !!originalTitle && (!!link || isRemoved);
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
	personal,
	music,
	video,
	image,
	quote,
	custom
};