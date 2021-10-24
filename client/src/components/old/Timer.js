import React, {useEffect, useState} from 'react';


function timeToString(secs){
    let minutes = Math.floor(secs/60)
    let seconds = secs % 60
    if(seconds < 10) {
        seconds = "0" + seconds
    }
    if(minutes < 10) {
        minutes = "0" + minutes
    }
    return minutes + ":" + seconds
}

function Timer(props) {
    const timerLength = props.time
    const [seconds, setSeconds] = useState(timerLength)
    const [timeV, setTimeV] = useState(0)

    function decrement(secs) {
        if(secs === 0) {
            alert("Timer finished")
        }
        else if(secs > 0) {
            secs = secs-1
            setSeconds(secs)
            setTimeV(setTimeout(decrement, 1000, secs))
        }
    }
    function pauseLabel(secs) {
        if(secs === 0) {
            return "Restart"
        }
        else {
            return "Pause"
        }
    }
    function pauseRestart(secs, timeout) {
        clearTimeout(timeout)
        if(secs === 0) {
            setSeconds(timerLength)
        }
    }
    return (
        <div>
            <p>Timer</p>
            <p>{timeToString(seconds)}</p>
            <button type="Start timer" onClick={() => setTimeV(setTimeout(decrement, 1000, seconds))}>
                Start
            </button>
            <button type="Pause/Restart timer" onClick={() => pauseRestart(seconds, timeV)}>
                {pauseLabel(seconds)}
            </button>
        </div>
    )
}
export default Timer;