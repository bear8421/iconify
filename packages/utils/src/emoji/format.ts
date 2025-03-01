import {
	convertEmojiSequenceToUTF16,
	convertEmojiSequenceToUTF32,
} from './convert';

export interface UnicodeFormattingOptions {
	// Prefix before each character '\\u'
	prefix: string;

	// Separator between characters
	separator: string;

	// Case conversion
	case: 'upper' | 'lower';

	// UTF conversion
	format: 'utf-32' | 'utf-16';

	// Add '0' for code shorter than 4 letters
	add0: boolean;

	// Throw on error
	throwOnError: boolean;
}

const defaultUnicodeOptions: UnicodeFormattingOptions = {
	prefix: '',
	separator: '',
	case: 'lower',
	format: 'utf-32',
	add0: false,
	throwOnError: true,
};

/**
 * Convert number to string
 */
function convert(
	sequence: number[],
	options: UnicodeFormattingOptions
): string {
	const prefix = options.prefix;
	const func = options.case === 'upper' ? 'toUpperCase' : 'toLowerCase';

	const cleanSequence =
		options.format === 'utf-16'
			? convertEmojiSequenceToUTF16(sequence)
			: convertEmojiSequenceToUTF32(sequence, options.throwOnError);

	return cleanSequence
		.map((code) => {
			let str = code.toString(16);
			if (options.add0 && str.length < 4) {
				str = '0'.repeat(4 - str.length) + str;
			}
			return prefix + str[func]();
		})
		.join(options.separator);
}

/**
 * Convert unicode number to string
 */
export function getEmojiUnicodeString(
	code: number,
	options: Partial<UnicodeFormattingOptions> = {}
): string {
	return convert([code], {
		...defaultUnicodeOptions,
		...options,
	});
}

const defaultSequenceOptions: UnicodeFormattingOptions = {
	...defaultUnicodeOptions,
	separator: '-',
};

/**
 * Convert unicode numbers sequence to string
 */
export function getEmojiSequenceString(
	sequence: number[],
	options: Partial<UnicodeFormattingOptions> = {}
): string {
	return convert(sequence, {
		...defaultSequenceOptions,
		...options,
	});
}

const keywordOptions: UnicodeFormattingOptions = {
	prefix: '',
	separator: '-',
	case: 'lower',
	format: 'utf-32',
	add0: true,
	throwOnError: true,
};

/**
 * Merge unicode numbers sequence as icon keyword
 */
export function emojiSequenceToKeyword(
	sequence: number[],
	throwOnError = true
): string {
	return convert(sequence, {
		...keywordOptions,
		throwOnError,
	});
}
