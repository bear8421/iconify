/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
	getEmojiSequenceString,
	emojiSequenceToKeyword,
} from '../lib/emoji/format';

describe('Testing formatting emoji code points', () => {
	it('Empty sequence', () => {
		const sequence: number[] = [];
		expect(getEmojiSequenceString(sequence)).toBe('');
		expect(emojiSequenceToKeyword(sequence)).toBe('');
	});

	it('Keycap sequence', () => {
		const sequence: number[] = [0x23, 0xfe0f, 0x20e3];

		expect(getEmojiSequenceString(sequence)).toBe('23-fe0f-20e3');
		expect(emojiSequenceToKeyword(sequence)).toBe('0023-fe0f-20e3');
	});

	it('UTF-16 sequence', () => {
		const sequence: number[] = [
			0xd83d, 0xdc41, 0xfe0f, 0x200d, 0xd83d, 0xdde8, 0xfe0f,
		];

		// UTF-32 = 0x1f441, 0xfe0f, 0x200d, 0x1f5e8, 0xfe0f
		expect(getEmojiSequenceString(sequence)).toBe(
			'1f441-fe0f-200d-1f5e8-fe0f'
		);
		expect(emojiSequenceToKeyword(sequence)).toBe(
			'1f441-fe0f-200d-1f5e8-fe0f'
		);
	});

	it('UTF-32 sequence', () => {
		const sequence: number[] = [0x1f441, 0xfe0f, 0x200d, 0x1f5e8, 0xfe0f];

		// UTF-16 = 0xd83d, 0xdc41, 0xfe0f, 0x200d, 0xd83d, 0xdde8, 0xfe0f,
		expect(getEmojiSequenceString(sequence)).toBe(
			'1f441-fe0f-200d-1f5e8-fe0f'
		);
		expect(emojiSequenceToKeyword(sequence)).toBe(
			'1f441-fe0f-200d-1f5e8-fe0f'
		);
	});
});
