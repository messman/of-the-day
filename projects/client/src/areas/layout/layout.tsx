import * as React from 'react';
import { About, AboutProps } from '@/areas/about/about';
import { Posts, PostsProps } from '@/areas/posts/posts';
import { Other } from '@/areas/other/other';
import { Archive, ArchiveProps } from '@/areas/archive/archive';
import { Switch, Route } from 'react-router-dom';
import { routes } from '@/services/nav/routing';
import { tStyled } from '@/core/style/styled';
import { FlexColumn, useElementIntersect, useStateDOM, useWindowLayout } from '@messman/react-common';
import { Header } from './header/header';
import { LayoutBreakpoint } from '@/services/layout/window-layout';
import { IScrollIntoViewOptions, IScrollToOptions } from 'seamless-scroll-polyfill/dist/esm/common';
import { elementScrollTo, elementScrollIntoView } from 'seamless-scroll-polyfill';
import { spacing } from '@/core/layout/common';
import { ElementActionsOverlay } from '../posts/element-action-overlay';
import { MetaMessaging } from '../alert/meta-messaging';
import { LowerMenuBar } from './menu-bar/menu-bar-lower';
import { stickyMenuBarColorHeight, totalUpperStickyMenuBarHeight, UpperMenuBar, UpperStickyMenuBar } from './menu-bar/menu-bar-upper';

export const ApplicationLayout: React.FC = () => {
	return (
		<Layout
			Posts={Posts}
			Other={Other}
			Archive={Archive}
			About={About}
		/>
	);
};

// Each component is passed as a component instead of an element so it's rendered further down the tree.
interface LayoutProps {
	Posts: React.FC<PostsProps>;
	Other: React.FC;
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

export const Layout: React.FC<LayoutProps> = (props) => {
	const { Posts, Other, Archive, About } = props;

	const windowLayout = useWindowLayout();
	const isAnyMobileWidth = windowLayout.widthBreakpoint <= LayoutBreakpoint.mobileLarge;
	const isDesktopWidth = windowLayout.widthBreakpoint >= LayoutBreakpoint.desktop;

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

	// Mobile settings
	const stickyOffsetPixels = isAnyMobileWidth ? stickyMenuBarColorHeight : totalUpperStickyMenuBarHeight;

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
					<Header />
					<div ref={elementIntersectRef} />
					<UpperMenuBar isMobileWidth={isAnyMobileWidth} onPathClick={scrollToTopSticky} />
					<RouteContainer>
						<MetaMessaging>
							<Switch>
								<Route exact path={routes.posts.path}>
									<Posts
										offsetPixels={stickyOffsetPixels}
										rootElement={scrollContainerElement}
									/>
								</Route>
								<Route path={routes.other.path}>
									<Other />
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
			<ElementActionsOverlay />
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
	padding-top: ${spacing.medium.value};
	padding-bottom: ${spacing.grand.value};
	min-height: 100vh;
`;

const ScrollContainerElementContext = React.createContext<HTMLElement | null>(null);
export const useScrollContainerElement = () => React.useContext(ScrollContainerElementContext);