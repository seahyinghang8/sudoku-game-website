import { Board } from '@/components/Board';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data } = await supabase
    .from('sudoku_puzzles')
    .select('puzzle')
    .eq('id', params.id);

  // If the puzzle is not found, return a 404
  if (!data || data.length === 0) {
    return notFound();
  }

  const puzzleStr = data![0].puzzle as string;

  return <Board puzzleStr={puzzleStr} />;
}
