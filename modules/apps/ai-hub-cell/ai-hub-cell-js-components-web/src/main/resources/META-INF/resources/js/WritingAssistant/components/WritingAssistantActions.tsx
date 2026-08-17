/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import React, {useEffect, useState} from 'react';

import {EActionType, IActionGroup} from '../types';
import WritingAssistantBalloon from './WritingAssistantBalloon';

// Option values are what the agents' LLM prompts interpolate ({{tone}} /
// {{targetLanguage}}), so they stay English regardless of the UI locale.

const TONE_OPTIONS = [
	{label: 'Professional', value: 'professional'},
	{label: 'Casual', value: 'casual'},
	{label: 'Friendly', value: 'friendly'},
	{label: 'Confident', value: 'confident'},
	{label: 'Empathetic', value: 'empathetic'},
];

const TRANSLATE_OPTIONS = [
	{label: 'English', value: 'English'},
	{label: '日本語', value: 'Japanese'},
	{label: 'Español', value: 'Spanish'},
	{label: 'Français', value: 'French'},
	{label: 'Deutsch', value: 'German'},
	{label: 'Português', value: 'Portuguese'},
	{label: '中文', value: 'Chinese (Simplified)'},
];

export default function WritingAssistantActions({
	containerRef,
	handleActionClick,
	hideBalloon,
}: {
	containerRef: HTMLElement;
	handleActionClick: (
		type: EActionType,
		extraContext?: Record<string, string>
	) => Promise<void>;
	hideBalloon: () => void;
}) {
	const [active, setActive] = useState(true);

	const actionsGroup: IActionGroup[] = [
		{
			children: [
				{
					disabled: false,
					name: Liferay.Language.get('improve-writing'),
					symbolLeft: 'magic',
					type: EActionType.IMPROVE_WRITING,
				},
				{
					disabled: false,
					name: Liferay.Language.get('fix-spelling-and-grammar'),
					symbolLeft: 'check',
					type: EActionType.FIX_SPELLING_AND_GRAMMAR,
				},
				{
					disabled: false,
					name: Liferay.Language.get('translate-to'),
					optionContextKey: 'targetLanguage',
					options: TRANSLATE_OPTIONS,
					symbolLeft: 'automatic-translate',
					symbolRight: 'angle-right-small',
					type: EActionType.TRANSLATE_TO,
				},
			],
			name: Liferay.Language.get('ai-writing-tools'),
		},
		{
			children: [
				{
					disabled: false,
					name: Liferay.Language.get('make-shorter'),
					symbolLeft: 'bars',
					type: EActionType.MAKE_SHORTER,
				},
				{
					disabled: false,
					name: Liferay.Language.get('make-longer'),
					symbolLeft: 'align-justify',
					type: EActionType.MAKE_LONGER,
				},
				{
					disabled: false,
					name: Liferay.Language.get('change-tone'),
					optionContextKey: 'tone',
					options: TONE_OPTIONS,
					symbolRight: 'angle-right-small',
					type: EActionType.CHANGE_TONE,
				},
			],
			name: Liferay.Language.get('edit-with-ai'),
		},
	];

	useEffect(() => {
		function handleDocumentClick(event: MouseEvent) {
			if (
				active &&
				containerRef &&
				!containerRef.contains(event.target as Node)
			) {
				setActive(false);
				hideBalloon();
			}
		}
		document.addEventListener('mousedown', handleDocumentClick);

		return () => {
			document.removeEventListener('mousedown', handleDocumentClick);
		};
	}, [active, containerRef, hideBalloon]);

	if (!active) {
		return null;
	}

	return (
		<WritingAssistantBalloon
			actionsGroup={actionsGroup}
			handleActionClick={handleActionClick}
		/>
	);
}
