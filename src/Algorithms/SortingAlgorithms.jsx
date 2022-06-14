
export const mergeSort = async (array, auxArray, speed) => {
    const length = array.length
    if (array.length === 1) return array

    const middleIdx = length / 2
    const left = array.slice(0, middleIdx)
    const right = array.slice(middleIdx)

    await mergeSort(left, auxArray)
    await mergeSort(right, auxArray)
    await merge(array, auxArray, left, right, speed)
}

async function merge(array, auxArray, left, right, speed) {
    let l = 0,
        r = 0,
        k = 0

    while (l < left.length && r < right.length) {
        if (left[l]?.value <= right[r]?.value) {
            let auxIdx = array[k].index
            array[k] = left[l]
            array[k].element.style.setProperty('--index', auxIdx)
            await wait()
            l++
            k++
        }
        if (left[l]?.value >= right[r]?.value) {
            let auxIdx = array[k].index
            array[k] = right[r]
            array[k].element.style.setProperty('--index', auxIdx)
            await wait()
            r++
            k++
        }
    }

    while (l < left.length) {
        let auxIdx = array[k].index
        array[k] = left[l]
        array[k].element.style.setProperty('--index', auxIdx)
        await wait()
        l++
        k++
    }

    while (r < right.length) {
        let auxIdx = array[k].index
        array[k] = right[r]
        array[k].element.style.setProperty('--index', auxIdx)
        await wait()
        r++
        k++
    }

    function wait() {
        return new Promise(res => setTimeout(() => res(true), speed))
    }
}

