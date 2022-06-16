import React, { useEffect, useState } from 'react'
import './visualizer.css'
import { mergeSort } from '../Algorithms/MergeSort.jsx'

function Visualizer() {
    const ARRAY_SIZE = 600
    const SORTING_SPEED_IN_MS = 5
    window.speed = SORTING_SPEED_IN_MS
    const [graph, setGraph] = useState([])

    useEffect(() => {
        const container = document.getElementById('container')
        container.style.setProperty('--length', ARRAY_SIZE)
        const array = createUnsortedArray(ARRAY_SIZE, container)
        setGraph(array)
    }, [])

    async function sortArray() {
        let array = graph
        let a = graph.slice()
        const animations = []
        await mergeSort(array, animations)
    }

    return (
        <>
            <div id="wrapper">
                <button onClick={() => sortArray()}>sort</button>
                <div id="container"></div>
            </div>
        </>
    )
}

export default Visualizer

const createUnsortedArray = (size, container) => {
    let array = []
    for (let i = 0; i < size; i++) {
        const RANDOM_SIZE = Math.floor((Math.random() * (100 - 5)) + 5)
        const element = document.createElement('div')
        element.id = 'bar'
        element.style.height = `${RANDOM_SIZE}%`
        // element.textContent = i
        element.style.setProperty('--index', i)
        const obj = {
            element: element,
            value: RANDOM_SIZE,
            index: i
        }
        container.append(element)
        array.push(obj)
    }
    return array
}

