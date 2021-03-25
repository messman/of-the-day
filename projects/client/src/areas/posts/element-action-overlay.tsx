import * as React from 'react';
import { FlexColumn, setClipboard } from '@messman/react-common';
import { cloneFilter, filterPresets, IArchiveFilter, IPostElementType, isFilterSemanticallyEqual } from 'oftheday-shared';
import { OverlayBox } from '@/core/overlay/overlay';
import { tStyled } from '@/core/style/styled';
import { Spacing } from '@/core/layout/common';
import { ActionLink } from '@/core/link';
import { Button } from '@/core/form/button/button';
import { useArchiveResponseContext } from '@/services/data/data-context';
import { routes } from '@/services/nav/routing';
import { postElementTypeForDisplay } from '../archive/filter/filter-common';
import { IconSize, iconTypes, SizedIcon } from '@/core/symbol/icon';
import { ParagraphCenter } from '@/core/symbol/text';
import { useHistoryWithParams } from '@/services/nav/url';

export interface ElementActionsProps {
	isForArchive?: boolean;
	elementType: IPostElementType;
	isTop?: boolean;
	youTubeLink?: string;
	spotifyLink?: string;
	/** Default: 'Text' */
	textToCopyContentType?: string;
	textToCopy?: string[];
}

export interface ElementActions {
	isForArchive: boolean;
	elementType: IPostElementType;
	showTopFilterPreset: boolean;
	youTubeLink: string | null;
	spotifyLink: string | null;
	textToCopyContentType: string | null;
	textToCopy: string[] | null;
}

/**
 * Renders an action link that opens the global Element Actions Overlay.
 */
export const ElementActions: React.FC<ElementActionsProps> = (props) => {
	const { isForArchive, elementType, isTop, youTubeLink, spotifyLink, textToCopy, textToCopyContentType } = props;

	const setActions = useSetElementActions();
	const disabled = elementType === IPostElementType.personal;

	function onClick() {
		if (disabled) {
			return;
		}
		setActions({
			isForArchive: !!isForArchive,
			elementType: elementType,
			showTopFilterPreset: !!isTop,
			youTubeLink: youTubeLink || null,
			spotifyLink: spotifyLink || null,
			textToCopy: textToCopy || null,
			textToCopyContentType: textToCopyContentType || null
		});
	}

	return (
		<InnerButton disabled={disabled} onClick={onClick}>
			<SizedIcon type={iconTypes.share} size={IconSize.a_medium} />
		</InnerButton>
	);
};

const InnerButton = tStyled.button`
	cursor: ${p => p.disabled ? 'not-allowed' : 'pointer'};

	color: ${p => p.disabled ? p.theme.textDisabled : p.theme.accent.distinct};
	border: none;
	background-color: transparent;
	
	padding: ${Spacing.ant04};
`;


export type ElementActionsState = [ElementActions | null, React.Dispatch<React.SetStateAction<ElementActions | null>>];
export type ElementActionsSetter = React.Dispatch<React.SetStateAction<ElementActions | null>>;

const ElementActionsStateContext = React.createContext<ElementActionsState>(null!);
export const useElementActions = () => React.useContext(ElementActionsStateContext);

const ElementActionsSetterContext = React.createContext<ElementActionsSetter>(null!);
export const useSetElementActions = () => React.useContext(ElementActionsSetterContext);

export const ElementActionsProvider: React.FC = (props) => {
	const elementActionsState = React.useState<ElementActions | null>(null);
	const setter = elementActionsState[1];
	return (
		<ElementActionsStateContext.Provider value={elementActionsState}>
			<ElementActionsSetterContext.Provider value={setter}>
				{props.children}
			</ElementActionsSetterContext.Provider>
		</ElementActionsStateContext.Provider>
	);
};

export interface ElementActionsOverlayProps {
	onSelectedFilter: () => void;
}

/**
 * Overlay that can be opened from any post element card (Music, Video, etc) with actions.
 * Can copy links or move to the archive.
*/
export const ElementActionsOverlay: React.FC<ElementActionsOverlayProps> = React.memo((props) => {
	const { onSelectedFilter } = props;

	const [elementActions, setElementActions] = useElementActions();

	function closeOverlay() {
		setElementActions(null);
	}

	return (
		<OverlayBox
			isActive={!!elementActions}
			onSetInactive={closeOverlay}
			headerTitle='Actions'
			isSetInactiveOnBackdropClick={true}
		>
			<ScrollFlexColumn>
				<InnerElementActionsOverlay
					elementActions={elementActions}
					onSelectedFilter={onSelectedFilter}
					close={closeOverlay}
				/>
			</ScrollFlexColumn>
			<FooterActionLink onClick={closeOverlay}>Cancel</FooterActionLink>
		</OverlayBox>
	);
});

interface InnerElementActionsOverlayProps {
	elementActions: ElementActions | null;
	onSelectedFilter: () => void;
	close: () => void;
}

const InnerElementActionsOverlay: React.FC<InnerElementActionsOverlayProps> = (props) => {
	const { onSelectedFilter, elementActions, close } = props;

	const { filter, applyFilter } = useArchiveResponseContext();
	const navigate = useHistoryWithParams();

	const [copiedClipboards, setCopiedClipboards] = React.useState(() => {
		return {
			spotify: false,
			youTube: false,
			text: false
		};
	});

	React.useEffect(() => {
		setCopiedClipboards({
			spotify: false,
			youTube: false,
			text: false
		});
	}, [elementActions]);

	if (!elementActions) {
		return null;
	}

	const { isForArchive, elementType, showTopFilterPreset, spotifyLink, youTubeLink, textToCopy, textToCopyContentType } = elementActions;
	const filterForElementType = createFilterForElementType(elementType);

	function onElementTypeButtonClick() {
		close();
		applyFilter(filterForElementType);
		onSelectedFilter();
		navigate(routes.archive.path);
	}
	const elementTypeDisplay = postElementTypeForDisplay[IPostElementType[elementType] as keyof typeof IPostElementType];

	// If we aren't in the archive or if we aren't currently viewing a filter just for this filter type, show it.
	const elementTypeFilterButton = (!isForArchive || !isFilterSemanticallyEqual(filter, filterForElementType)) ? (
		<Button onClick={onElementTypeButtonClick} iconAfter={iconTypes.right} isSpecial={true}>
			See Recent {elementTypeDisplay}
		</Button>
	) : null;

	function onTopButtonClick() {
		close();
		applyFilter(filterPresets.recentTop);
		onSelectedFilter();
		navigate(routes.archive.path);
	}

	const topFilterButton = (showTopFilterPreset && (!isForArchive || !isFilterSemanticallyEqual(filter, filterPresets.recentTop))) ? (
		<Button onClick={onTopButtonClick} iconAfter={iconTypes.right} isSpecial={true}>
			See Recent Top Items
		</Button>
	) : null;

	function onCopySpotifyButtonClick() {
		setClipboard(spotifyLink!);
		setCopiedClipboards({
			spotify: true,
			youTube: false,
			text: false
		});
	}

	const spotifyButtonText = copiedClipboards.spotify ? 'Copied Spotify Link!' : 'Copy Spotify Link';
	const copySpotifyLinkButton = spotifyLink ? (
		<Button onClick={onCopySpotifyButtonClick} isDisabled={copiedClipboards.spotify}>
			{spotifyButtonText}
		</Button>
	) : null;

	function onCopyYouTubeButtonClick() {
		setClipboard(youTubeLink!);
		setCopiedClipboards({
			spotify: false,
			youTube: true,
			text: false
		});
	}

	const youTubeButtonText = copiedClipboards.youTube ? 'Copied YouTube Link!' : 'Copy YouTube Link';
	const copyYouTubeLinkButton = youTubeLink ? (
		<Button onClick={onCopyYouTubeButtonClick} isDisabled={copiedClipboards.youTube}>
			{youTubeButtonText}
		</Button>
	) : null;

	function onCopyTextButtonClick() {
		setClipboard(textToCopy!);
		setCopiedClipboards({
			spotify: false,
			youTube: false,
			text: true
		});
	}

	let copyTextButton: JSX.Element | null = null;

	if (textToCopy) {
		const contentType = textToCopyContentType || 'Text';
		const textButtonText = copiedClipboards.text ? `Copied ${contentType}!` : `Copy ${contentType}`;
		copyTextButton = (
			<Button onClick={onCopyTextButtonClick} isDisabled={copiedClipboards.text}>
				{textButtonText}
			</Button>
		);
	}

	if (elementTypeFilterButton || topFilterButton || copySpotifyLinkButton || copyYouTubeLinkButton || copyTextButton) {
		return (
			<ButtonsContainer>
				{elementTypeFilterButton}
				{topFilterButton}
				{copySpotifyLinkButton}
				{copyYouTubeLinkButton}
				{copyTextButton}
			</ButtonsContainer>
		);
	}
	else {
		return (
			<ParagraphCenter>
				There are no actions available for this content.
			</ParagraphCenter>
		);
	}
};

function createFilterForElementType(elementType: IPostElementType): IArchiveFilter {
	if (elementType === IPostElementType.music) {
		return filterPresets.recentMusic;
	}
	else if (elementType === IPostElementType.video) {
		return filterPresets.recentVideo;
	}
	else {
		const filter = cloneFilter(filterPresets.recentVideo);
		filter.types.video = false;
		filter.types[IPostElementType[elementType] as keyof typeof IPostElementType] = true;
		filter.preset = undefined;
		return filter;
	}
}

const ButtonsContainer = tStyled.div`
	${Button} {
		width: 100%;
	}

	${Button} + ${Button} {
		margin-top: ${Spacing.dog16};
	}
`;


const ScrollFlexColumn = tStyled(FlexColumn)`
	overflow-y: auto;
	padding: ${Spacing.dog16};
`;

const FooterActionLink = tStyled(ActionLink)`
	padding: ${Spacing.dog16};
	border-top: 1px solid ${p => p.theme.outlineDistinct};
	text-align: center;
`;

