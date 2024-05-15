// Hardcoded puzzle string in the case where no puzzles are found in the database / supabase is down
export const HARDCODED_PUZZLES: Record<string, string> = {
  '1': '4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......',
  '2': '8..6..9.5.............2.31...7318.6.24.....73...........279.1..5...8..36..3......',
  '3': '5...8..49...5...3..673....115..........2.8..........187....415..3...2...49..5...3',
  '4': '1....7.9..3..2...8..96..5....53..9...1..8...26....4...3......1..4......7..7...3..',
  '5': '..............3.85..1.2.......5.7.....4...1...9.......5......73..2.1........4...9',
};

export const HARDCODED_PUZZLE_IDS = Object.keys(HARDCODED_PUZZLES);