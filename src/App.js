import { useEffect, useRef, useState } from 'react';
import './App.css';
import Graph from './Graph';
import Visualizer from './Visualizer/Visualizer';

function App() {
  // const mounted = useRef(false)
  // const GRAPH_LENGTH = 20
  // const [graph, setGraph] = useState()
  // const TIMES = 1


  // useEffect(() => {
  //   if (mounted.current) return
  //   const container = document.getElementById('container')
  //   const g = new Graph(container, GRAPH_LENGTH, 1000 / TIMES)
  //   setGraph(g)
  //   algorithms.sortArray('asdad')
  //   return () => mounted.current = true
  // }, [])

  return (
    <>
      {/* <button onClick={() => graph.mergeSort()}>Sort</button>
      <div id="container" /> */}
      <Visualizer />
    </>
  );
}

export default App;
