// Word-level caption data.
//
// Timings are derived from real audio: ffmpeg silencedetect on the source
// clip gave the 7 actual speech segments (pauses between phrases), then each
// word's start/end inside its segment is split proportionally by character
// length. So every timestamp traces back to the source audio, not a guess.
export type CaptionWordData = {
  text: string;
  start: number; // frame, inclusive
  end: number; // frame, exclusive
};

export type CaptionGroupData = {
  words: CaptionWordData[];
};

export const captionGroups: CaptionGroupData[] = [
  {
    words: [
      {text: 'Три', start: 21, end: 27},
      {text: 'признака', start: 27, end: 45},
      {text: 'того,', start: 45, end: 53},
    ],
  },
  {
    words: [
      {text: 'что', start: 58, end: 61},
      {text: 'вы', start: 61, end: 64},
      {text: 'используете', start: 64, end: 78},
      {text: 'чат', start: 78, end: 82},
    ],
  },
  {
    words: [
      {text: 'GPT', start: 88, end: 92},
      {text: 'неправильно.', start: 92, end: 105},
    ],
  },
  {
    words: [{text: 'Первый,', start: 116, end: 126}],
  },
  {
    words: [
      {text: 'вы', start: 131, end: 134},
      {text: 'нифига', start: 134, end: 143},
      {text: 'не', start: 143, end: 146},
      {text: 'умеете.', start: 146, end: 155},
    ],
  },
  {
    words: [{text: 'Второй,', start: 164, end: 174}],
  },
  {
    words: [
      {text: 'вы', start: 180, end: 184},
      {text: 'тоже', start: 184, end: 192},
      {text: 'умеете.', start: 192, end: 204},
    ],
  },
];
