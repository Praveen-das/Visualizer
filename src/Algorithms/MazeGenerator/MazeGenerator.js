export default async function mazeGenerator(grid) {
    const INITIAL_CELL = grid[0] && grid[0][0]
    INITIAL_CELL.visited = true
    let visitedCells = [INITIAL_CELL],
        stack = [],
        wall,
        nextCell

    for (let rows of grid) {
        for (let cell of rows) {
            cell.wall = true
        }
    }

    try {
        for (let cell of visitedCells) {
            if (cell == null) break
            cell.wall = false
            cell.visited = true
            let neighbourCells = [
                grid[cell.y + 2] && grid[cell.y + 2][cell.x],
                grid[cell.y + 2] && grid[cell.y + 2][cell.x],
                grid[cell.y] && grid[cell.y][cell.x - 2],
                grid[cell.y] && grid[cell.y][cell.x + 2],
                grid[cell.y - 2] && grid[cell.y - 2][cell.x]
            ]
            neighbourCells = neighbourCells.filter(o => o && !o.visited)
            nextCell = neighbourCells[index(neighbourCells.length)]
            if (!nextCell) {
                visitedCells.push(stack.pop())
                continue
            }
            if (cell.x === nextCell.x) {
                if ((cell.y - nextCell.y) < 0) {
                    wall = grid[cell.y + 1][cell.x]
                } else {
                    wall = grid[cell.y - 1][cell.x]
                }
            }
            if (cell.y === nextCell.y) {
                if ((cell.x - nextCell.x) < 0) {
                    wall = grid[cell.y][cell.x + 1]
                } else {
                    wall = grid[cell.y][cell.x - 1]
                }
            }
            stack.push(cell)
            wall.wall = false
            nextCell.visited = true
            visitedCells.push(nextCell)
        }
    } catch (error) {
        console.log(error);
    }

    for (let rows of grid) {
        for (let cell of rows) {
            if (cell.wall) {
                cell.cell.classList.add('wall')
            }
            cell.visited = false
            cell.previousCell = null
        }
        await new Promise(res => setTimeout(() => res(), 50))
    }
}

function index(maxValue) {
    let random = (Math.floor((Math.random() * 10) % maxValue))
    return random
}
