import type { GridProps } from './gridProps';
import './grid.css';

const Grid = ({ grid }: GridProps) => {
  return (
    <div className="grid">
      {grid.map((row, index) => {
        return (
          <div key={index} style={{ display: 'flex' }}>
            {row.map((item) => {
              return (
                <div
                  id={`node-${item.x}-${item.y}`}
                  className={
                    item.isStart
                      ? 'node-start'
                      : item.isEnd
                      ? 'node-end'
                      : item.isWall
                      ? 'node-wall'
                      : item.isVisited
                      ? 'node-shortest-path'
                      : 'node'
                  }
                  key={`node-${item.x}-${item.y}`}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
