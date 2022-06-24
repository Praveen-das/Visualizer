import React from 'react'
import './PathFindingVisualizer.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { ReactComponent as Marker } from '../../Assets/Icons/marker.svg'

function PathFindingVisualizer() {
    const [grid, setGrid] = useState([])
    const [active, setActive] = useState(false)
    const [action, setAction] = useState('DRAW_WALL')
    const [point1, setPoint1] = useState({
        pre: null,
        curr: { x: 20, y: 20 }
    })
    const [point1Selected, setPoint1Selected] = useState(false)

    useEffect(() => {
        let columns, rows
        columns = Math.floor(window.innerWidth / 15)
        rows = Math.floor(window.innerHeight / 15)

        window.onresize = () => {
            columns = Math.floor(window.innerWidth / 15)
            rows = Math.floor(window.innerHeight / 15)
            setGrid(generateGrid(columns, rows))
            document.documentElement.style.setProperty('--COLUMNS', columns)
            document.documentElement.style.setProperty('--ROWS', rows)
        }

        document.documentElement.style.setProperty('--COLUMNS', columns)
        document.documentElement.style.setProperty('--ROWS', rows)
        setGrid(generateGrid(columns, rows))
    }, [])

    useEffect(() => {
        window.onpointerdown = () => {
            setActive(true)
        }
        window.onpointerup = (e) => {
            setActive(false)
            setPoint1Selected(false)
            setPoint1(pre => ({
                curr: pre.curr,
                pre: null
            }))
        }
        onkeydown = (e) => e.key === 'Control' && setAction('REMOVE_WALL')
        onkeyup = () => {
            setActive(false)
            setAction('DRAW_WALL')
        }
    }, [])

    useEffect(() => {
        // setPoint1(

        // )
    }, [])

    const handleCell = (o) => {
        if (o.point1) {
            if (active) return
            // o.cell?.children[0].classList.add('animate')
            setPoint1Selected(true)
            setPoint1(pre => ({
                pre: { x: o.x, y: o.y },
                curr: pre.curr
            }))
            o.point1 = null
            return
        }
        if (point1.pre != null || isNaN(point1.pre)) {
            if (o.wall) return
            setPoint1(pre => ({
                curr: { x: o.x, y: o.y },
                pre: { x: o.x, y: o.y }
            }))
            return
        }
        switch (action) {
            case 'DRAW_WALL':
                o.cell.classList.add('wall')
                o.wall = true
                break;
            case 'REMOVE_WALL':
                if (!o.wall) return
                o.cell.classList.remove('wall')
                // o.cell.classList.add('none')
                // setTimeout(() => {
                //     o.cell.classList.remove('none')
                // }, 100)
                o.wall = null
                break;
            default:
                o.point1 = null
                break;
        }
    }

    const handlePoint1 = (o) => {
        if (!point1.pre)
            o.point1 = true
        return < div
            className={`point1 ${point1Selected && 'animate'}`}
        ><Marker width={20} /></div>
    }

    return (
        <>
            <div id="PathFindingVisualizer">
                {
                    console.log('asdda')
                }
                {
                    grid && grid.map((o, i) => {
                        return (
                            <div
                                onMouseEnter={(e) => active && handleCell(o)}
                                onPointerDown={(e) => handleCell(o)}
                                key={i}
                                id="cell"
                                ref={(e) => o.cell = e}
                            >
                                {
                                    (o.x === point1.curr?.x && o.y === point1.curr?.y) && handlePoint1(o)
                                }
                            </div>
                        )
                    }
                    )
                }
            </div>
        </>
    )
}



const generateGrid = (columns, rows) => {
    let GRID_SIZE = columns * rows
    const array = []
    for (let i = 0; i < GRID_SIZE; i++) {
        array.push({
            cell: null,
            point1: null,
            point2: null,
            wall: null,
            x: i % parseInt(columns),
            y: parseInt(i / columns)
        })
    }
    return array
}

export default PathFindingVisualizer