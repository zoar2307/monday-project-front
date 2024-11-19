import { useEffect, useRef, useState } from 'react'
import { eventBus } from '../services/event-bus.service'
import loader from '../assets/img/loading4.mp4'


export function UserMsg() {
  const [msg, setMsg] = useState(null)
  const timeoutIdRef = useRef()

  useEffect(() => {
    const unsubscribe = eventBus.on('show-user-msg', msg => {
      setMsg(msg)
      console.log(msg)
      // window.scrollTo({top: 0, behavior: 'smooth'});
      if (timeoutIdRef.current) {
        timeoutIdRef.current = null
        clearTimeout(timeoutIdRef.current)
      }
      timeoutIdRef.current = setTimeout(closeMsg, 3000)
    })
    return unsubscribe
  }, [])

  function closeMsg() {
    setMsg(null)
  }

  if (!msg) return <span></span>
  return (
    <section className={`user-msg ${msg.type}`}>

      {/* <video
        loop
        autoPlay={true}
        src={loader}
      ></video> */}
      <span>{msg.txt}</span>
      <button onClick={closeMsg}>x</button>
    </section>
  )
}
