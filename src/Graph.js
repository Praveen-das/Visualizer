import Bar from "./Bar"

// const GAP = 1
export default class Graph {
    #bars
    #temp
    #x

    constructor(container, length, speed) {
        container.style.setProperty('--LENGTH', length)
        container.style.setProperty('--SPEED', `${speed > 100 ? 100 : speed}ms`)
        this.speed = speed
        this.#bars = generateGraph(length).map((bar, i) => {
            let value = Math.floor((Math.random() * (100 - 10)) + 10)
            container.append(bar)
            return new Bar(bar, i, value, speed)
        })
    }

    set bars(value) {
        this.#bars = value
    }

    get bars() {
        return this.#bars
    }

    set temp(value) {
        this.#temp = value
        this.#temp.index = value.index
    }

    get temp() {
        return this.#temp
    }

    // sortGraph(method) {
    //     switch (method) {
    //         case 'QUICK_SORT':
    //             this.bubbleSort(this.bars)
    //             break;

    //         default:
    //             break;
    //     }
    // }

    async insertionSort() {
        // debugger
        for (let i = 0; i < this.bars.length; i++) {
            let markerIndex = i
            await this.#bars[markerIndex].setWhiteMarker()
            await this.#bars[markerIndex].detach()

            if (i === 0) {
                await this.#bars[markerIndex].attach()
                continue
            }

            for (let j = i - 1; j >= 0; j--) {
                if (this.bars[markerIndex].value > this.bars[j].value) {
                    await this.#bars[markerIndex].attach()
                    break
                }

                await this.#bars[j].setTMarker()
                await this.swap(this.#bars, markerIndex, j, this.speed)
                if (j === 0) {
                    await this.#bars[j].attach()
                    break
                }
                markerIndex = j
            }
        }
        this.#reset()
    }

    async selectionSort() {
        let lastIndex = this.bars.length
        let index = 0,
            smallestIndex

        while (index < lastIndex - 1) {
            for (let i = index; i < lastIndex; i++) {
                await this.bars[i].setTMarker()
                if (smallestIndex == null || this.bars[i].value < this.bars[smallestIndex].value) {
                    smallestIndex = i
                    await this.bars[smallestIndex].setWhiteMarker()
                }
            }
            await this.bars[index].setTMarker()
            await this.swap(this.#bars, index, smallestIndex, this.speed)
            this.#reset()
            smallestIndex = undefined
            index++
        }
    }

    async bubbleSort() {
        let lastScannedIndex = this.bars.length - 1
        while (lastScannedIndex > 0) {
            for (let i = 0; i < lastScannedIndex; i++) {
                await this.#bars[i].setWhiteMarker()
                for (let j = i + 1; j > i && j < lastScannedIndex + 1; j--) {
                    await this.#bars[j].setTMarker()
                    if (this.bars[i].value > this.bars[j].value) {
                        await this.swap(this.#bars, i, j, this.speed)
                    }
                }
            }
            this.#reset()
            lastScannedIndex--
        }
    }

    async mergeSort() {
        let leftIndex = 0
        let rightIndex = this.#bars.length - 1
        this.reduce(this.#bars, leftIndex, rightIndex)
    }

    #reset() {
        this.#bars.forEach(bar => {
            bar.element.style.background = 'hsl(21, 100%, 60%)'
        })
    }

    swap(firstElement, secondElement, ms) {
        let temp
        temp = this.#bars[secondElement]
        temp.index = firstElement
        this.#bars[secondElement] = this.#bars[firstElement]
        this.#bars[secondElement].index = secondElement
        this.#bars[firstElement] = temp

        return new Promise(res => setTimeout(() => res(true), ms))
    }
    
    async reduce(array, leftIndex, rightIndex) {
        if (leftIndex >= rightIndex) {
            return
        }
        let middleIndex = leftIndex + parseInt((rightIndex - leftIndex) / 2)
    
        await this.reduce(array, leftIndex, middleIndex)
        await this.reduce(array, middleIndex + 1, rightIndex)
        await this.wait()
        await this.merge(array, leftIndex, middleIndex, rightIndex)
    }
    
    async merge(arr, l, m, r) {
        // debugger
        var left = m - l + 1;
        var right = r - m;
        var L = new Array(left);
        var R = new Array(right);
        
        for (var i = 0; i < left; i++) {
            L[i] = arr[l + i]
            L[i].index = l + i
        }
        
        for (var j = 0; j < right; j++) {
            R[j] = arr[m + 1 + j]
            R[j].index = m + 1 + j
        }
        
        var i = 0;
        var j = 0;
        var k = l;
        
        while (i < left && j < right) {
            if (L[i]?.value < R[j]?.value) {
                arr[k] = L[i]
                arr[k].index = k
                await this.#bars[k].setWhiteMarker()
                i++;
            } else {
                arr[k] = R[j];
                arr[k].index = k
                j++;
            }
            k++;
        }
        
        while (i < left) {
            arr[k] = L[i];
            arr[k].index = k
            i++;
            k++;
        }
        
        while (j < right) {
            arr[k] = R[j];
            arr[k].index = k
            j++;
            k++;
        }

        
    }

    wait() {
        return new Promise(res => setTimeout(() => res(true), this.speed))
    }
}



function generateGraph(length) {
    const array = []
    for (let i = 0; i < length; i++) {
        const div = document.createElement('div')
        const marker = document.createElement('input')
        const swapper = document.createElement('input')

        marker.type = 'radio'
        swapper.type = 'radio'
        marker.name = 'marker'
        swapper.name = 'swapper'
        marker.hidden = true
        swapper.hidden = true
        div.append(marker)
        div.append(swapper)

        div.id = 'bar'
        array.push(div)
    }
    return array
}