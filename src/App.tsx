import { useState } from 'react';
import { aStar } from './algorithm/a-star';
//components
import Grid from './components/Grid/Grid';
import MyForm from './components/MyForm/MyForm';
//types
import type { Coordinates } from './types/coordinates';
import type { InitValues } from './types/initValues';
import type { TNode } from './types/node';
import type { ResultCoordinates } from './types/resultCoordinates';
//styles
import './App.css';

function App() {
  const [grid, setGrid] = useState<TNode[][]>([]);
  const [coordinates, setCoordinates] = useState<ResultCoordinates[]>([]);
  const [initValues, setInitValues] = useState<InitValues>({} as InitValues);
  const [startTime, setStartTime] = useState<number>(0);

  const generateRandomNumber = () => Math.floor(Math.random() * initValues.matrixSize);

  const clearWalls = (grid: TNode[][]) => {
    let cleanGrid = grid;
    cleanGrid = cleanGrid.map((row) =>
      row.map((item) => {
        if (item.isWall) {
          return { ...item, isWall: false };
        }
        return item;
      })
    );
    return cleanGrid;
  };

  const initWalls = (grid: TNode[][]) => {
    const newGrid = clearWalls(grid);
    const wallsArr: Coordinates[][] = [];
    for (let i = 0; i < initValues?.BO; i++) {
      let row = generateRandomNumber();
      let col = generateRandomNumber();
      let node: TNode = newGrid[row][col];
      if (node.isWall || node.isStart || node.isEnd || node.isVisited) {
        i--;
        continue;
      } else {
        const newNode = {
          ...node,
          isWall: true
        };
        newGrid[row][col] = newNode;

        let wallCoord: Coordinates[] = [{ x: row, y: col }];
        wallsArr.push(wallCoord);
      }
    }
    const element = document.querySelectorAll('.node-shortest-path');
    element.forEach((item) => {
      item.classList.remove('node-shortest-path');
    });

    setCoordinates([
      {
        movingObjectCoordinates: [initValues.start],
        blockingObjectCoordinates: [...wallsArr]
      }
    ]);
    setGrid(newGrid);

    visualizePath(initValues.start, initValues.end, newGrid);
  };

  const animateShortestPath = (path: TNode[]) => {
    for (let i = 1; i < path.length - 1; i++) {
      setTimeout(() => {
        const node = path[i];
        const coord = { x: node.x, y: node.y };
        setCoordinates((prevState) => [
          ...prevState,
          {
            movingObjectCoordinates: [coord],
            blockingObjectCoordinates: prevState[0].blockingObjectCoordinates
          }
        ]);

        const nodeElement = document.getElementById(`node-${node.x}-${node.y}`);
        if (nodeElement) {
          nodeElement.classList.add('node-shortest-path');
        }
      }, i * 50);
    }
  };

  const visualizePath = (start: Coordinates, end: Coordinates, grid: TNode[][]) => {
    const startNode = grid[start?.x][start?.y]!;
    const endNode = grid[end?.x][end?.y]!;

    const path = aStar(startNode, endNode, grid)!;

    if (path) {
      animateShortestPath(path);
    } else {
      const newValues = initValues;
      newValues.BO = +newValues.BO - 1;
      setInitValues(newValues);
      initWalls(grid);
    }
  };

  return (
    <div className="App">
      <MyForm
        setGrid={setGrid}
        setInitValues={setInitValues}
        initValues={initValues}
        setStartTime={setStartTime}
        setCoordinates={setCoordinates}
      />

      <Grid grid={grid} />

      {grid.length > 0 ? (
        <button
          onClick={() => {
            setStartTime(new Date().getTime());
            if (Object.keys(initValues).length > 0) {
              initWalls(grid);
            }
          }}
        >
          Generate walls
        </button>
      ) : null}

      <h1>{coordinates.length.toString() + ' Steps'}</h1>
      <h1>{`${((startTime === 0 ? 0 : new Date().getTime() - startTime) / 1000).toFixed(
        2
      )} seconds`}</h1>
    </div>
  );
}

export default App;
