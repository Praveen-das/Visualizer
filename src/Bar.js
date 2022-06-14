export default class Bar {
    #value
    #element
    #index
    #marker
    #swapper
    #speed

    constructor(element, index, value, speed) {
        this.#element = element
        this.#index = index
        this.#value = value
        this.#speed = speed
        this.#element.style.setProperty('--value', `${this.#value}%`)
        this.#element.style.setProperty('--index', this.#index)

        this.marker = this.#element.children.marker
        this.swapper = this.#element.children.swapper
    }

    set value(value) {
        this.#value = value
    }

    get element() {
        return this.#element
    }

    get value() {
        return this.#value
    }

    get index() {
        return this.#index
    }

    setTMarker() {
        let promise = new Promise(res => setTimeout(() => res(true), this.#speed))
        this.marker.checked = true
        this.#element.style.background = 'hsl(21, 100%, 80%)'
        let markers = document.getElementsByName('marker')
        markers.forEach(marker => {
            if (marker.nextSibling.checked) return
            if (!marker.checked && marker.parentElement !== this.#element)
                marker.parentElement.style.background = 'hsl(21, 100%, 60%)'
        })
        return promise
    }
    setWhiteMarker() {
        let promise = new Promise(res => setTimeout(() => res(true), this.#speed))
        this.swapper.checked = true
        this.#element.style.background = 'hsl(21, 100%, 100%)'
        let swappers = document.getElementsByName('swapper')
        swappers.forEach(swapper => {
            if (!swapper.checked && swapper.parentElement !== this.#element)
                swapper.parentElement.style.background = 'hsl(21, 100%, 60%)'
        })
        return promise
    }
    detach() {
        let promise = new Promise(res => setTimeout(() => res(true), this.#speed))
        this.#element.style.bottom = '100px'
        return promise
    }
    attach() {
        let promise = new Promise(res => setTimeout(() => res(true), this.#speed / 2))
        this.#element.style.bottom = '0px'
        return promise
    }

    // get swapper() {
    //     return this.#swapper
    // }
    // set swapper(value) {
    //     this.#swapper.checked = value
    //     if (value)
    //         this.#element.style.background = 'blue'
    //     this.element.style.background = 'white'

    // }

    set index(value) {
        this.#index = value
        this.#element.style.setProperty('--index', value)
    }
}
