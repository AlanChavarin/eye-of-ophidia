import useLiveEventService from "../../service/useLiveEventService"
import { useState, useEffect } from "react"

function LiveEvent() {

    const {getLiveEvent} = useLiveEventService()
    const [liveEventEmbed, setLiveEventEmbed] = useState()

    useEffect(() => {
      getLiveEvent()
      .then(data => {
        setLiveEventEmbed(data.embed)
    })
    }, [])

  return (<>
    {liveEventEmbed ? <div dangerouslySetInnerHTML={{__html: liveEventEmbed}}>
    </div>: <div></div>}

  </>
    
  )
}
export default LiveEvent