const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const numSegments = 20
const speed = 1
const maxSegmentWidth = 20
const ageOfDeath = 200
const segLength = (2 * Math.PI) / numSegments

const curve = x => (2 * x - 1) ** 5 / 2 + 0.5
const segments = new Array(numSegments).fill().map((_, i) => (i / numSegments) * ageOfDeath)

ctx.fillStyle = 'black'
ctx.strokeStyle = 'white'

function run() {
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < segments.length; i++) {
        const donePercent = curve(segments[i] / ageOfDeath)
        const mag = donePercent * (canvas.width / 2 + 50)

        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2, mag, segLength * i, segLength * (i + 1))
        ctx.lineWidth = donePercent * maxSegmentWidth
        ctx.stroke()

        segments[i] = (segments[i] + speed) % ageOfDeath
    }

    requestAnimationFrame(run)
}

run()
