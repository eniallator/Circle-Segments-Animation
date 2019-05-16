const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const segInput = document.getElementById('segments')
const segError = document.getElementById('num-seg-error')

const defaultNumSegments = 20
let numSegments = defaultNumSegments

const speed = 1
const maxSegmentWidth = 20
const ageOfDeath = 200
let progress = 0

const curve = x => (2 * x - 1) ** 5 / 2 + 0.5

segInput.addEventListener('input', () => {
    if (segInput.value === '') {
        segError.classList.add('hidden')
        numSegments = defaultNumSegments
        return
    }
    const newNumSegments = Number(segInput.value)
    if (isNaN(newNumSegments) || newNumSegments % 1 !== 0 || newNumSegments < 1 || newNumSegments > 1000) {
        segError.classList.remove('hidden')
        numSegments = defaultNumSegments
    } else {
        segError.classList.add('hidden')
        numSegments = newNumSegments
    }
})

ctx.fillStyle = 'black'
ctx.strokeStyle = 'white'

function run() {
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    const segLength = (2 * Math.PI) / numSegments

    for (let i = 0; i < numSegments; i++) {
        const currSeg = (progress + (i / numSegments) * ageOfDeath) % ageOfDeath
        const donePercent = curve(currSeg / ageOfDeath)
        const mag = donePercent * (canvas.width / 2 + 50)

        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2, mag, segLength * i, segLength * (i + 1))
        ctx.lineWidth = donePercent * maxSegmentWidth
        ctx.stroke()
    }

    progress = (progress + speed) % ageOfDeath

    requestAnimationFrame(run)
}

run()
