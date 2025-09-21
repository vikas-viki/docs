const startHrTime = () => {
    if (typeof window !== 'undefined') return performance.now();
    return process.hrtime();
}

const getHrTimeDiff = (start) => {
    if (typeof window !== 'undefined') return performance.now() - start;
    const [ts, tns] = (process.hrtime(start));
    return ts * 1e3 + tns / 1e6;
}

console.log('start')
const start1 = startHrTime();
const outerTimer = setTimeout(() => {
    const start2 = startHrTime();
    console.log(`timer1: ${getHrTimeDiff(start1)}`)
    setTimeout(() => {
        const start3 = startHrTime();
        console.log(`timer2: ${getHrTimeDiff(start2)}`)
        setTimeout(() => {
            const start4 = startHrTime();
            console.log(`timer3: ${getHrTimeDiff(start3)}`)
            setTimeout(() => {
                const start5 = startHrTime();
                console.log(`timer4: ${getHrTimeDiff(start4)}`)
                setTimeout(() => {
                    const start6 = startHrTime();
                    console.log(`timer5: ${getHrTimeDiff(start5)}`)
                    setTimeout(() => {
                        const start7 = startHrTime();
                        console.log(`timer6: ${getHrTimeDiff(start6)}`)
                        setTimeout(() => {
                            const start8 = startHrTime();
                            console.log(`timer7: ${getHrTimeDiff(start7)}`)
                            setTimeout(() => {
                                console.log(`timer8: ${getHrTimeDiff(start8)}`)
                            })
                        })
                    })
                })
            })
        })
    })
})