'use client';
import { PuzzleSVG, RotateCCWSVG } from '@/components/SVG';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface GameOverallControlsProps {
  resetBoard?: () => void;
  newPuzzle?: () => void;
}
export function GameOverallControls({
  resetBoard,
  newPuzzle,
}: GameOverallControlsProps) {
  const [newPuzzleJustSelected, setNewPuzzleJustSelected] =
    useState<boolean>(false);
  const [resetBoardJustSelected, setResetBoardJustSelected] =
    useState<boolean>(false);

  return (
    <div className='flex items-center justify-between gap-8 w-full'>
      <button
        onClick={() => {
          setNewPuzzleJustSelected(true);
          setTimeout(() => setNewPuzzleJustSelected(false), 75);
          newPuzzle && newPuzzle();
        }}
        className={cn(
          'flex items-center gap-2 text-xl rounded text-violet-400 hover:text-violet-600 transition-colors transition-transform duration-75',
          {
            'scale-110': newPuzzleJustSelected,
          }
        )}
      >
        <PuzzleSVG />
        New Puzzle
      </button>
      <button
        onClick={() => {
          setResetBoardJustSelected(true);
          setTimeout(() => setResetBoardJustSelected(false), 75);
          resetBoard && resetBoard();
        }}
        className={cn(
          'flex items-center gap-2 text-xl rounded text-violet-400 hover:text-violet-600 transition-colors transition-transform duration-75',
          {
            'scale-110': resetBoardJustSelected,
          }
        )}
      >
        <RotateCCWSVG />
        Reset Board
      </button>
    </div>
  );
}
