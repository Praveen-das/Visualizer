import React, { useCallback, useMemo, useRef } from 'react'
import './PathFindingVisualizer.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { handleCellActions, setPoint } from './HelperFunctions/HelperFunctions.js'
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
        if (!grid.length) return
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

    const setPoints = useCallback(() => {
        let p1x = random(0, grid[0]?.length / 2)
        let p1y = random(0, grid.length - 1)
        let p2x = random(grid[0]?.length / 2, grid[0]?.length - 1)
        let p2y = random(0, grid.length - 1)

        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[0].length; x++) {
                if (x === p1x && y === p1y) {
                    if (grid[y][x].wall) {
                        p1x++
                        p1y++
                        continue
                    }
                    setPoint(grid[y][x], 'point1')
                }
                if (x === p2x && y === p2y) {
                    if (grid[y][x].wall) {
                        p2x++
                        p2y++
                        continue
                    }
                    setPoint(grid[y][x], 'point2')
                }
            }
        }
    }, [grid])

    useEffect(() => {
        setPoints()
    }, [setPoints])

    const generateMaze = useCallback(async () => {
        if (!grid.length) return
        for (let rows of grid) {
            for (let cell of rows) {
                if (cell.point1) {
                    cell.point1.remove()
                    cell.point1 = null
                }
                if (cell.point2) {
                    cell.point2.remove()
                    cell.point2 = null
                }
            }
        }
        await mazeGenerator(grid)
        setPoints()
    }, [grid, setPoints])

    const findPath = useCallback(() => {
        dijkstra(grid)
    }, [grid])

    const handleActions = useCallback((action) => {
        let cells = []
        for (let rows of grid) {
            for (let cell of rows) {
                cells.push(cell)
            }
        }
        switch (action) {
            case 'clearWalls':
                cells.forEach((cell) => {
                    cell.cell.classList.remove('wall')
                    cell.wall = false
                    cell.visited = false
                })
                break;
            case 'reset':
                cells.forEach((cell) => {
                    cell = {}
                })
                break;
            default:
                break;
        }
    }, [grid])

    return useMemo(() =>
        <>
            <header>
                <button onClick={findPath} id='PFV_BUTTON'>START</button>
                <button onClick={generateMaze} id='PFV_BUTTON'>GENERATE MAZE</button>
                <button onClick={() => handleActions('reset')} id='PFV_BUTTON'>RESET</button>
                <button onClick={() => handleActions('clearWalls')} id='PFV_BUTTON'>CLEAR WALLS</button>
            </header>
            <div id="PathFindingVisualizer" />
        </>, [generateMaze, handleActions]
    )
}

export default PathFindingVisualizer

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}