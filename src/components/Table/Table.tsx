import type { TableProps } from './TableProps';

const Table = ({ coordinates }: TableProps) => {
  return (
    <div style={{ display: 'flex', margin: '20px' }}>
      <div style={{ flex: 1 }}>
        <div style={{ flex: 1 }}>A</div>

        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>Path</div>
          <div style={{ flex: 1 }}>Time</div>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>{coordinates.length}</div>
          <div style={{ flex: 1 }}>Time</div>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ flex: 1 }}>B</div>

        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>Path</div>
          <div style={{ flex: 1 }}>Time</div>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ flex: 1 }}>C</div>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>Path</div>
          <div style={{ flex: 1 }}>Time</div>
        </div>
      </div>
    </div>
  );
};

export default Table;
