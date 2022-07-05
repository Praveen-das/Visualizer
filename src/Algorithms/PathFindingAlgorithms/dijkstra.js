import { tracePreviousCell } from "../../Visualizer/PathFindingVisualizer/HelperFunctions/HelperFunctions"

export const dijkstra = (grid) => {
    const visitedCells = []
    let animations = []

    for (let rows of grid) {
        for (let cell of rows) {
            if (cell.point1)
                visitedCells.push(cell)
        }
    }

    for (let point of visitedCells) {
        if (point.visited) continue
        if (point.wall) continue
        if (point.point2) {
            animations.push(point)
            break
        }
        animations.push(point)

        if (point.x > 0) {
            //left
            if (!grid[point.y][point.x - 1].previousCell)
                grid[point.y][point.x - 1].previousCell = point
            visitedCells.push(grid[point.y][point.x - 1])
        }
        if (point.x < grid[0].length - 1) {
            //right
            if (!grid[point.y][point.x + 1].previousCell)
            grid[point.y][point.x + 1].previousCell = point
            visitedCells.push(grid[point.y][point.x + 1])
        }
        if (point.y > 0) {
            //top
            if (!grid[point.y - 1][point.x].previousCell)
            grid[point.y - 1][point.x].previousCell = point
            visitedCells.push(grid[point.y - 1][point.x])
        }
        if (point.y < grid.length - 1) {
            //bottom
            if (!grid[point.y + 1][point.x].previousCell)
            grid[point.y + 1][point.x].previousCell = point
            visitedCells.push(grid[point.y + 1][point.x])
        }
        point.visited = true
    }

    for (let i = 0; i < animations.length; i++) {
        setTimeout(() => {
            let visitedCell = document.createElement('div')
            visitedCell.className = 'visited'
            animations[i].cell.append(visitedCell)
            if (animations[i].point2) {
                tracePreviousCell(animations[i])
            }
        }, 5 * i)
    }

}