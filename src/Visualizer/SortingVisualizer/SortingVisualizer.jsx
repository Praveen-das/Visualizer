import React, { useEffect, useState } from 'react'
import './SortingVisualizer.css'
import mergeSort from '../../Algorithms/SortingAlgorithms/MergeSort'
import quickSort from '../../Algorithms/SortingAlgorithms/QuickSort'
import radixSort from '../../Algorithms/SortingAlgorithms/RadixSort'

function Visualizer() {
    const [animationSpeed, setAnimationSpeed] = useState(1)
    const ARRAY_SIZE = 1000
    const MAX_DIGITS = 2
    const maxDigits = parseInt(String(1).padEnd(MAX_DIGITS + 1, 0))

    const [progress, setProgress] = useState()
    const [graph, setGraph] = useState([])

    useEffect(() => {
        const container = document.getElementById('container')
        const GAP = ARRAY_SIZE >= 100 ? '0.1vmin' :
            ARRAY_SIZE >= 200 ? '0.3vmin ' : '1vmin'

        container.style.setProperty('--LENGTH', ARRAY_SIZE)
        container.style.setProperty('--GAP', GAP)
        container.style.setProperty('--ANIMATION_TIME', `${animationSpeed}ms`)

        const array = createUnsortedArray(ARRAY_SIZE, maxDigits, container)
        setGraph(array)

    }, [animationSpeed, maxDigits])

    function sortArray() {
        console.time()
        radixSort(graph, animationSpeed,maxDigits, setProgress)
        console.timeEnd()
    }

    useEffect(() => {
        // console.log(progress);
    }, [progress])

    return (
        <>
            <div id="wrapper">
                <button onClick={() => sortArray()}>
                    {
                        isNaN(progress) ? 'GO' :
                            progress === 100 ?
                                'DONE' :
                                `${progress}%`
                    }
                </button>
                <div id="container"></div>
            </div>
        </>
    )
}

export default Visualizer

const createUnsortedArray = (size, maxDigits, container) => {
    let array = []
    for (let i = 0; i < size; i++) {
        const RANDOM_SIZE = Math.floor((Math.random() * (maxDigits - 10)) + 10)
        const element = document.createElement('div')
        element.id = 'bar'
        element.style.height = `${(RANDOM_SIZE / maxDigits) * 100}%`
        element.style.setProperty('--INDEX', i)
        if (size <= 20)
            element.innerText = RANDOM_SIZE
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

