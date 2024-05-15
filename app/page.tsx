import { HARDCODED_PUZZLE_IDS } from '@/lib/puzzle';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function Page() {
  const supabase = createClient();

  // Redirect to a random puzzle
  const { data } = await supabase.from('sudoku_puzzles').select('id');

  if (data && data.length > 0) {
    const randomPuzzleId = data[Math.floor(Math.random() * data.length)].id;
    redirect(`/puzzle/${randomPuzzleId}`);
  } else {
    // No puzzles found - return a random hardcoded puzzle id
    const randomPuzzleId =
      HARDCODED_PUZZLE_IDS[
        Math.floor(Math.random() * HARDCODED_PUZZLE_IDS.length)
      ];
    redirect(`/puzzle/${randomPuzzleId}`);
  }
}
