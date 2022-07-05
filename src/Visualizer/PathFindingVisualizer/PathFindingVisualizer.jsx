import React, { useCallback, useMemo, useRef } from 'react'
import './PathFindingVisualizer.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { handleCellActions } from './HelperFunctions/HelperFunctions.js'
import { generateGrid } from './HelperFunctions/HelperFunctions.js'
import { dijkstra } from '../../Algorithms/PathFindingAlgorithms/dijkstra'
import mazeGenerator from '../../Algorithms/MazeGenerator/MazeGenerator'

function PathFindingVisualizer() {
    let [grid, setGrid] = useState([])
    const action = useRef('DRAW_WALL')
    const active = useRef(false)

    useEffect(() => {
        window.onresize = () => setGrid(generateGrid())
        setGrid(generateGrid())
    }, [])

    useEffect(() => {
        window.onpointerdown = (e) => e.button === 0 && (active.current = true)
        window.onpointerup = () => {
            document.getElementById('point1')?.classList.remove('animate')
            document.getElementById('point2')?.classList.remove('animate')
            action.current = 'DRAW_WALL'
            active.current = false
        }

        onkeydown = (e) => e.key === 'Control' && (action.current = 'REMOVE_WALL')
        onkeyup = () => {
            active.current = false
            action.current = 'DRAW_WALL'
        }

        for (let rows of grid) {
            for (let cell of rows) {
                cell.cell.onpointerdown = (e) => {
                    if (e.button !== 0)
                        return
                    if (cell.point1)
                        action.current = 'MOVE_POINT1'
                    if (cell.point2)
                        action.current = 'MOVE_POINT2'
                    handleCellActions(cell, action.current)
                }
                cell.cell.onpointerenter = () => {
                    active.current && handleCellActions(cell, action.current)
                }
            }
        }
    }, [grid])

    const findPath = useCallback(() => {
        console.log(grid);
        dijkstra(grid)
    }, [grid])

    useEffect(() => {
        if (!!grid.length)
            mazeGenerator(grid)
    }, [grid])

    return useMemo(() =>
        <>
            <button onClick={findPath} id='PFV_BUTTON'>START</button>
            <div id="PathFindingVisualizer" />
        </>, [findPath]
    )
}

export default PathFindingVisualizer