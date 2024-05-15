'use client';
import { PuzzleSVG, RotateCCWSVG } from '@/components/SVG';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';

interface GameOverallControlsProps {
  resetBoard?: () => void;
}
export function GameOverallControls({ resetBoard }: GameOverallControlsProps) {
  const [resetBoardJustSelected, setResetBoardJustSelected] =
    useState<boolean>(false);

  return (
    <div className='flex items-center justify-between gap-8 w-full'>
      <Link
        href={`/?cache-buster=${Date.now()}`}
        className={cn(
          'flex items-center gap-2 text-base sm:text-lg md:text-xl rounded text-violet-500 hover:text-violet-600 focus:scale-110 transition-colors transition-transform duration-75'
        )}
      >
        <PuzzleSVG />
        New Puzzle
      </Link>
      <button
        onClick={() => {
          setResetBoardJustSelected(true);
          setTimeout(() => setResetBoardJustSelected(false), 75);
          resetBoard && resetBoard();
        }}
        className={cn(
          'flex items-center gap-2 text-base sm:text-lg md:text-xl rounded text-violet-500 hover:text-violet-600 transition-colors transition-transform duration-75',
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
