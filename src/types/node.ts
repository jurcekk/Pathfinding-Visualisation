export interface TNode {
  id: string;
  x: number;
  y: number;
  gScore: number; //Suma fscore
  hScore: number; //Vrednost koja je potreba da se ode od startnog do krajnjeg node
  fScore: number; //Cena odlaska od startnog node do trenutnog
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  isVisited: boolean;
  parent?: TNode;
}
