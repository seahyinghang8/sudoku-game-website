'use client';

import {
  type SetStateAction,
  useMemo,
  useState,
  type Dispatch,
  useEffect,
} from 'react';
import { puzzle2 } from '@/lib/examples';
import { ThreeByThreeGrid } from '@/components/ThreeByThreeGrid';
import { UserInput } from '@/components/UserInput';

export function Board() {
  const [completed, setCompleted] = useState<boolean>(false);
  const [boardValues, setBoardValues] = useState<number[][]>(
    initialBoardValues(puzzle2.flat())
  );
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(
    null
  );
  const [prevSelectedCell, setPrevSelectedCell] = useState<[number, number]>([
    0, 0,
  ]);
  const [conflictingCellsSet, setConflictingCellsSet] = useState<Set<string>>(
    new Set()
  );
  const [keydownUserInput, setKeydownUserInput] = useState<number>(0);
  const [invalidUserInputSet, setInvalidUserInputSet] = useState<Set<number>>(
    new Set()
  );
  const lockedCellsSet = useMemo(() => getLockedCellRowCol(puzzle2.flat()), []);

  // Compute the invalid user inputs
  useEffect(() => {
    if (selectedCell === null) {
      // clear up the invalid input options
      setInvalidUserInputSet(new Set());
      return;
    }
    const [row, col] = selectedCell;
    if (lockedCellsSet.has(`${row},${col}`)) {
      // all inputs are invalid
      setInvalidUserInputSet(new Set(Array.from({ length: 10 }, (_, i) => i)));
      return;
    }
    const newInvalidUserInputSet = new Set<number>();
    const boxRowOffset = Math.floor(row / 3);
    const boxColOffset = Math.floor(col / 3);
    for (let i = 0; i < 9; i++) {
      // check row
      if (i !== row) {
        const sameRowCellValue = boardValues[i][col];
        newInvalidUserInputSet.add(sameRowCellValue);
      }
      // check col
      if (i !== col) {
        const sameColCellValue = boardValues[row][i];
        newInvalidUserInputSet.add(sameColCellValue);
      }
      // check box
      const boxRow = boxRowOffset * 3 + Math.floor(i / 3);
      const boxCol = boxColOffset * 3 + (i % 3);
      if (!(boxRow === row && boxCol === col)) {
        const sameBoxCellValue = boardValues[boxRow][boxCol];
        newInvalidUserInputSet.add(sameBoxCellValue);
      }
    }
    // remove 0 from the user input set
    newInvalidUserInputSet.delete(0);
    setInvalidUserInputSet(newInvalidUserInputSet);
  }, [selectedCell, boardValues, lockedCellsSet]);

  // Identify all conflicting cells
  useEffect(() => {
    const newConflictingCellsSet = new Set<string>();
    for (let i = 0; i < 9; i++) {
      const rowMap = new Map<number, string>();
      const colMap = new Map<number, string>();
      const boxMap = new Map<number, string>();
      for (let j = 0; j < 9; j++) {
        // check row
        const rowValue = boardValues[i][j];
        const rowConflict = rowMap.get(rowValue);
        if (rowConflict !== undefined) {
          newConflictingCellsSet.add(`${i},${j}`);
          newConflictingCellsSet.add(rowConflict);
        } else if (rowValue !== 0) {
          rowMap.set(rowValue, `${i},${j}`);
        }
        // check col
        const colValue = boardValues[j][i];
        const colConflict = colMap.get(colValue);
        if (colConflict !== undefined) {
          newConflictingCellsSet.add(`${j},${i}`);
          newConflictingCellsSet.add(colConflict);
        } else if (colValue !== 0) {
          colMap.set(colValue, `${j},${i}`);
        }
        // check box
        const boxRow = Math.floor(i / 3) * 3 + Math.floor(j / 3);
        const boxCol = (i % 3) * 3 + (j % 3);
        const boxValue = boardValues[boxRow][boxCol];
        const boxConflict = boxMap.get(boxValue);
        if (boxConflict !== undefined) {
          newConflictingCellsSet.add(`${boxRow},${boxCol}`);
          newConflictingCellsSet.add(boxConflict);
        } else if (boxValue !== 0) {
          boxMap.set(boxValue, `${boxRow},${boxCol}`);
        }
      }
    }
    setConflictingCellsSet(newConflictingCellsSet);
  }, [boardValues]);

  // Validate the board if all cells are filled
  useEffect(() => {
    if (boardValues.flat().includes(0)) return;
    const isValid = validateBoard(boardValues);
    if (isValid) {
      setCompleted(true);
      setSelectedCell(null);
    }
  }, [boardValues]);

  function handleKeyDown(event: React.KeyboardEvent) {
    if (completed) return;
    const key = event.key;
    // Using arrow keys OR wasd to move the selected cell
    if (key.match(/(^[wasd]$)|(^Arrow)/)) {
      moveSelectedCell(key, setSelectedCell, prevSelectedCell);
      return;
    }

    if (key === 'Escape') {
      unselectCell();
      return;
    }

    // User input that will alter the output
    if (key.match(/(^\d$)|(^Backspace$)/)) {
      let value;
      if (key === 'Backspace') {
        value = 0;
      } else {
        value = parseInt(key);
        // Ignore key events if value is not a number or not in the range 1-9
        if (isNaN(value)) return;
      }
      // Propagate keyboard selection to the user input
      setKeydownUserInput(value);
      setTimeout(() => {
        setKeydownUserInput(-1);
      }, 0);
      setSelectedCellValue(value);
    }
  }

  function handleInputClick(value: number) {
    setSelectedCellValue(value);
  }

  function setSelectedCellValue(value: number) {
    // Ignore the input no cells are selected
    if (!selectedCell) return;
    const [row, col] = selectedCell;
    const isLocked = lockedCellsSet.has(`${row},${col}`);
    // Do not set the board value if a locked cell is selected
    if (isLocked) return;
    setBoardValueWithRowCol(row, col, value, setBoardValues);
  }

  function handleCellClick(row: number, col: number) {
    setSelectedCell([row, col]);
  }

  function unselectCell() {
    if (selectedCell !== null) {
      setPrevSelectedCell(selectedCell);
    }
    setSelectedCell(null);
  }

  return (
    <div
      className='h-screen w-screen outline-0 flex flex-col items-center px-4 py-16'
      onKeyDown={handleKeyDown}
      tabIndex={0}
      // Unselect the cell when clicking outside the board
      onClick={() => unselectCell()}
      onBlur={() => unselectCell()}
    >
      <div
        className='flex flex-col items-center w-fit gap-5'
        onClick={(event) => event.stopPropagation()}
      >
        {/* Board */}
        <div className='border border-slate-300 grid grid-cols-3'>
          {Array.from({ length: 9 }, (_, i) => (
            <ThreeByThreeGrid
              key={i}
              boardValues={boardValues}
              lockedCellsSet={lockedCellsSet}
              selectedCell={selectedCell}
              conflictingCellsSet={conflictingCellsSet}
              gridIndex={i}
              completed={completed}
              onCellClick={handleCellClick}
            />
          ))}
        </div>
        {completed ? (
          // Display the completed message
          <div className='text-green-600 text-xl md:text-3xl'>
            🎉 Puzzle Solved! 🎉
          </div>
        ) : (
          <UserInput
            invalidUserInputSet={invalidUserInputSet}
            keydownUserInput={keydownUserInput}
            onInputClick={handleInputClick}
          />
        )}
      </div>
    </div>
  );
}

function initialBoardValues(initialValuesFlat: number[]): number[][] {
  return Array.from({ length: 9 }, (_, i) =>
    initialValuesFlat.slice(i * 9, i * 9 + 9)
  );
}

function getLockedCellRowCol(initialValuesFlat: number[]): Set<string> {
  const lockedCells = new Set<string>();
  for (const key in initialValuesFlat) {
    const idx = parseInt(key);
    const value = initialValuesFlat[idx];
    if (value !== 0) {
      const row = Math.floor(idx / 9);
      const col = idx % 9;
      lockedCells.add(`${row},${col}`);
    }
  }
  return lockedCells;
}

type SelectedCellSetter = Dispatch<SetStateAction<[number, number] | null>>;

function moveSelectedCell(
  key: string,
  selectedCellSetter: SelectedCellSetter,
  prevSelectedCell: [number, number]
) {
  selectedCellSetter((oldVal) => {
    if (oldVal === null) {
      oldVal = prevSelectedCell;
    }
    let [newRow, newCol] = oldVal;
    switch (key) {
      case 'ArrowUp':
      case 'w':
        newRow -= 1;
        break;
      case 'ArrowDown':
      case 's':
        newRow += 1;
        break;
      case 'ArrowLeft':
      case 'a':
        newCol -= 1;
        break;
      case 'ArrowRight':
      case 'd':
        newCol += 1;
        break;
    }
    return [(newRow + 9) % 9, (newCol + 9) % 9];
  });
}

type BoardValueSetter = Dispatch<SetStateAction<number[][]>>;

function setBoardValueWithRowCol(
  row: number,
  col: number,
  value: number,
  boardValueSetter: BoardValueSetter
) {
  boardValueSetter((prevBoardValues) => {
    const newBoardValues = [...prevBoardValues];
    newBoardValues[row] = [...prevBoardValues[row]];
    newBoardValues[row][col] = value;
    return newBoardValues;
  });
}

function validateBoard(board: number[][]): boolean {
  for (let i = 0; i < 9; i++) {
    let row = new Set(),
      col = new Set(),
      box = new Set();

    for (let j = 0; j < 9; j++) {
      let rowVal = board[i][j];
      let colVal = board[j][i];
      let boxVal =
        board[3 * Math.floor(i / 3) + Math.floor(j / 3)][3 * (i % 3) + (j % 3)];

      if (rowVal != 0) {
        if (row.has(rowVal)) return false;
        row.add(rowVal);
      }

      if (colVal != 0) {
        if (col.has(colVal)) return false;
        col.add(colVal);
      }

      if (boxVal != 0) {
        if (box.has(boxVal)) return false;
        box.add(boxVal);
      }
    }
  }
  return true;
}
