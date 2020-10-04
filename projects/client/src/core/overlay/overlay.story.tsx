import * as React from 'react';
import { RegularText } from '@/core/symbol/text';
import { decorate } from '@/test/decorate';
import { boolean, button, select, text } from '@storybook/addon-knobs';
import { Popup, PopupType, usePopup } from '@/services/data/data-error';

export default { title: 'Core/Popup' };

export const TestPopup = decorate('Popup', null, () => {

	// Just get the setter.
	const [popupData, setPopupData] = usePopup();

	const [timesRefreshed, setTimesRefreshed] = React.useState(0);
	function onDataRefresh() {
		setTimesRefreshed((p) => {
			return p + 1;
		});
	}

	// Add knobs.

	const options = {
		warning: PopupType.warning,
		error: PopupType.error
	};
	const popupType = select('Type', options, PopupType.warning);

	const title = text('Title', 'Uh-oh, dude.');
	const popupText = text('Text', 'There was a problem while trying to do the thing.');
	const forcePageReload = boolean('Page Reload', false);
	const forceDataRefresh = boolean('Data Refresh', false);

	button('Trigger Popup', () => {
		setPopupData({
			type: popupType,
			title: title,
			text: popupText,
			forcePageReload: forcePageReload,
			onDataRefresh: forceDataRefresh ? onDataRefresh : null
		});
	});

	const popupDataRender = popupData ? (
		<>
			<p>title: {popupData.title}</p>
			<p>text: {popupData.text}</p>
		</>
	) : null;

	return (
		<Popup>

			<RegularText>
				<p>
					Here is some background text. Times refreshed: {timesRefreshed.toString()}
				</p>
				{popupDataRender}
			</RegularText>
		</Popup>
	);
});