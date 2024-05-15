import { createClient } from '@/lib/supabase/server';

export default async function Page() {
  const supabase = createClient();

  // Redirect to a random puzzle
  const { data } = await supabase.from('sudoku_puzzles').select('id');
  console.log(data);
  return null;
}
