import ReactDOM from 'react-dom/client';
import { ReactComponent as Marker } from '../../../Assets/Icons/marker.svg'

export const handleCellActions = (cell, previousCell, action) => {
    switch (action) {
        case 'MOVE_POINT1':
            if (cell.wall) return
            if (cell.point2) return
            if (previousCell.current == null) return previousCell.current = cell
            if ((cell.x === previousCell.current.x && cell.y === previousCell.current.y)) return
            cell.cell.append(previousCell.current.point1)
            cell.point1 = previousCell.current.point1
            previousCell.current.point1 = null
            previousCell.current = cell
            break;
        case 'MOVE_POINT2':
            if (cell.wall) return
            if (cell.point1) return
            if (previousCell.current == null) return previousCell.current = cell
            if ((cell.x === previousCell.current.x && cell.y === previousCell.current.y)) return
            cell.cell.append(previousCell.current.point2)
            cell.point2 = previousCell.current.point2
            previousCell.current.point2 = null
            previousCell.current = cell
            break;
        case 'REMOVE_WALL':
            cell.cell.classList.remove('wall')
            cell.wall = false
            break;
        case 'DRAW_WALL':
            cell.cell.classList.add('wall')
            cell.wall = true
            break;
        default:
            break;
    }
}

export const generateGrid = () => {
    let rows = Math.floor(window.innerWidth / 15),
        columns = Math.floor(document.querySelector('#PathFindingVisualizer').clientHeight / 15),
        grid = [],
        container = document.getElementById('PathFindingVisualizer')

    container.style.setProperty('--COLUMNS', rows)

    for (let y = 0; y < columns; y++) {
        const cells = []
        for (let x = 0; x < rows; x++) {
            const cell = {
                wall: null,
                visited: false,
                x,
                y,
                previousCell: null,
                distance: 1,
                deadEnd: false
            }

            cells.push(cell)
        }
        grid.push(cells)
    }
    return grid
}

export const generatePointer = (grid, type) => {
    let px = random(0, grid[0]?.length - 1)
    let py = random(0, grid.length - 1)

    for (let rows of grid) {
        for (let cell of rows) {
            if (cell.x === px && cell.y === py) {
                if (cell.wall) {
                    px++
                    py++
                    continue
                }
                const point = document.createElement('div')
                point.id = type ? type : 'point1'
                ReactDOM.createRoot(point).render(<Marker id='marker' width={25} />)
                cell.cell.append(point)
                cell[type] = point
            }
        }
    }

}

export function clearElement(grid, element) {
    for (let rows of grid) {
        for (let cell of rows) {
            if (element === 'wall')
                if (cell.wall) {
                    cell.cell.classList.remove('wall')
                    cell.wall = false
                }
            if (element === 'path')
                Array.from(cell.cell.children).forEach(elm => {
                    if (elm.className === 'shortestPath')
                        elm.remove()
                    if (elm.className === 'visited')
                        elm.remove()
                })
            if (element === 'all') {
                Array.from(cell.cell.children).forEach(elm => {
                    elm.remove()
                })
                cell.cell.classList.remove('wall')
                cell.wall = false
                cell.point1 = null
                cell.point2 = null
            }
            cell.visited = false
            cell.previousCell = null
        }
    }
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}