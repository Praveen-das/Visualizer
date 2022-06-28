import ReactDOM from 'react-dom/client';
import { ReactComponent as Marker } from '../../../Assets/Icons/marker.svg'

let point1 = null,
    point2 = null

export const handleCellActions = (element, action) => {
    switch (action) {
        case 'DRAW_WALL':
            if (element.point1 || element.point2) return
            element.cell.classList.add('wall')
            element.wall = true
            break
        case 'REMOVE_WALL':
            if (!element.wall) return
            if (element.point1 || element.point2) return
            element.cell.classList.remove('wall')
            element.wall = null
            break
        case 'MOVE_POINT1':
            if (element.wall) return
            if (element.point2) return
            if (point1 != null) {
                if ((point1.x === element.x && point1.y === element.y)) return
                element.cell.append(point1.point1)
                element.point1 = point1.point1
                point1.point1 = null
                point1 = element
            } else {
                point1 = element
            }
            break
        case 'MOVE_POINT2':
            if (element.wall) return
            if (element.point1) return
            if (element.visited) return
            if (point2 != null) {
                if ((point2.x === element.x && point2.y === element.y)) return
                element.cell.append(point2.point2)
                element.point2 = point2.point2
                point2.point2 = null
                point2 = element
            } else {
                point2 = element
            }
            return element
        default:
            break;
    }
}

export const tracePreviousCell = (cell) => {
    setTimeout(() => {
        const shortestPath = document.createElement('div')
        shortestPath.className = 'shortestPath'
        if (cell.point1) {
            cell.cell.append(shortestPath)
            return
        }
        tracePreviousCell(cell.previousCell)
        cell.cell.append(shortestPath)
    }, 10)
}

const setPoint = (cell, x, y, columnsX, rowsY, name) => {
    if (!cell) return
    if (x === columnsX && y === rowsY) {
        const point = document.createElement('div')
        point.id = name
        point.onpointerdown = () => point.classList.add('animate')
        ReactDOM.createRoot(point).render(<Marker id='marker' width={25} />)
        cell?.append(point)
        return point
    }
}

export const generateGrid = () => {
    let rows = Math.floor(window.innerWidth / 30),
        columns = Math.floor(window.innerHeight / 30),
        grid = [],
        container = document.getElementById('PathFindingVisualizer')

    container.style.setProperty('--COLUMNS', rows)

    for (let y = 0; y < columns; y++) {
        const cells = []
        for (let x = 0; x < rows; x++) {
            cells.push(createCell(x, y, columns, rows, container))
        }
        grid.push(cells)
    }
    return grid
}

function createCell(x, y, columns, rows, container) {
    const cellElement = document.createElement('div')

    let point1 = setPoint(cellElement, x, y, Math.floor((rows / 4)), Math.floor(columns / 2), 'point1')
    let point2 = setPoint(cellElement, x, y, Math.floor(((rows / 2) * 1.5)), Math.floor(columns / 2), 'point2')

    cellElement.id = 'cell'
    container.append(cellElement)
    const cell = {
        cell: cellElement,
        point1: point1 ? point1 : null,
        point2: point2 ? point2 : null,
        wall: null,
        visited: false,
        x,
        y,
        previousCell: null,
        distance: 1
    }
    return cell
}