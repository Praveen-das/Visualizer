
export const mergeSort = async (array, animations) => {
    let hue = 201
    const length = array.length
    if (array.length === 1) return array
    const middleIdx = length / 2
    const left = array.slice(0, middleIdx)
    const right = array.slice(middleIdx)

    // left.forEach(bar => {
    //     bar.element.style.background = `hsl(${(hue += 20) - 200}, 100%, 60%)`
    // })

    // hue = 201
    // right.forEach(bar => {
    //     bar.element.style.background = `hsl(${(hue += 20) - 50}, 100%, 60%)`
    // })

    await mergeSort(left, animations)
    await mergeSort(right, animations)
    await merge(array, animations, left, right)
}

async function merge(array, animations, left, right) {
    let l = 0,
        r = 0,
        k = 0
    debugger

    array.forEach(bar => {
        bar.element.style.bottom = '100%'
        bar.element.style.background = 'hsl(201, 100%, 100%)'
    })
    
    await wait()
    while (l < left.length && r < right.length) {
        if (left[l]?.value <= right[r]?.value) {
            // animations.push([left, right])
            let auxIdx = array[k].index
            array[k] = left[l]
            array[k].element.style.setProperty('--index', auxIdx)
            array[k].element.style.bottom = '0'
            array[k].element.style.background = 'hsl(201, 100%, 60%)'
            await wait()
            l++
            k++
        }
        if (left[l]?.value >= right[r]?.value) {
            let auxIdx = array[k].index
            array[k] = right[r]
            array[k].element.style.setProperty('--index', auxIdx)
            array[k].element.style.bottom = '0'
            array[k].element.style.background = 'hsl(201, 100%, 60%)'
            await wait()
            r++
            k++
        }
    }

    while (l < left.length) {
        let auxIdx = array[k].index
        array[k] = left[l]
        array[k].element.style.setProperty('--index', auxIdx)
        array[k].element.style.bottom = '0'
        array[k].element.style.background = 'hsl(201, 100%, 60%)'
        l++
        k++
        await wait()
    }

    while (r < right.length) {
        let auxIdx = array[k].index
        array[k] = right[r]
        array[k].element.style.setProperty('--index', auxIdx)
        array[k].element.style.bottom = '0'
        array[k].element.style.background = 'hsl(201, 100%, 60%)'
        r++
        k++
        await wait()
    }
}

function wait() {
    return new Promise(res => setTimeout(() => res(true), window.speed))
}

