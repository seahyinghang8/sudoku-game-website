'use client';
import { cn } from '@/lib/utils';
import { useEffect, useState, type PropsWithChildren } from 'react';

export interface TileProps {
  onClick?: () => void;
  selected: boolean;
  invalid: boolean;
}
export function Tile({
  children,
  onClick,
  selected,
  invalid,
}: PropsWithChildren<TileProps>) {
  const [justSelected, setJustSelected] = useState(false);

  useEffect(() => {
    if (selected) {
      toggleSelection();
    }
  }, [selected]);

  function toggleSelection() {
    setJustSelected(true);
    setTimeout(() => setJustSelected(false), 75);
  }

  return (
    <div
      className={cn(
        'w-[15vw] max-w-24 md:w-[7.5vw] md:max-w-16 ' +
          'transition-transform duration-75 ease-out ' +
          'aspect-square rounded border-2 ' +
          'text-lg min-[300px]:text-2xl min-[500px]:text-3xl md:text-2xl ' +
          'flex justify-center items-center ' +
          'select-none cursor-pointer',
        {
          'hover:bg-sky-200': !invalid,
        },
        {
          'scale-110 bg-sky-200': justSelected && !invalid,
        },
        {
          'bg-red-100 hover:bg-red-200': invalid,
        },
        {
          'scale-110 bg-red-200': justSelected && invalid,
        }
      )}
      onMouseDown={() => {
        toggleSelection();
      }}
      onClick={() => {
        onClick && onClick();
      }}
    >
      {children}
    </div>
  );
}
