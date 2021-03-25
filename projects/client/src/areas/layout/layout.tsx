import * as React from 'react';
import { About, AboutProps } from '@/areas/about/about';
import { Posts, PostsProps } from '@/areas/posts/posts';
import { Archive, ArchiveProps } from '@/areas/archive/archive';
import { Switch, Route } from 'react-router-dom';
import { routes } from '@/services/nav/routing';
import { tStyled } from '@/core/style/styled';
import { FlexColumn, useElementIntersect, useStateDOM, useWindowMediaLayout } from '@messman/react-common';
import { Header } from './header/header';
import { LayoutBreakpointRem } from '@/services/layout/window-layout';
import { IScrollIntoViewOptions, IScrollToOptions } from 'seamless-scroll-polyfill/dist/esm/common';
import { elementScrollTo, elementScrollIntoView } from 'seamless-scroll-polyfill';
import { Spacing } from '@/core/layout/common';
import { ElementActionsOverlay } from '../posts/element-action-overlay';
import { MetaMessaging } from '../alert/meta-messaging';
import { LowerMenuBar } from './menu-bar/menu-bar-lower';
import { stickyMenuBarColorHeight, totalUpperStickyMenuBarHeight, UpperMenuBar, UpperStickyMenuBar } from './menu-bar/menu-bar-upper';

export const ApplicationLayout: React.FC = () => {
	return (
		<Layout
			Posts={Posts}
			Archive={Archive}
			About={About}
		/>
	);
};

// Each component is passed as a component instead of an element so it's rendered further down the tree.
interface LayoutProps {
	Posts: React.FC<PostsProps>;
	Archive: React.FC<ArchiveProps>;
	About: React.FC<AboutProps>;
}

// seamless-scroll-polyfill used here to provide smooth scrolling for iOS Safari.
const scrollToTopOptions: IScrollToOptions = {
	//behavior: 'smooth',
	top: 0
};

const scrollToStickyOptions: IScrollIntoViewOptions = {
	//behavior: 'smooth',
	block: 'start',
	inline: 'nearest'
};

/**
 * The beating heart of the application.
 * Controls the routing for the pages of the app.
 */
export const Layout: React.FC<LayoutProps> = (props) => {
	// Our page layout components.
	const { Posts, Archive, About } = props;

	// Get the window layout so we can make decisions about the menu bar based on window width.
	const windowLayout = useWindowMediaLayout();
	const isAnyMobileWidth = windowLayout.widthBreakpoint <= LayoutBreakpointRem.c30;
	const isDesktopWidth = windowLayout.widthBreakpoint >= LayoutBreakpointRem.f60;

	/*
		Bit of a hack here. 
		We are storing a DOM element that would normally just be a ref. 
		Why?:
		- Child components need to know when this ref is set (including when it updates).
		- Child components need the actual DOM element. 
		I could use an incrementing number and a ref, but this, although hacky, is more clear.
		We aren't really using the element as DOM - we are using it as data.
	*/
	const [scrollContainerRef, scrollContainerElement] = useStateDOM();
	const [isShowingStickyMenuBar, setIsShowingStickyMenuBar] = React.useState(false);

	/**
	 * The height that the sticky upper menu bar (which appears on larger screens after the 
	 * user scrolls to a certain point) takes up. We need our other sticky headers (the archive
	 * header, the posts header) to be offset by that height so the headers don't overlap.
	 * But even on smaller screens, we still show a tiny 'color bar' that has some height.
	 */
	const stickyOffsetPixels = isAnyMobileWidth ? stickyMenuBarColorHeight : totalUpperStickyMenuBarHeight;

	// Lets us know when we've passed the point on the screen where we should show
	// the sticky upper menu bar.
	const elementIntersectRef = useElementIntersect({
		rootMargin: `-${stickyMenuBarColorHeight}px 0px 0px 0px`,
		rootElement: scrollContainerElement,
	}, (intersect) => {
		if (!intersect || !elementIntersectRef.current) {
			return;
		}
		setIsShowingStickyMenuBar(intersect.top.isBefore);
	});

	function onScrollToTop() {
		elementScrollTo((scrollContainerRef.current as HTMLElement), scrollToTopOptions);
	}

	function scrollToTopSticky() {
		elementScrollIntoView((elementIntersectRef.current as HTMLElement), scrollToStickyOptions);
	}

	function onSelectedFilter() {
		scrollToTopSticky();
	}

	return (
		<LayoutContainer>
			<UpperStickyMenuBar
				isMobileWidth={isAnyMobileWidth}
				isDesktopWidth={isDesktopWidth}
				isShowing={isShowingStickyMenuBar}
				onScrollToTop={onScrollToTop}
				onPathClick={scrollToTopSticky}
			/>
			<ScrollContainer ref={scrollContainerRef}>
				<ScrollContainerElementContext.Provider value={scrollContainerElement}>
					<Header isActive={!isShowingStickyMenuBar} />
					<div ref={elementIntersectRef} />
					<UpperMenuBar isMobileWidth={isAnyMobileWidth} onPathClick={scrollToTopSticky} />
					<RouteContainer>
						<MetaMessaging>
							<Switch>
								<Route exact path={routes.posts.path}>
									<Posts />
								</Route>
								<Route path={routes.archive.path}>
									<Archive
										offsetPixels={stickyOffsetPixels}
										rootElement={scrollContainerElement}
									/>
								</Route>
								<Route path={routes.about.path}>
									<About />
								</Route>
							</Switch>
						</MetaMessaging>
					</RouteContainer>
				</ScrollContainerElementContext.Provider>
			</ScrollContainer>
			<LowerMenuBar isMobileWidth={isAnyMobileWidth} onPathClick={scrollToTopSticky} />
			<ElementActionsOverlay onSelectedFilter={onSelectedFilter} />
		</LayoutContainer>
	);
};

const ScrollContainer = tStyled.div`
	position: relative;
	overflow-y: auto;
`;

const LayoutContainer = tStyled(FlexColumn)`
	height: 100%;
	/* Used to prevent MenuBar scrolling. */
	overflow: hidden;
`;

const RouteContainer = tStyled.div`
	padding-top: ${Spacing.dog16};
	padding-bottom: ${Spacing.guy40};
	min-height: 100vh;
`;

const ScrollContainerElementContext = React.createContext<HTMLElement | null>(null);
export const useScrollContainerElement = () => React.useContext(ScrollContainerElementContext);