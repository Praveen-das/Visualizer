import ReactDOM from 'react-dom/client';
import { ReactComponent as Marker } from '../../../Assets/Icons/marker.svg'

let point1 = null,
    point2 = null

export const handleCellActions = (element, action) => {
    switch (action) {
        case 'DRAW_WALL':
            if (element.point1 || element.point2) return
            // element.cell.classList.add('wall')
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
    }, 5)
}

export const generateGrid = () => {
    let rows = Math.floor(window.innerWidth / 20),
        columns = Math.floor(window.innerHeight / 20),
        grid = [],
        container = document.getElementById('PathFindingVisualizer')

    container.style.setProperty('--COLUMNS', rows)

    for (let y = 0; y < columns; y++) {
        const cells = []
        for (let x = 0; x < rows; x++) {
            cells.push(createCell(x, y, container))
        }
        grid.push(cells)
    }
    return grid
}

function createCell(x, y, container) {
    const cellElement = document.createElement('div')
    cellElement.id = 'cell'
    // container.append(cellElement)
    const cell = {
        cell: cellElement,
        point1: point1 ? point1 : null,
        point2: point2 ? point2 : null,
        wall: null,
        visited: false,
        x,
        y,
        previousCell: null,
        distance: 1,
        deadEnd: false
    }
    return cell
}

export const setPoint = (cell, name) => {
    if (!cell) return
    const point = document.createElement('div')
    point.id = name
    point.onpointerdown = () => point.classList.add('animate')
    ReactDOM.createRoot(point).render(<Marker id='marker' width={25} />)
    cell.point1 = name === 'point1' ? point : null
    cell.point2 = name === 'point2' ? point : null
    cell.cell?.append(point)
    return point
}