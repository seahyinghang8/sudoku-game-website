'use client';

import { Tile } from '@/components/Tile';
import { DeleteSVG } from '@/components/SVG';

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
