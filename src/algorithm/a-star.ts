import type { TNode } from '../types/node';

export function aStar(start: TNode, goal: TNode, grid: TNode[][]): TNode[] | null {
  const openSet: TNode[] = [start];
  const closedSet: TNode[] = [];
  // Initialize gScore and fScore values for start node
  start.gScore = 0;
  start.fScore = heuristic(start, goal);

  while (openSet.length > 0) {
    // Find the node with the lowest fScore in the openSet

    const current = openSet.reduce((minNode, node) =>
      node.fScore < minNode.fScore ? node : minNode
    );

    // If the current node is the goal node, reconstruct the path
    if (current === goal) {
      return reconstructPath(current);
    }

    // Remove the current node from the openSet and add it to the closedSet
    openSet.splice(openSet.indexOf(current), 1);
    closedSet.push(current);

    // Check each neighbor of the current node
    const neighbors = getNeighbors(grid, current);
    for (const neighbor of neighbors) {
      if (closedSet.includes(neighbor) || neighbor.isWall) {
        continue; // Skip neighbors in the closedSet or obstacles
      }

      // Calculate the tentative gScore for the neighbor
      const tentativeGScore = current.gScore + 1; // Assuming a uniform cost of 1 for movement between adjacent nodes

      if (!openSet.includes(neighbor)) {
        // Add the neighbor to the openSet if it's not already there
        openSet.push(neighbor);
      } else if (tentativeGScore >= neighbor.gScore) {
        continue; // This is not a better path, skip it
      }

      // Update the neighbor's properties
      neighbor.parent = current;
      neighbor.gScore = tentativeGScore;
      neighbor.hScore = heuristic(neighbor, goal);
      neighbor.fScore = neighbor.gScore + neighbor.hScore;
    }
  }

  // No path found
  return null;
}

function heuristic(node: TNode, goal: TNode): number {
  // Calculate the Manhattan distance between two nodes as the heuristic
  return Math.abs(node.x - goal.x) + Math.abs(node.y - goal.y);
}

function getNeighbors(grid: TNode[][], node: TNode): TNode[] {
  const neighbors: TNode[] = [];
  const numRows = grid.length;
  const numCols = grid[0].length;

  // Check adjacent cells (up, down, left, right)
  const directions = [
    { dx: -1, dy: 0 }, // Up
    { dx: 1, dy: 0 }, // Down
    { dx: 0, dy: -1 }, // Left
    { dx: 0, dy: 1 } // Right
  ];

  for (const dir of directions) {
    const newRow = node.x + dir.dx;
    const newCol = node.y + dir.dy;

    if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
      neighbors.push(grid[newRow][newCol]);
    }
  }

  return neighbors;
}

function reconstructPath(node: TNode): TNode[] {
  const path: TNode[] = [node];

  while (node.parent) {
    node = node.parent;
    path.unshift(node);
  }

  return path;
}
