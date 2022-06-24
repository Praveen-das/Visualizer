export default async function quickSort(array, animationSpeed, progress) {
    const animations = []
    quickSortHelper(array, 0, array.length - 1, animations)

    for (let section of animations) {
        const [pivot, ...animation] = section
        pivot.element.classList.add('pivot')
        for (let frame of animation) {
            debugger
            if (frame.length > 1) {
                const [left, right] = frame
                left.element.classList.add('marker')
                await wait()
                if (left.index !== right.index) {
                    let temp = left.index
                    left.element.style.setProperty('--INDEX', right.index)
                    right.element.style.setProperty('--INDEX', left.index)
                    await wait()
                    left.index = right.index
                    right.index = temp
                    left.element.classList.remove('active')
                    right.element.classList.remove('active')
                }
                left.element.classList.remove('marker')
            } else {
                frame.element.classList.add('marker')
                await wait()
            }
        }
        array.forEach(elm => {
            elm.element.classList.remove('marker')
            elm.element.classList.remove('active')
            elm.element.classList.remove('pivot')
        })
    }

    function wait() {
        return new Promise(res => setTimeout(() => res(), animationSpeed))
    }
}


function quickSortHelper(array, start, end, animations) {
    if (end <= start) return
    let pivot = partition(array, start, end, animations)
    quickSortHelper(array, start, pivot - 1, animations)
    quickSortHelper(array, pivot + 1, end, animations)
}

function partition(array, start, end, animations) {
    let pivot = array[end],
        i = start - 1,
        animation = [pivot]
    for (let j = start; j < end; j++) {
        if (array[j].value < pivot.value) {
            swap(array, ++i, j)
            animation.push([array[i], array[j]])
        } else {
            animation.push(array[j])
        }
    }
    swap(array, ++i, end)
    animation.push([array[i], array[end]])
    animations.push(animation)
    return i
}

function swap(array, x, y) {
    let temp = array[x]
    array[x] = array[y]
    array[y] = temp
}