import * as React from 'react';
import { FlexColumn, setClipboard } from '@messman/react-common';
import { cloneFilter, filterPresets, IArchiveFilter, IPostElementType } from 'oftheday-shared';
import { OverlayBox } from '@/core/overlay/overlay';
import { tStyled } from '@/core/style/styled';
import { Spacing } from '@/core/layout/common';
import { ActionLink } from '@/core/link';
import { Button } from '@/core/form/button/button';
import { useArchiveResponseContext } from '@/services/data/data-context';
import { useHistory } from 'react-router-dom';
import { routes } from '@/services/nav/routing';
import { postElementTypeForDisplay } from '../archive/filter/filter-common';
import { IconSize, iconTypes, SizedIcon } from '@/core/symbol/icon';

export interface ElementActionsProps {
	isForArchive?: boolean;
	elementType: IPostElementType;
	isTop?: boolean;
	youTubeLink?: string;
	spotifyLink?: string;
}

export interface ElementActions {
	isForArchive: boolean;
	elementType: IPostElementType;
	showTopFilterPreset: boolean;
	youTubeLink: string | null;
	spotifyLink: string | null;
}

/**
 * Renders an action link that opens the global Element Actions Overlay.
 */
export const ElementActions: React.FC<ElementActionsProps> = (props) => {
	const { isForArchive, elementType, isTop, youTubeLink, spotifyLink } = props;

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
			spotifyLink: spotifyLink || null
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

	color: ${p => p.disabled ? p.theme.textDisabled : p.theme.accent.aMain};
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
export const ElementActionsOverlay: React.FC<ElementActionsOverlayProps> = (props) => {
	const { onSelectedFilter } = props;

	const [elementActions, setElementActions] = useElementActions();
	const { applyFilter } = useArchiveResponseContext();
	const history = useHistory();
	const [isSpotifyClipboardCopied, setIsSpotifyClipboardCopied] = React.useState(false);
	const [isYouTubeClipboardCopied, setIsYouTubeClipboardCopied] = React.useState(false);

	function closeOverlay() {
		setElementActions(null);
	}

	React.useEffect(() => {
		setIsSpotifyClipboardCopied(false);
		setIsYouTubeClipboardCopied(false);
	}, [elementActions]);

	let innerRender: JSX.Element | null = null;
	if (elementActions) {
		const { isForArchive, elementType, showTopFilterPreset, spotifyLink, youTubeLink } = elementActions;

		function onElementTypeButtonClick() {
			closeOverlay();
			applyFilter(createFilterForElementType(elementType));
			onSelectedFilter();
			history.push(routes.archive.path);
		}
		const elementTypeDisplay = postElementTypeForDisplay[IPostElementType[elementType] as keyof typeof IPostElementType];

		const elementTypeFilterButton = !isForArchive ? (
			<Button onClick={onElementTypeButtonClick} iconAfter={iconTypes.right} isSpecial={true}>
				See Recent {elementTypeDisplay}
			</Button>
		) : null;

		function onTopButtonClick() {
			closeOverlay();
			applyFilter(filterPresets.recentTop);
			onSelectedFilter();
			history.push(routes.archive.path);
		}

		const topFilterButton = (showTopFilterPreset && !isForArchive) ? (
			<Button onClick={onTopButtonClick} iconAfter={iconTypes.right} isSpecial={true}>
				See Recent Top Items
			</Button>
		) : null;

		function onCopySpotifyButtonClick() {
			setClipboard(spotifyLink!);
			setIsSpotifyClipboardCopied(true);
			setIsYouTubeClipboardCopied(false);
		}

		const spotifyButtonText = isSpotifyClipboardCopied ? 'Copied Spotify Link!' : 'Copy Spotify Link';
		const copySpotifyLinkButton = spotifyLink ? (
			<Button onClick={onCopySpotifyButtonClick} isDisabled={isSpotifyClipboardCopied}>
				{spotifyButtonText}
			</Button>
		) : null;

		function onCopyYouTubeButtonClick() {
			setClipboard(youTubeLink!);
			setIsYouTubeClipboardCopied(true);
			setIsSpotifyClipboardCopied(false);
		}

		const youTubeButtonText = isYouTubeClipboardCopied ? 'Copied YouTube Link!' : 'Copy YouTube Link';
		const copyYouTubeLinkButton = youTubeLink ? (
			<Button onClick={onCopyYouTubeButtonClick} isDisabled={isYouTubeClipboardCopied}>
				{youTubeButtonText}
			</Button>
		) : null;

		innerRender = (
			<ButtonsContainer>
				{elementTypeFilterButton}
				{topFilterButton}
				{copySpotifyLinkButton}
				{copyYouTubeLinkButton}
			</ButtonsContainer>
		);
	}

	return (
		<OverlayBox
			isActive={!!elementActions}
			onSetInactive={closeOverlay}
			headerTitle='Actions'
			isSetInactiveOnBackdropClick={true}
		>
			<ScrollFlexColumn>
				{innerRender}
			</ScrollFlexColumn>
			<FooterActionLink onClick={closeOverlay}>Cancel</FooterActionLink>
		</OverlayBox>
	);
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

