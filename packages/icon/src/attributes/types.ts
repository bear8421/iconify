import type { IconifyIcon } from '@iconify/types';

/**
 * Icon render modes
 *
 * 'bg' = SPAN with style using `background`
 * 'mask' = SPAN with style using `mask`
 * 'svg' = SVG
 */
export type ActualRenderMode = 'bg' | 'mask' | 'svg';

/**
 * Extra render modes
 *
 * 'style' = 'bg' or 'mask', depending on icon content
 */
export type IconifyRenderMode = 'style' | ActualRenderMode;

/**
 * Icon customisations
 */
export type IconifyIconCustomisationAttributes = {
	// Dimensions
	width?: string | number;
	height?: string | number;

	// Transformations
	rotate?: string | number;
	flip?: string;
};

/**
 * All attributes
 */
export interface IconifyIconAttributes
	extends IconifyIconCustomisationAttributes {
	// Icon to render: name, object or serialised object
	icon: string | IconifyIcon;

	// Render mode
	mode?: IconifyRenderMode;

	// Inline mode
	inline?: boolean | string;
}
