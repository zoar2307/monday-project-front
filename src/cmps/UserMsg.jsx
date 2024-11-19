import { useEffect, useRef, useState } from 'react'
import { eventBusService } from '../services/event-bus.service'
import loader from '../assets/img/loading4.mp4'


export function UserMsg() {
  const [msg, setMsg] = useState(null)
  const [isClose, setIsClose] = useState(true)
  const timeoutIdRef = useRef()

  useEffect(() => {
    const unsubscribe = eventBusService.on('show-user-msg', msg => {
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
    <section className={`user-msg ${msg.type} ${isClose ? 'close' : 'open'}`}>

      {/* <video
        loop
        autoPlay={true}
        src={loader}
      ></video> */}
      <span>{msg.txt}</span>
    </section>
  )
}
