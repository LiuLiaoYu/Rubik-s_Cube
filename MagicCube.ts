export class MagicCube {
    state: number[][]
    bar: number[][]
    nface: number[]
    colors: string[]

    constructor() {
        this.state = [1, 2, 3, 4, 5, 6].map(e => Array(9).fill(e))
        this.bar = [[2, 5, 8], [6, 7, 8], [0, 3, 6], [0, 1, 2]]
        this.nface = [4, 5, 1, 2]
        this.colors = ["white", 'blue', 'orange', "yellow", "green", 'red']
    }

    rotate(i: number, dir: number = 0) {
        let i_ = this.nface.map(e => (i + e) % 6)
        let t = ((i % 2 + dir) % 2) * 2 - 1;

        let y = i_.map((f, i) => this.bar[i].map(j => this.state[f][j]))
        i_.forEach((f, i) => { this.bar[i].forEach((j, k) => { this.state[f][j] = y[(i + t + 4) % 4][k] }) })

        this.state[i] = (t > 0 ? [6, 3, 0, 7, 4, 1, 8, 5, 2] : [2, 5, 8, 1, 4, 7, 0, 3, 6]).map(j => this.state[i][j])
    }
}