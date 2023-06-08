//react
import { useState, useEffect } from 'react'

//service
import useEventService from '../../../service/useEventService'

//css
import BackgroundImageSelectorCSS from './backgroundImageSelector.module.css'
import PostMatchCSS from '../styles/PostMatch.module.css'
import PopupCSS from '../../assets/styles/Popup.module.css'

//clip loader
import ClipLoader from 'react-spinners/ClipLoader'

//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

//helpers
import Popup from '../../assets/Popup'

const getURL = (link) => {
    try{
        return window.URL.createObjectURL(link)
    } 
    catch(error){
        return link
    }
    
}

function BackgroundImageSelector({onChange, image}) {
    const [active, setActive] = useState(false)
    const [deletePopup, setDeletePopup] = useState(false)
    const [activeImagesToDelete, setActiveImagesToDelete] = useState()
    const {eventLoading, getAllBackgroundImageLinks, deleteBackgroundImage} = useEventService()
    const [imageLinks, setImageLinks] = useState()

    const onClick = (e) => {
        e.preventDefault()
        setActive(!active)
        
    }

    const onDelete = (e) => {
        e.preventDefault()
        deleteBackgroundImage(activeImagesToDelete.image, activeImagesToDelete.bigImage)
        .then(() => {
            if(image===activeImagesToDelete.image){
                onChange(null, null)
            }
            if(active){
                getAllBackgroundImageLinks()
                .then(data => {
                    setImageLinks(data)
                })
            }
            setActiveImagesToDelete(null)
            setDeletePopup(false)
        })
    }

    const activateDeletePopup = (e, imageLink) => {
        e.stopPropagation()
        e.preventDefault()
        setDeletePopup(true)
        setActiveImagesToDelete(imageLink)
    }

    const deactivateDeletePopup = (e) => {
        e.preventDefault()
        setDeletePopup(false)
        setActiveImagesToDelete(null)
    }

    useEffect(() => {
        if(active){
            getAllBackgroundImageLinks()
            .then(data => {
                setImageLinks(data)
            })
        }
    }, [active])

  return (<>{active ?
    <div className={BackgroundImageSelectorCSS.parent}>
        <div className={BackgroundImageSelectorCSS.inner}>
             <h1>Select Background Image</h1>
             <button onClick={onClick} className={BackgroundImageSelectorCSS.xButton}>X</button>
             {eventLoading && <ClipLoader size={50}/>}
             <div className={BackgroundImageSelectorCSS.imageContainer}>
                {imageLinks && 
                    imageLinks.map(link => link && 
                        <div className={BackgroundImageSelectorCSS.image} 
                            style={{backgroundImage: `url(${getURL(link.image)})`}}
                            onClick={(e) => onChange(link.image, link.bigImage)}
                        >
                            <button 
                                onClick={e => activateDeletePopup(e, link)} className={BackgroundImageSelectorCSS.xButton} style={{boxShadow: 'none'}}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </button>
                        </div>
                    )
                }
             </div>
             <Popup trigger={deletePopup}>
                <div>
                    <h1>Are you sure you want to <b style={{color: 'red'}}>delete</b> this background image? </h1>
                    <div>It will delete it for all other events using the same image</div>
                </div>
                <div className={PostMatchCSS.popupButtons}>
                    {eventLoading ? <ClipLoader size={25}/> : <>
                    <button className={PopupCSS.deleteButton} onClick={e => onDelete(e)}>Delete</button>
                    <button className={PopupCSS.cancelButton} onClick={(e) => deactivateDeletePopup(e)}>Cancel</button>
                    </>}
                </div>
            </Popup>
        </div>
    </div>

    :

    <button onClick={onClick} className={BackgroundImageSelectorCSS.button}>Choose Image</button>

    
  }
  </>
    
  )
}
export default BackgroundImageSelector