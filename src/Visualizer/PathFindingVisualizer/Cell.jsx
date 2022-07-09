import React, { useRef } from 'react'

function Cell({
    cell,
    onpointerdown,
    onpointermove,
    onpointerup
}) {
    const cellRef = useRef()

    return (
        <div
            onPointerDown={(e) => onpointerdown(cell, e.target)}
            onPointerEnter={(e) => onpointermove(cell, e.target)}
            onPointerUp={(e) => onpointerup(cell, e.target)}
            ref={cellRef}
            id='cell'
        >
            {cell.wall && <div className='wall' />}
        </div>
    )
}

export default Cell