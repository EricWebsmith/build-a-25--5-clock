import { useState } from "react";



export default function Clock() {
    const [state, setState] = useState({
        breakLength: 5,
        sessionLength: 25,
        clockFace: '25:00',
        isSesson: true,
        paused: false
    });
    // const [audio] = useState(new Audio('beep.mp3'));

    function increaseBreakLength() {
        setState({
            ...state,
            breakLength: state.breakLength < 60 ? state.breakLength + 1 : state.breakLength,
        });
    }

    function decreaseBreakLength() {
        setState({
            ...state,
            breakLength: state.breakLength > 0 ? state.breakLength - 1 : 0,
        });
    }

    function increaseSessionLength() {
        setState({
            ...state,
            sessionLength: state.sessionLength < 60 ? state.sessionLength + 1 : state.sessionLength,
        });
    }

    function decreaseSessionLength() {
        setState({
            ...state,
            sessionLength: state.sessionLength > 0 ? state.sessionLength - 1 : 0,
        });
    }

    function play() {
        state.paused = false;
        let totalTime = parseInt(state.sessionLength) * 60;
        if (state.paused) {
            console.log(state.countDown);
            totalTime = parseInt(state.countDown);
            tick(totalTime, state.isSesson);
        } else {
            tick(totalTime, true);
        }
        
    }

    function pause() {
        console.log('pausing ', state.timeoutId);
        clearTimeout(state.timeoutId+1);
        setState({
            ...state,
            paused: true
        });
    }

    function refresh() {
        console.log('pausing ', state.timeoutId);
        clearTimeout(state.timeoutId+1);
        setState({
            ...state,
            paused: false,
            clockFace: '25:00'
        });
    }

    function tick(countDown, isSesson) {

        if (state.paused) {
            setState({
                ...state,
                countDown
            })
            return;
        }
        const timeoutId = setTimeout(() => {
            countDown -= 1;
            if (countDown === 0) {
                beep();
                isSesson = !isSesson;
                if (isSesson) {
                    countDown = parseInt(state.sessionLength) * 60;
                } else {
                    countDown = parseInt(state.breakLength) * 60;
                }
            }
            setClock(countDown, isSesson, timeoutId);
            tick(countDown, isSesson);
        }, 100);
    }

    function format(n) {
        if (n < 10) {
            return '0' + n;
        }

        return String(n);
    }

    function setClock(countDown, isSesson, timeoutId) {
        const minutes = Math.floor(countDown / 60);
        const seconds = countDown % 60;
        const clockFace = format(minutes) + ":" + format(seconds);
        setState({
            ...state,
            isSesson,
            timeoutId,
            countDown,
            clockFace
        })
    }

    function beep() {
        var audio = new Audio('https://audio-previews.elements.envatousercontent.com/files/170537824/preview.mp3?response-content-disposition=attachment%3B+filename%3D%223S97QB6-beeps.mp3%22');
        audio.play();
    }

    return (
        <div className="clockWrap">
            <header>
                <h1>25 + 5 Clock</h1>
            </header>
            <div className="block">
                <span className="title">Break Length (Minites): </span>

                <span className="length" id="break-label">{state.breakLength}</span>
                <button className="btn" id="break-increment" onClick={increaseBreakLength}><i className="fa-solid fa-arrow-up"></i></button>
                <button className="btn" id="break-decrement" onClick={decreaseBreakLength}><i className="fa-solid fa-arrow-down"></i></button>
            </div>
            <div className="block">
                <span className="title">Session Length (Minites): </span>

                <span className="length" id="session-label">{state.sessionLength}</span>
                <button className="btn" id="session-increment" onClick={increaseSessionLength}><i className="fa-solid fa-arrow-up"></i></button>
                <button className="btn" id="session-decrement" onClick={decreaseSessionLength}><i className="fa-solid fa-arrow-down"></i></button>
            </div>
            <div className="block block-center">
                <div className="countDown">
                    <span>{state.isSesson?'Session':'Break'}</span>
                    <h1>{state.clockFace}</h1>

                    <div className="controlPanel">
                        <button className="btn" onClick={play} ><i className="fa-solid fa-play"></i></button>
                        <button className="btn" onClick={pause}><i className="fa-solid fa-pause"></i></button>
                        <button className="btn" onClick={refresh} ><i className="fa-solid fa-rotate"></i></button>
                        <button className="btn" onClick={beep} ><i className="fa-solid fa-music"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}