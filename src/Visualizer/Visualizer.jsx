import React, { useEffect, useState } from 'react'
import './visualizer.css'
import { mergeSort } from '../Algorithms/SortingAlgorithms.jsx'

function Visualizer() {
    const ARRAY_SIZE = 500
    const SORTING_SPEED_IN_MS = 10
    const [graph, setGraph] = useState([])

    useEffect(() => {
        const container = document.getElementById('container')
        container.style.setProperty('--length', ARRAY_SIZE)
        const array = createUnsortedArray(ARRAY_SIZE, container)
        setGraph(array)
    }, [])

    async function sortArray() {
        let array = graph
        let auxArray = array.slice()
        await mergeSort(array, auxArray, SORTING_SPEED_IN_MS)
        setGraph([...array])
    }

    return (
        <>
            <button onClick={() => sortArray()}>sort</button>
            <div id="container">
                {/* {
                    graph.map((bar, index) =>
                        <div key={index} className='cell' style={{ '--index': bar.index }} />
                    )
                } */}
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

