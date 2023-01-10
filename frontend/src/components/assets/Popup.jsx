import PopupCSS from './styles/Popup.module.css'

function Popup(props) {
  return (props.trigger) ? (
    <div className={PopupCSS.popup}>
        <div className={PopupCSS.inner}>
            {/* <button className={PopupCSS.closeButton}><FontAwesomeIcon icon={faWindowClose}/></button> */}
            {props.children}
        </div>  
    </div>
  ) : ''
}
export default Popup