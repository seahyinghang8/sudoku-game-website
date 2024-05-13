'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export enum CellState {
  Normal,
  Selected,
  Highlighted,
  Completed,
}

export interface CellProps {
  // value of the cell
  // valid value range 0-9
  // value = 0 is used to denote an empty cell
  value: number;
  state: CellState;
  locked: boolean;
  conflicting: boolean;
  // onClick handler for the cell
  onCellClick?: () => void;
}

export function Cell({
  value,
  state,
  locked,
  conflicting,
  onCellClick,
}: CellProps) {
  const [justSelected, setJustSelected] = useState(false);

  const isEmpty = value === 0;
  const displayValue = isEmpty ? <>&nbsp;</> : value;

  // Validate cell state
  if (value < 0 || value > 9) {
    throw Error(`Cell expects value of 0 - 9 but got ${value}.`);
  }

  if (isEmpty && locked) {
    throw Error(
      `Cell is locked and expects a value within 1 - 9 but got ${value}.`
    );
  }

  useEffect(() => {
    if (state === CellState.Selected) {
      toggleSelection();
    }
  }, [state]);

  function toggleSelection() {
    setJustSelected(true);
    setTimeout(() => setJustSelected(false), 75);
  }

  return (
    <div
      className={cn(
        'w-[9vw] max-w-20 aspect-square ' +
          'transition-transform duration-75 ease-out ' +
          'border border-slate-300 ' +
          'max-[300px]:text-sm text-xl sm:text-3xl ' +
          'flex justify-center items-center ' +
          'select-none cursor-pointer ',

        {
          'scale-110': justSelected,
        },
        {
          'hover:bg-sky-300':
            state === CellState.Normal && !locked && !conflicting,
        },
        {
          'bg-red-200 hover:bg-red-300':
            (state === CellState.Normal || state == CellState.Highlighted) &&
            !locked &&
            conflicting,
        },
        {
          'bg-slate-200': state === CellState.Normal && locked && !conflicting,
        },
        {
          'bg-yellow-200': state === CellState.Normal && locked && conflicting,
        },
        {
          'bg-sky-300': state === CellState.Selected && !locked && !conflicting,
        },
        {
          'bg-red-300': state === CellState.Selected && !locked && conflicting,
        },
        {
          'bg-indigo-200':
            state === CellState.Selected && locked && !conflicting,
        },
        {
          'bg-amber-300': state === CellState.Selected && locked && conflicting,
        },
        {
          'bg-sky-100 hover:bg-sky-300':
            state === CellState.Highlighted && !locked && !conflicting,
        },
        {
          'bg-indigo-100':
            state === CellState.Highlighted && locked && !conflicting,
        },
        {
          'bg-amber-200':
            state === CellState.Highlighted && locked && conflicting,
        },
        {
          'bg-green-200': state === CellState.Completed,
        }
      )}
      onMouseDown={() => {
        toggleSelection();
      }}
      onClick={() => {
        onCellClick && onCellClick();
      }}
    >
      {displayValue}
    </div>
  );
}
