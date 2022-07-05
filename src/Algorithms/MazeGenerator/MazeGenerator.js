export default function mazeGenerator(grid) {
    const START_CELL = grid[0] && grid[0][0]
    let unvisitedCells = [],
        visitedCells = [START_CELL]

    for (let rows of grid) {
        for (let cell of rows) {
            cell.cell.classList.add('wall')
            cell.wall = true
            if (cell.point1 || cell.point2) {
                cell.cell.classList.remove('wall')
                cell.wall = false
            }
            unvisitedCells.push(cell)
        }
    }

        for (let cell of visitedCells) {
            if (cell == null) break
            let neighbourCells = getNeighbourCells()
            function getNeighbourCells() {
                let nextCell = [
                    grid[cell.y] && grid[cell.y][cell.x - 1],
                    grid[cell.y] && grid[cell.y][cell.x + 1],
                    grid[cell.y + 1] && grid[cell.y + 1][cell.x],
                    grid[cell.y - 1] && grid[cell.y - 1][cell.x]
                ]
                if (nextCell.filter(o => o && (o.visited && !o.deadEnd)).length > 1) {
                    cell.visited = true
                    // cell.deadEnd = true
                    return [cell.previousCell]
                }
                if (nextCell.filter(o => o && !o.visited).length === 0) {
                    cell.deadEnd = true
                    return [cell.previousCell]
                }
                return nextCell.filter(o => o && ((!o.visited && !o.deadEnd)))
            }
            let nextCell = neighbourCells[index(neighbourCells.length)]
            if (!nextCell) {
                cell.deadEnd = true
                visitedCells.push(cell.previousCell)
                continue
            }
            if (cell.previousCell?.x === nextCell?.x && cell.previousCell?.y === nextCell?.y) {
                cell.deadEnd = true
                visitedCells.push(nextCell)
                continue
            }
            nextCell.previousCell = cell
            visitedCells.push(nextCell)
            cell.cell.classList.remove('wall')
            cell.wall = false
            cell.visited = true
        }

    unvisitedCells.forEach(cell => {
        cell.visited = false
        cell.previousCell = null
    })
}

function index(maxValue) {
    let random = (Math.floor((Math.random() * 10) % maxValue))
    return random
}
