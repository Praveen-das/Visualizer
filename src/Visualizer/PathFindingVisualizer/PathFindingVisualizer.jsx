import React, { useCallback, useMemo, useRef } from 'react'
import './PathFindingVisualizer.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { clearElement, generateGrid, generatePointer, handleCellActions } from './HelperFunctions/HelperFunctions.js'
import { dijkstra } from '../../Algorithms/PathFindingAlgorithms/dijkstra'
import mazeGenerator from '../../Algorithms/MazeGenerator/MazeGenerator'
import Cell from './Cell'

function PathFindingVisualizer() {
    let [grid, setGrid] = useState([])
    const action = useRef('DRAW_WALL')
    const active = useRef(false)
    let previousCell = useRef()

    useEffect(() => {
        setGrid(generateGrid())
    }, [])

    useEffect(() => {
        onpointerup = () => {
            action.current = 'DRAW_WALL'
            active.current = false
            document.querySelector('#point1').classList.remove('animate')
            document.querySelector('#point2').classList.remove('animate')
            previousCell.current = null
        }
        onkeydown = (e) => e.key === 'Control' && (action.current = 'REMOVE_WALL')
        onkeyup = () => {
            active.current = false
            action.current = 'DRAW_WALL'
        }
    }, [])

    const findPath = useCallback(() => {
        clearElement(grid, 'path')
        dijkstra(grid)
    }, [grid])

    const generateMaze = useCallback(async () => {
        if (!grid.length) return
        clearElement(grid, 'all')
        await mazeGenerator(grid)
        generatePointer(grid, 'point1')
        generatePointer(grid, 'point2')
    }, [grid])

    const clearWalls = useCallback(() => {
        clearElement(grid, 'wall')
    }, [grid])

    const reset = useCallback(() => {
        clearElement(grid, 'all')
        generatePointer(grid, 'point1')
        generatePointer(grid, 'point2')
    }, [grid])

    const pointerEvents = useCallback(cell => {
        if (cell.point1) {
            cell.point1.classList.add('animate')
            action.current = 'MOVE_POINT1'
        }
        if (cell.point2) {
            cell.point2.classList.add('animate')
            action.current = 'MOVE_POINT2'
        }
        handleCellActions(cell, previousCell, action.current)
    }, [])

    useEffect(() => {
        if (!grid.length) return
        generatePointer(grid, 'point1')
        generatePointer(grid, 'point2')
    }, [grid])

    return useMemo(() =>
        <>
            <header>
                <button onClick={findPath} id='PFV_BUTTON'>START</button>
                <button onClick={generateMaze} id='PFV_BUTTON'>GENERATE MAZE</button>
                <button onClick={clearWalls} id='PFV_BUTTON'>CLEAR WALL</button>
                <button onClick={reset} id='PFV_BUTTON'>RESET</button>
            </header>
            <div id="PathFindingVisualizer">
                {
                    grid?.map((rows) =>
                        rows?.map((cell, index) =>
                            <Cell
                                cell={cell}
                                key={index}
                                onpointerdown={(cell) => {
                                    active.current = true
                                    pointerEvents(cell)
                                }}
                                onpointerenter={(cell) => {
                                    if (active.current && (cell.point1 || cell.point2)) return
                                    active.current && pointerEvents(cell)
                                }}
                            />
                        )
                    )
                }
            </div>
        </>, [generateMaze, grid, findPath, clearWalls, reset, pointerEvents]
    )
}

export default PathFindingVisualizer
