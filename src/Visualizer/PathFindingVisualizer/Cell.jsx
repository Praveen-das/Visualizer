import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import { ReactComponent as Marker } from '../../Assets/Icons/marker.svg'

function Cell({
    cell,
    point1,
    point2,
    onpointerdown,
    onpointerenter
}) {
    const cellRef = useRef()

    useEffect(() => {
        if (point1) {
            const point = document.createElement('div')
            point.id = 'point1'
            ReactDOM.createRoot(point).render(<Marker id='marker' width={25} />)
            cellRef.current.append(point)
            cell.point1 = point
        }
        if (point2) {
            const point = document.createElement('div')
            point.id = 'point2'
            ReactDOM.createRoot(point).render(<Marker id='marker' width={25} />)
            cellRef.current.append(point)
            cell.point2 = point
        }
        cell.cell = cellRef.current
    }, [point1, point2, cell])

    return (
        <div
            onPointerDown={(e) => {
                onpointerdown(cell)
            }
            }
            onPointerEnter={(e) => {
                onpointerenter(cell)
            }
            }
            ref={cellRef}
            id='cell'
            className={cell.wall && 'wall'}
        >
        </div>
    )
}

export default Cell