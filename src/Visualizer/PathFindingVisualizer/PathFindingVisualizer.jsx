import React, { useMemo } from 'react'
import './PathFindingVisualizer.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { handleCellActions } from './HelperFunctions/HelperFunctions.js'
import { generateGrid } from './HelperFunctions/HelperFunctions.js'
import { setPoint1 } from './HelperFunctions/HelperFunctions'

function PathFindingVisualizer() {
    const [grid, setGrid] = useState([])

    useEffect(() => {
        window.onresize = () => setGrid(generateGrid())
        setGrid(generateGrid())
    }, [])

    useEffect(() => {
        let active = false,
            action = 'DRAW_WALL'
        window.onpointerdown = (e) => e.button === 0 && (active = true)
        window.onpointerup = (e) => {
            action = 'DRAW_WALL'
            active = false
        }

        onkeydown = (e) => e.key === 'Control' && (action = 'REMOVE_WALL')
        onkeyup = () => {
            active = false
            action = 'DRAW_WALL'
        }

        grid.forEach(cell => {
            cell.cell.onpointerdown = (e) => {
                if (e.button !== 0) return
                if (cell.point1) action = 'MOVE_POINT'
                handleCellActions(cell, action)
            }
            cell.cell.onpointerenter = () => active && handleCellActions(cell, action)
            if ((cell.x === 25 && cell.y === 25) && cell.point1 == null) setPoint1(cell)
        })
    }, [grid])

    return useMemo(() => <div id="PathFindingVisualizer" />, [])
}

export default PathFindingVisualizer