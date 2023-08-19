import type { InitValues } from '../../types/initValues';
import type { TNode } from '../../types/node';
import type { ResultCoordinates } from '../../types/resultCoordinates';

export interface MyFormProps {
  setGrid: React.Dispatch<React.SetStateAction<TNode[][]>>;
  setInitValues: React.Dispatch<React.SetStateAction<InitValues>>;
  initValues: InitValues;
  setStartTime: React.Dispatch<React.SetStateAction<number>>;
  setCoordinates: React.Dispatch<React.SetStateAction<ResultCoordinates[]>>;
}
