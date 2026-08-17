/**
 * SPDX-FileCopyrightText: (c) 2025 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

export enum EActionType {
	CHANGE_TONE = 'L_CHANGE_TONE',
	FIX_SPELLING_AND_GRAMMAR = 'L_FIX_SPELLING_AND_GRAMMAR',
	GENERATE_BASED_ON_TITLE = 'L_GENERATE_BASED_ON_TITLE',
	IMPROVE_WRITING = 'L_IMPROVE_WRITING',
	MAKE_LONGER = 'L_MAKE_LONGER',
	MAKE_SHORTER = 'L_MAKE_SHORTER',

	// The product ships no L_TRANSLATE_TO agent (L_TRANSLATE_CONTENT
	// translates the whole edited entry, not a selection), so Translate To
	// invokes the workspace-seeded agent instead (see the aihub workspace's
	// resource/ai-hub-agent/CUSTOM_TRANSLATE_TO).

	TRANSLATE_TO = 'CUSTOM_TRANSLATE_TO',
}

export interface IActionOption {

	/** Display label of the submenu entry. */
	label: string;

	/** Value posted to the agent under the action's `optionContextKey`. */
	value: string;
}

export interface IAction {
	disabled?: boolean;
	name: string;

	/** Agent context key the selected option's value is posted under. */
	optionContextKey?: string;

	/** Submenu entries; the action posts only after one is picked. */
	options?: IActionOption[];
	symbolLeft?: string;
	symbolRight?: string;
	type: EActionType;
}

export interface IActionGroup {
	children: IAction[];
	name: string;
	type?: 'divider';
}
