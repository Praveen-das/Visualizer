import ReactDOM from 'react-dom/client';
import { ReactComponent as Marker } from '../../../Assets/Icons/marker.svg'

export const setPoint1 = (cell) => {
    if (!cell) return
    const point1 = document.createElement('div')
    point1.id = 'point1'
    point1.onpointerdown = () => point1.classList.add('animate')
    point1.onpointerup = () => point1.classList.remove('animate')
    ReactDOM.createRoot(point1).render(<Marker width={20} />)
    cell.point1 = point1
    cell.cell.append(point1)
}

let pre = null
export const handleCellActions = (element, action) => {
    switch (action) {
        case 'DRAW_WALL':
            if (element.point1) return
            element.cell.classList.add('wall')
            element.wall = true
            break
        case 'REMOVE_WALL':
            if (!element.wall) return
            element.cell.classList.remove('wall')
            element.wall = null
            break
        case 'MOVE_POINT':
            if (element.wall) return
            if (pre != null) {
                if ((pre.x === element.x && pre.y === element.y)) return
                element.cell.append(pre.point1)
                element.point1 = pre.point1
                pre.point1 = null
                pre = element
            } else {
                pre = element
            }
            break
        default:
            break;
    }
}
export const generateGrid = () => {
    let columns = Math.floor(window.innerWidth / 15),
        rows = Math.floor(window.innerHeight / 15),
        GRID_SIZE = columns * rows

    const container = document.getElementById('PathFindingVisualizer')
    container.style.setProperty('--COLUMNS', columns)
    const array = []

    for (let i = 0; i < GRID_SIZE; i++) {
        const cell = document.createElement('div')
        cell.id = 'cell'
        container.append(cell)
        array.push({
            cell: cell,
            point1: null,
            point2: null,
            wall: null,
            x: i % parseInt(columns),
            y: parseInt(i / columns)
        })
    }
    return array
}