import { useState } from "react"



export default function Clock() {
    const [state, setState] = useState({
        breakLength: 5,
        sessionLength: 25
    })

    function increaseBreakLength() {
        setState({
            ...state,
            breakLength: state.breakLength<60?state.breakLength + 1:state.breakLength,
        });
    }

    function decreaseBreakLength() {
        setState({
            ...state,
            breakLength: state.breakLength>0?state.breakLength - 1: 0,
        });
    }

    function increaseSessionLength() {
        setState({
            ...state,
            sessionLength: state.sessionLength<60?state.sessionLength + 1:state.sessionLength,
        });
    }

    function decreaseSessionLength() {
        setState({
            ...state,
            sessionLength: state.sessionLength>0?state.sessionLength - 1: 0,
        });
    }

    return (
        <div className="clockWrap">
            <header>
                <h1>25 + 5 Clock</h1>
            </header>
            <div className="block">
                <span className="title">Break Length (Minites): </span>
                
                <span className="length" id="break-label">{state.breakLength}</span>
                <button className="btn" id="break-increment" onClick={increaseBreakLength}><i class="fa-solid fa-arrow-up"></i></button>
                <button className="btn" id="break-decrement" onClick={decreaseBreakLength}><i class="fa-solid fa-arrow-down"></i></button>
            </div>
            <div className="block">
                <span className="title">Session Length (Minites): </span>
                
                <span className="length" id="session-label">{state.sessionLength}</span>
                <button className="btn" id="session-increment" onClick={increaseSessionLength}><i class="fa-solid fa-arrow-up"></i></button>
                <button className="btn" id="session-decrement" onClick={decreaseSessionLength}><i class="fa-solid fa-arrow-down"></i></button>
            </div>
            <div className="block block-center">
                <div className="countDown">
                <span>Session</span>
                <h1>25:00</h1>
                
                <div className="controlPanel">
                    <button className="btn" ><i class="fa-solid fa-play"></i></button>
                    <button className="btn" ><i class="fa-solid fa-pause"></i></button>
                    <button className="btn" ><i class="fa-solid fa-rotate"></i></button>
                </div>
                </div>
            </div>
        </div>
    )
}