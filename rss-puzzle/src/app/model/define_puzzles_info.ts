import { PuzzleInfo, PuzzleType } from '../../interfaces';

export default function definePuzzlesInfo(words: string[]): PuzzleInfo[] {
  const wordsDuplicate: string[] = words;
  const result: PuzzleInfo[] = wordsDuplicate.map((word: string, index: number): PuzzleInfo => {
    if (index === 0) {
      const puzzleInfo: PuzzleInfo = {
        word,
        puzzleType: PuzzleType.Start,
        index
      };
      return puzzleInfo;
    }
    if (index === words.length - 1) {
      const puzzleInfo: PuzzleInfo = {
        word,
        puzzleType: PuzzleType.End,
        index
      };
      return puzzleInfo;
    }
    const puzzleInfo: PuzzleInfo = {
      word,
      puzzleType: PuzzleType.Middle,
      index
    };
    return puzzleInfo;
  });
  return result;
}
