// eslint-disable-next-line no-unused-vars
import React,{useState , useRef , useEffect} from 'react'

function StopWatch() {
  
  const [isRunning , setIsRunning] = useState(false) ; // i use it to trigger  the stop watch to run and stop
  const [elapsedTime ,setElapsedTime] = useState(0) ; // setElapsedTime only used one time in reset function
  const intervalIdRef = useRef(null); /* first i assign intervalIdRef in useEffect / second we use it to clear the interval  */
  const startTimeRef = useRef(0) ; /* first it resign in start function  / second we use it in useEffect to set elapsed time  */

  useEffect(()=>{
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current)
      }, 10);
    }

    return ()=> {
      clearInterval(intervalIdRef.current)
    }
  } , [isRunning])

  function start(){
    setIsRunning(true); 
    startTimeRef.current = (Date.now() - elapsedTime)
  }
  function stop(){
    setIsRunning(false);
  }
  function reset(){
    setElapsedTime(0)
    setIsRunning(false)
  }
  function formateTime(){
    let hour = Math.floor((elapsedTime/ (1000*60*60)%60))
    let minutes = Math.floor((elapsedTime / (1000 * 60) % 60))
    let seconds = Math.floor((elapsedTime / (1000 ) % 60))
    let milliseconds = Math.floor((elapsedTime % 1000) / 10)

    minutes = String(minutes).padStart(2, "0")
    seconds = String(seconds).padStart(2, "0")
    milliseconds = String(milliseconds).padStart(2, "0")

    return `${minutes}:${seconds}:${milliseconds}`
  }
  return (
    <div className='stop-watch'>
      <div id='timer' className='display-time' >{formateTime()}</div>
      <div className='timeControl'>
        <button className='stop' onClick={stop}>STOP</button>
        <button className='start' onClick={start}>START</button>
        <button className='reset' onClick={reset}>RESET</button>
     </div>
    </div>
  )
}

export default StopWatch