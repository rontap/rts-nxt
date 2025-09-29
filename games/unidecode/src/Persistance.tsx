class Persistance {

    static set best(newBest: number) {
        if (newBest > Persistance.best) {
            localStorage.best = newBest
        }
    }

    static get best() {
        return Number(localStorage.best || 0)
    }
}