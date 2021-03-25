import { IPostPersonal, IPostCustom, IPostImage, IPostMusic, IPostQuote, IPostVideo } from '.';

/*
	Below are the validators for each subsection of a post.
	These validators help determine if:
	- the data from the back end is valid (server)
	- the data is complete enough to render (client)
*/

function personal(personal: IPostPersonal | undefined): boolean {
	// Don't mark valid if it's just location and/or event.
	return !!personal && (
		!!personal.note.length ||
		!!personal.schedule ||
		!!personal.previousDayThoughts.length
	);
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
	return !!custom && !!custom.value.length && !!custom.title;
}

export const isValidPostElement = {
	personal,
	music,
	video,
	image,
	quote,
	custom
};