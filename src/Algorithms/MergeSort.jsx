export const mergeSort = async (array, animationSpeed,progress) => {
    const animations = []
    let count = 1
    mergeHelper(array, animationSpeed, animations)

    const totalAnimations = animations.reduce((x, y) => {
        let [a, ...b] = y
        x = x + b.length
        return x
    }, 0)

    for (let animation of animations) {
        let [array, ...animatedIndices] = animation
        array.forEach(bar => {
            let top = 100 - bar.value
            bar.element.style.bottom = `${100 + top}%`
            bar.element.style.background = 'rgb(50, 50, 50)'
            bar.element.style.zIndex = 200
        })

        await new Promise(res => setTimeout(() => res(), animationSpeed))

        for (let j = 0; j < animatedIndices.length; j++) {
            progress(parseInt((count / totalAnimations) * 100))
            const [arrayIdx, auxIdx] = animatedIndices[j]
            array[arrayIdx].element.style.setProperty('--INDEX', auxIdx)
            array[arrayIdx].element.style.bottom = 0
            array[arrayIdx].element.style.zIndex = '1'
            array[arrayIdx].element.style.background = 'white'
            await new Promise(res => setTimeout(() => res(), animationSpeed))
            array[arrayIdx].element.style.background = '#00ffcc'
            await new Promise(res => setTimeout(() => res(), animationSpeed))
            count++
        }
    }
}

function mergeHelper(array, animationSpeed, animations){
    const length = array.length
    if (array.length === 1) return array
    const middleIdx = length / 2
    const left = array.slice(0, middleIdx)
    const right = array.slice(middleIdx)
    
    mergeHelper(left, animationSpeed, animations)
    mergeHelper(right, animationSpeed, animations)
    merge(array, left, right, animationSpeed, animations)

}

function merge(array, left, right, animationSpeed, animations) {
    let l = 0,
        r = 0,
        k = 0

    let arrays = [array]

    while (l < left.length && r < right.length) {
        if (left[l]?.value <= right[r]?.value) {
            doMerge(k++, left[l++])
        }
        if (left[l]?.value >= right[r]?.value) {
            doMerge(k++, right[r++])
        }
    }

    while (l < left.length) {
        doMerge(k++, left[l++])
    }

    while (r < right.length) {
        doMerge(k++, right[r++])
    }

    function doMerge(arrayIdx, bar) {
        let auxIdx = array[arrayIdx].index
        array[arrayIdx] = bar
        arrays.push([arrayIdx, auxIdx])
    }
    animations.push(arrays)

    function wait() {
        return new Promise(res => setTimeout(() => res(), animationSpeed))
    }
}



