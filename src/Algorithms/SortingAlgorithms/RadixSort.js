export default async function radixSort(array, animationSpeed, maxDigits) {
    const animations = []
    sortHelper(array, animations)
    for (let animation of animations) {
        const [selection, buckets] = animation
        for (let i = 0; i < selection.length; i++) {
            const [nthNumber, obj] = selection[i]
            setBackgroundColor(nthNumber, obj, maxDigits)
            await wait()
        }
        let index = 0
        for (let bucket of buckets) {
            bucket.element.style.setProperty('--INDEX', index)
            bucket.element.style.bottom = 0
            await wait()
            index++
        }
    }
    for (let obj of array) {
        obj.element.style.backgroundColor = 'var(--BAR_COLOR)'
        await new Promise(res => setTimeout(() => res(), animationSpeed / 2))
    }
    function wait() {
        return new Promise(res => setTimeout(() => res(), animationSpeed))
    }
}

function sortHelper(array, animations) {
    let largestAvailableDigit = getLargetsDigit(array)
    let index = largestAvailableDigit - 1
    while (index >= 0) {
        const animation = []
        const buckets = Array.apply(null, Array(10)).map(() => [])

        for (let i = 0; i < array.length; i++) {
            const value = array[i].value.toString()
            const paddedString = String(value).padStart(largestAvailableDigit, 0)
            const nthNumber = parseInt(paddedString[index])
            buckets[nthNumber].push(array[i])
            animation.push([nthNumber, array[i]])
        }

        let i = 0,
            bucketAnimation = []
        for (let bucket of buckets) {
            for (let element of bucket) {
                // animations.push(element)
                // element.index = array[i].index
                bucketAnimation.push(element)
                array[i] = element
                i++
            }
        }
        animations.push([animation, bucketAnimation])
        index--
    }
    return array

}

function setBackgroundColor(number, array, maxDigits) {
    let hue = 15
    let top = 100 - ((array.value / maxDigits) * 100)

    switch (number) {
        case 0:
            array.element.style.backgroundColor = `hsl(${hue}, 100%, 50%)`
            array.element.style.bottom = `${100 + top}%`
            break;
        case 1:
            array.element.style.backgroundColor = `hsl(${hue + (number * 15)}, 100%, 50%)`
            array.element.style.bottom = `${100 + top}%`
            break;
        case 2:
            array.element.style.backgroundColor = `hsl(${hue + (number * 15)}, 100%, 50%)`
            array.element.style.bottom = `${100 + top}%`
            break;
        case 3:
            array.element.style.backgroundColor = `hsl(${hue + (number * 15)}, 100%, 50%)`
            array.element.style.bottom = `${100 + top}%`
            break;
        case 4:
            array.element.style.backgroundColor = `hsl(${hue + (number * 15)}, 100%, 50%)`
            array.element.style.bottom = `${100 + top}%`
            break;
        case 5:
            array.element.style.backgroundColor = `hsl(${hue + (number * 15)}, 100%, 50%)`
            array.element.style.bottom = `${100 + top}%`
            break;
        case 6:
            array.element.style.backgroundColor = `hsl(${hue + (number * 15)}, 100%, 50%)`
            array.element.style.bottom = `${100 + top}%`
            break;
        case 7:
            array.element.style.backgroundColor = `hsl(${hue + (number * 15)}, 100%, 50%)`
            array.element.style.bottom = `${100 + top}%`
            break;
        case 8:
            array.element.style.backgroundColor = `hsl(${hue + (number * 15)}, 100%, 50%)`
            array.element.style.bottom = `${100 + top}%`
            break;
        case 9:
            array.element.style.backgroundColor = `hsl(${hue + (number * 15)}, 100%, 50%)`
            array.element.style.bottom = `${100 + top}%`
            break;

        default:
            break;
    }
}


const getLargetsDigit = (array) => {
    let largestValue = 0
    let largestDigit
    for (let elm of array) {
        if (elm.value > largestValue)
            largestValue = elm.value
    }
    largestDigit = largestValue.toString().length
    return largestDigit
}