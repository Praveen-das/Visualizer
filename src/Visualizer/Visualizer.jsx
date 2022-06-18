import React, { useEffect, useState } from 'react'
import './visualizer.css'
import { mergeSort } from '../Algorithms/MergeSort.jsx'

function Visualizer() {
    const ARRAY_SIZE = 50
    const [animationSpeed, setAnimationSpeed] = useState(10)
    
    const [progress, setProgress] = useState()
    const [graph, setGraph] = useState([])
    
    useEffect(() => {
        const container = document.getElementById('container')
        const GAP = ARRAY_SIZE >= 100 ? '0.5vmin' : 
        ARRAY_SIZE >= 200 ? '0.3vmin ':'1vmin'

        container.style.setProperty('--LENGTH', ARRAY_SIZE)
        container.style.setProperty('--GAP', GAP)
        container.style.setProperty('--ANIMATION_TIME', `${animationSpeed}ms`)
        const array = createUnsortedArray(ARRAY_SIZE, container)
        setGraph(array)
    }, [animationSpeed])

    function sortArray() {
        mergeSort(graph, animationSpeed, setProgress)
    }

    useEffect(() => {
        console.log(progress);
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

const createUnsortedArray = (size, container) => {
    let array = []
    for (let i = 0; i < size; i++) {
        const RANDOM_SIZE = Math.floor((Math.random() * (100 - 5)) + 5)
        const element = document.createElement('div')
        element.id = 'bar'
        element.style.height = `${RANDOM_SIZE}%`
        element.style.setProperty('--INDEX', i)
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

