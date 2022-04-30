import type { IconifyIconBuildResult } from '../lib/svg/build';
import { iconToSVG } from '../lib/svg/build';
import type { FullIconifyIcon } from '../lib/icon';
import { fullIcon, iconDefaults } from '../lib/icon';
import type { FullIconCustomisations } from '../lib/customisations';
import { defaults, mergeCustomisations } from '../lib/customisations';
import { iconToHTML } from '../lib/svg/html';

describe('Testing iconToSVG', () => {
	test('Empty icon', () => {
		const custom: FullIconCustomisations = defaults;
		const icon: FullIconifyIcon = { ...iconDefaults, body: '' };
		const expected: IconifyIconBuildResult = {
			attributes: {
				width: '1em',
				height: '1em',
				viewBox: '0 0 16 16',
			},
			body: '',
		};

		const result = iconToSVG(icon, custom);
		expect(result).toEqual(expected);

		// Test HTML
		const html = iconToHTML(result.body, result.attributes);
		expect(html).toBe(
			'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"></svg>'
		);
	});

	test('Auto size, inline, body', () => {
		const custom: FullIconCustomisations = mergeCustomisations(defaults, {
			inline: true,
			height: 'auto',
		});
		const icon: FullIconifyIcon = fullIcon({
			body: '<path d="" />',
		});
		const expected: IconifyIconBuildResult = {
			attributes: {
				width: '16',
				height: '16',
				viewBox: '0 0 16 16',
			},
			body: '<path d="" />',
			inline: true,
		};

		const result = iconToSVG(icon, custom);
		expect(result).toEqual(expected);

		// Test HTML
		const htmlProps: Record<string, string> = {
			'aria-hidden': 'true',
			'role': 'img',
			...result.attributes,
		};
		if (result.inline) {
			htmlProps['style'] = 'vertical-align: -0.125em;';
		}
		const html = iconToHTML(result.body, htmlProps);
		expect(html).toBe(
			'<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 16 16" style="vertical-align: -0.125em;"><path d="" /></svg>'
		);
	});

	test('Auto size, inline, body', () => {
		const custom: FullIconCustomisations = mergeCustomisations(defaults, {
			inline: true,
			height: 'auto',
		});
		const icon: FullIconifyIcon = fullIcon({
			body: '<path d="" />',
		});
		const expected: IconifyIconBuildResult = {
			attributes: {
				width: '16',
				height: '16',
				viewBox: '0 0 16 16',
			},
			body: '<path d="" />',
			inline: true,
		};

		const result = iconToSVG(icon, custom);
		expect(result).toEqual(expected);
	});

	test('Custom size', () => {
		const custom: FullIconCustomisations = mergeCustomisations(defaults, {
			height: 'auto',
		});
		const icon: FullIconifyIcon = fullIcon({
			width: 20,
			height: 16,
			body: '<path d="..." />',
		});
		const expected: IconifyIconBuildResult = {
			attributes: {
				width: '20',
				height: '16',
				viewBox: '0 0 20 16',
			},
			body: '<path d="..." />',
		};

		const result = iconToSVG(icon, custom);
		expect(result).toEqual(expected);
	});

	test('Rotation', () => {
		const custom: FullIconCustomisations = mergeCustomisations(defaults, {
			height: '40px',
			rotate: 1,
		});
		const icon: FullIconifyIcon = fullIcon({
			width: 20,
			height: 16,
			body: '<path d="..." />',
		});
		const expected: IconifyIconBuildResult = {
			attributes: {
				width: '32px',
				height: '40px',
				viewBox: '0 0 16 20',
			},
			body: '<g transform="rotate(90 8 8)"><path d="..." /></g>',
		};

		const result = iconToSVG(icon, custom);
		expect(result).toEqual(expected);
	});

	test('Negative rotation', () => {
		const custom: FullIconCustomisations = mergeCustomisations(defaults, {
			height: '40px',
			rotate: -1,
		});
		const icon: FullIconifyIcon = fullIcon({
			width: 20,
			height: 16,
			body: '<path d="..." />',
		});
		const expected: IconifyIconBuildResult = {
			attributes: {
				width: '32px',
				height: '40px',
				viewBox: '0 0 16 20',
			},
			body: '<g transform="rotate(-90 10 10)"><path d="..." /></g>',
		};

		const result = iconToSVG(icon, custom);
		expect(result).toEqual(expected);
	});

	test('Flip', () => {
		const custom: FullIconCustomisations = mergeCustomisations(defaults, {
			height: '32',
			hFlip: true,
		});
		const icon: FullIconifyIcon = fullIcon({
			width: 20,
			height: 16,
			body: '<path d="..." />',
		});
		const expected: IconifyIconBuildResult = {
			attributes: {
				width: '40',
				height: '32',
				viewBox: '0 0 20 16',
			},
			body: '<g transform="translate(20 0) scale(-1 1)"><path d="..." /></g>',
		};

		const result = iconToSVG(icon, custom);
		expect(result).toEqual(expected);
	});

	test('Flip, rotation', () => {
		const custom: FullIconCustomisations = mergeCustomisations(defaults, {
			hFlip: true,
			rotate: 1,
		});
		const icon: FullIconifyIcon = fullIcon({
			width: 20,
			height: 16,
			body: '<path d="..." />',
		});
		const expected: IconifyIconBuildResult = {
			attributes: {
				width: '0.8em',
				height: '1em',
				viewBox: '0 0 16 20',
			},
			body: '<g transform="rotate(90 8 8) translate(20 0) scale(-1 1)"><path d="..." /></g>',
		};

		const result = iconToSVG(icon, custom);
		expect(result).toEqual(expected);
	});

	test('Flip icon that is rotated by default', () => {
		const custom: FullIconCustomisations = mergeCustomisations(defaults, {
			hFlip: true,
		});
		const icon: FullIconifyIcon = fullIcon({
			width: 20,
			height: 16,
			body: '<path d="..." />',
			rotate: 1,
		});

		// Horizontally flipping icon that has 90 or 270 degrees rotation will result in vertical flip.
		// Therefore result should be rotation + vertical flip to visually match horizontal flip on normal icon.
		const expected: IconifyIconBuildResult = {
			attributes: {
				width: '0.8em',
				height: '1em',
				viewBox: '0 0 16 20',
			},
			body: '<g transform="translate(16 0) scale(-1 1)"><g transform="rotate(90 8 8)"><path d="..." /></g></g>',
		};

		const result = iconToSVG(icon, custom);
		expect(result).toEqual(expected);
	});

	test('Flip and rotation canceling eachother', () => {
		const custom: FullIconCustomisations = mergeCustomisations(defaults, {
			width: '1em',
			height: 'auto',
			hFlip: true,
			vFlip: true,
			rotate: 2,
		});
		const icon: FullIconifyIcon = fullIcon({
			width: 20,
			height: 16,
			body: '<path d="..." />',
		});
		const expected: IconifyIconBuildResult = {
			attributes: {
				width: '1em',
				height: '16',
				viewBox: '0 0 20 16',
			},
			body: '<path d="..." />',
		};

		const result = iconToSVG(icon, custom);
		expect(result).toEqual(expected);
	});

	test('Flip with real icon', () => {
		const iconBody =
			'<g stroke="currentColor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" fill="none" fill-rule="evenodd"><path d="M40 64l48-48" class="animation-delay-0 animation-duration-10 animate-stroke stroke-length-102"/><path d="M40 64l48 48" class="animation-delay-0 animation-duration-10 animate-stroke stroke-length-102"/></g>';

		const custom: FullIconCustomisations = mergeCustomisations(
			defaults,
			{}
		);
		const icon: FullIconifyIcon = fullIcon({
			body: iconBody,
			width: 128,
			height: 128,
			hFlip: true,
		});
		const expected: IconifyIconBuildResult = {
			attributes: {
				width: '1em',
				height: '1em',
				viewBox: '0 0 128 128',
			},
			body:
				'<g transform="translate(128 0) scale(-1 1)">' +
				iconBody +
				'</g>',
		};

		const result = iconToSVG(icon, custom);
		expect(result).toEqual(expected);
	});
});
