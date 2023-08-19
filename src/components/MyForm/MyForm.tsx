import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
//types
import type { MyFormProps } from './myFormProps';
import type { InitValues } from '../../types/initValues';
import type { TNode } from '../../types/node';
//styles
import './myForm.css';

const MyForm = ({
  setGrid,
  setInitValues,
  initValues,
  setStartTime,
  setCoordinates
}: MyFormProps) => {
  const defaultValues: InitValues = {
    matrixSize: Number(process.env.REACT_APP_MATRIX_SIZE),
    start: {
      x: Number(process.env.REACT_APP_START_X),
      y: Number(process.env.REACT_APP_START_Y)
    },
    end: {
      x: Number(process.env.REACT_APP_END_X),
      y: Number(process.env.REACT_APP_END_Y)
    },
    BO: Number(process.env.REACT_APP_NUMBER_OF_BO)
  };

  const { register, handleSubmit, watch } = useForm<InitValues>({
    defaultValues: defaultValues
  });

  const size = watch('matrixSize');

  const onSubmit = (data: InitValues) => {
    setInitValues(data);
    initNodes(data);
    setStartTime(0);
    setCoordinates([]);
    const element = document.querySelectorAll('.node-shortest-path');
    element.forEach((item) => {
      item.classList.remove('node-shortest-path');
    });
  };

  const initNodes = (data: InitValues) => {
    data = Object.keys(data).length === 0 ? defaultValues : data;
    const currentGrid = [];
    for (let row = 0; row < data.matrixSize; row++) {
      const currentRow: TNode[] = [];
      for (let col = 0; col < data.matrixSize; col++) {
        currentRow.push({
          id: `node-${row}-${col}`,
          x: row,
          y: col,
          gScore: 0,
          hScore: 0,
          fScore: 0,
          isStart: +data.start.x === row && +data.start.y === col,
          isEnd: +data.end.x === row && +data.end.y === col,
          isWall: false,
          parent: undefined,
          isVisited: false
        });
      }
      currentGrid.push(currentRow);
    }
    setGrid(currentGrid);
  };

  useEffect(() => {
    initNodes(initValues);
    setInitValues(defaultValues);
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label className="label">
          Matrix size:
          <input type="number" {...register('matrixSize', { required: true })} className="input" />
        </label>
        <br />
        <div style={{ display: 'flex' }}>
          <label className="label">
            Start X:
            <input
              type="number"
              {...register('start.x', {
                required: true,
                min: 0,
                max: size - 1
              })}
              className="input"
            />
          </label>
          <label className="label">
            Start Y:
            <input
              type="number"
              {...register('start.y', {
                required: true,
                min: 0,
                max: size - 1
              })}
              className="input"
            />
          </label>
        </div>
        <br />
        <div style={{ display: 'flex' }}>
          <label className="label">
            End X:
            <input
              type="number"
              {...register('end.x', { required: true, min: 0, max: size - 1 })}
              className="input"
            />
          </label>
          <br />
          <label className="label">
            End Y:
            <input
              type="number"
              {...register('end.y', { required: true, min: 0, max: size - 1 })}
              className="input"
            />
          </label>
        </div>
        <br />
        <label className="label">
          Number of BO's:
          <input
            type="number"
            {...register('BO', {
              required: true,
              min: 0,
              max: size * size - 2
            })}
            className="input"
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default MyForm;
