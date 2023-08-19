import type { Coordinates } from './coordinates';

export interface ResultCoordinates {
  movingObjectCoordinates: Coordinates[];
  blockingObjectCoordinates: Coordinates[][];
}
