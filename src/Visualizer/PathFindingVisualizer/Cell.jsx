import React, { useEffect, useRef } from 'react'

function Cell(
    {
        cell,
        onpointerdown,
        onpointerenter
    }
) {
    const cellRef = useRef()

    useEffect(() => {
        cell.cell = cellRef.current
    }, [cell])

    return (
        <div
            onPointerDown={(e) => e.button === 0 && onpointerdown(cell)}
            onPointerEnter={() => onpointerenter(cell)}
            ref={cellRef}
            id='cell'
            className={cell.wall && 'wall'}
        >
        </div>
    )
}

export default Cell