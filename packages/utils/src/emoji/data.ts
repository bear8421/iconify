/**
 * Various codes
 */

// Joiner in emoji sequences
export const joinerEmoji = 0x200d;

// Emoji as icon
export const vs16Emoji = 0xfe0f;

// Keycap, preceeded by mandatory VS16 for full emoji
export const keycapEmoji = 0x20e3;

/**
 * Variations, UTF-32
 *
 * First value in array is minimum, second value is maximum+1
 */
type Range = [number, number];
export const emojiTones: Range[] = [
	// Skin tones
	[0x1f3fb, 0x1f400],
	// Hair tones
	[0x1f9b0, 0x1f9b4],
];

/**
 * Minimum UTF-32 number
 */
export const minUTF32 = 0x10000;

/**
 * Codes for UTF-32 characters presented as UTF-16
 *
 * startUTF32Pair1 <= code < startUTF32Pair2 -> code for first character in pair
 * startUTF32Pair2 <= code < endUTF32Pair -> code for second character in pair
 */
export const startUTF32Pair1 = 0xd800;
export const startUTF32Pair2 = 0xdc00;
export const endUTF32Pair = 0xe000;
