import React, { useCallback, useMemo, useRef } from 'react'
import './PathFindingVisualizer.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { generateGrid } from './HelperFunctions/HelperFunctions.js'
import { dijkstra } from '../../Algorithms/PathFindingAlgorithms/dijkstra'
import mazeGenerator from '../../Algorithms/MazeGenerator/MazeGenerator'
import Cell from './Cell'

function PathFindingVisualizer() {
    let [grid, setGrid] = useState([])
    const [p1, setP1] = useState()
    const [p2, setP2] = useState()
    const action = useRef('DRAW_WALL')
    const active = useRef(false)
    let previousCell = useRef()

    useEffect(() => {
        setGrid(generateGrid())
    }, [])

    useEffect(() => {
        window.onpointerup = () => {
            action.current = 'DRAW_WALL'
            active.current = false
            previousCell.current = null
        }

        onkeydown = (e) => e.key === 'Control' && (action.current = 'REMOVE_WALL')
        onkeyup = () => {
            active.current = false
            action.current = 'DRAW_WALL'
        }
    }, [])

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
    }, [grid])

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

    const pointerEvents = useCallback((cell) => {
        if (cell.point1)
            action.current = 'MOVE_POINT1'
        if (cell.point2)
            action.current = 'MOVE_POINT2'

        switch (action.current) {
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
    }, [])

    useEffect(() => {
        setP1({ x: random(0, grid[0]?.length / 2), y: random(0, grid.length - 1) })
        setP2({ x: random(grid[0]?.length / 2, grid[0]?.length - 1), y: random(0, grid.length - 1) })
    }, [grid])

    return useMemo(() =>
        <>
            <header>
                <button onClick={findPath} id='PFV_BUTTON'>START</button>
                <button onClick={generateMaze} id='PFV_BUTTON'>GENERATE MAZE</button>
                <button onClick={() => handleActions('reset')} id='PFV_BUTTON'>RESET</button>
                <button onClick={() => handleActions('clearWalls')} id='PFV_BUTTON'>CLEAR WALLS</button>
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
                                    return pointerEvents(cell)
                                }}
                                onpointerenter={(cell) => {
                                    if (active.current && (cell.point1 || cell.point2)) return
                                    active.current && pointerEvents(cell)
                                }}
                                point1={cell.x === p1.x && cell.y === p1.y}
                                point2={cell.x === p2.x && cell.y === p2.y}
                            />
                        )
                    )
                }
            </div>
        </>, [generateMaze, handleActions, grid, findPath, p1, p2, pointerEvents]
    )
}

export default PathFindingVisualizer

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}