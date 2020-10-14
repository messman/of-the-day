import * as React from 'react';
import { FlexColumn, setClipboard } from '@messman/react-common';
import { cloneFilter, filterPresets, IArchiveFilter, IPostElementType } from 'oftheday-shared';
import { OverlayBox } from '@/core/overlay/overlay';
import { tStyled } from '@/core/style/styled';
import { spacing } from '@/core/layout/common';
import { ActionLink } from '@/core/link';
import { Button } from '@/core/form/button/button';
import { useArchiveResponseContext } from '@/services/data/data-context';
import { useHistory } from 'react-router-dom';
import { routes } from '@/services/nav/routing';
import { postElementTypeForDisplay } from '../archive/filter/filter-common';
import { iconTypes } from '@/core/symbol/icon';

export interface ElementActionsProps {
	isViewingArchive?: boolean;
	elementType: IPostElementType;
	isTop?: boolean;
	youTubeLink?: string;
	spotifyLink?: string;
}

export interface ElementActions {
	isViewingArchive: boolean;
	elementType: IPostElementType;
	showTopFilterPreset: boolean;
	youTubeLink: string | null;
	spotifyLink: string | null;
}

export const ElementActions: React.FC<ElementActionsProps> = (props) => {
	const { isViewingArchive, elementType, isTop, youTubeLink, spotifyLink } = props;

	const setActions = useSetElementActions();

	if (isViewingArchive && !youTubeLink && !spotifyLink) {
		return null;
	}

	function onClick() {
		setActions({
			isViewingArchive: !!isViewingArchive,
			elementType: elementType,
			showTopFilterPreset: !!isTop,
			youTubeLink: youTubeLink || null,
			spotifyLink: spotifyLink || null
		});
	}

	return (
		<ActionLink onClick={onClick}>Actions</ActionLink>
	);
};

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

export const ElementActionsOverlay: React.FC = () => {

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
		const { isViewingArchive, elementType, showTopFilterPreset, spotifyLink, youTubeLink } = elementActions;

		function onElementTypeButtonClick() {
			closeOverlay();
			applyFilter(createFilterForElementType(elementType));
			history.push(routes.archive.path);
		}
		const elementTypeDisplay = postElementTypeForDisplay[IPostElementType[elementType] as keyof typeof IPostElementType];

		const elementTypeFilterButton = !isViewingArchive ? (
			<Button onClick={onElementTypeButtonClick} iconAfter={iconTypes.right} isSpecial={true}>
				See Recent {elementTypeDisplay}
			</Button>
		) : null;

		function onTopButtonClick() {
			closeOverlay();
			applyFilter(filterPresets.recentTop);
			history.push(routes.archive.path);
		}

		const topFilterButton = (showTopFilterPreset && !isViewingArchive) ? (
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
		margin-top: ${spacing.medium.value};
	}
`;


const ScrollFlexColumn = tStyled(FlexColumn)`
	overflow-y: auto;
	padding: ${spacing.medium.value};
`;

const FooterActionLink = tStyled(ActionLink)`
	padding: ${spacing.medium.value};
	border-top: 1px solid ${p => p.theme.color.bgComponent3};
	text-align: center;
`;

