'use client';

import { Tile } from '@/components/Tile';

interface UserInputProps {
  keydownUserInput: number;
  invalidUserInputSet: Set<number>;
  onInputClick?: (value: number) => void;
}

export function UserInput({
  keydownUserInput,
  invalidUserInputSet,
  onInputClick,
}: UserInputProps) {
  return (
    <div className='grid grid-cols-5 md:grid-cols-10 max-w-screen-md gap-2'>
      {Array.from({ length: 9 }, (_, i) => (
        <Tile
          key={i}
          onClick={() => onInputClick && onInputClick(i + 1)}
          selected={keydownUserInput === i + 1}
          invalid={invalidUserInputSet.has(i + 1)}
        >
          {i + 1}
        </Tile>
      ))}
      <Tile
        selected={keydownUserInput === 0}
        onClick={() => onInputClick && onInputClick(0)}
        invalid={invalidUserInputSet.has(0)}
      >
        <DeleteSVG className='min-[500px]:w-10 min-[500px]:h-10 min-[300px]:w-8 min-[300px]:h-8' />
      </Tile>
    </div>
  );
}

interface SVGProps {
  className?: string;
}

function DeleteSVG({ className = '' }: SVGProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='22'
      height='22'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z' />
      <line x1='18' x2='12' y1='9' y2='15' />
      <line x1='12' x2='18' y1='9' y2='15' />
    </svg>
  );
}
