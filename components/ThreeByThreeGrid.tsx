'use client';

import { Cell, CellState } from '@/components/Cell';

interface ThreeByThreeGridProps {
  // Takes in 9x9 values and states of the entire board
  // This moves the logic of determining the relevant cells to the grid,
  // simplifying the board component since the 3x3 grid is merely for bordering purposes
  boardValues: number[][];
  // Set of locked cells to highlight
  lockedCellsSet: Set<string>;
  // Selected cell to highlight
  selectedCell: [number, number] | null;
  // Set of conflicting cells to highlight
  conflictingCellsSet: Set<string>;
  // Position of the grid in the board to determine the relevant cells which can be 0 to 8.
  gridIndex: number;
  // If the board is completed
  completed: boolean;
  // Returns the row and column of the entire board
  onCellClick?: (row: number, col: number) => void;
}

export function ThreeByThreeGrid({
  boardValues,
  lockedCellsSet,
  selectedCell,
  conflictingCellsSet,
  gridIndex,
  completed,
  onCellClick,
}: ThreeByThreeGridProps) {
  let selectedRow = -1;
  let selectedCol = -1;
  if (selectedCell) {
    selectedRow = selectedCell[0];
    selectedCol = selectedCell[1];
  }
  const offsetRow = Math.floor(gridIndex / 3) * 3;
  const offsetCol = (gridIndex % 3) * 3;
  return (
    <div className='border border-slate-300 grid grid-cols-3'>
      {Array.from({ length: 9 }, (_, i) => {
        const row = offsetRow + Math.floor(i / 3);
        const col = offsetCol + (i % 3);

        const isLocked = lockedCellsSet.has(`${row},${col}`);
        const isConflicting = conflictingCellsSet.has(`${row},${col}`);
        let cellState = CellState.Normal;
        if (completed) {
          cellState = CellState.Completed;
        } else {
          if (row === selectedRow || col === selectedCol) {
            cellState =
              row === selectedRow && col === selectedCol
                ? CellState.Selected
                : CellState.Highlighted;
          }
        }
        return (
          <Cell
            key={i}
            value={boardValues[row][col]}
            state={cellState}
            locked={isLocked}
            conflicting={isConflicting}
            onCellClick={() => onCellClick && onCellClick(row, col)}
          />
        );
      })}
    </div>
  );
}
