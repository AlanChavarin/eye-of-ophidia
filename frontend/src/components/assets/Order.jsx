import OrderCSS from './styles/Order.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

function Order({order, setOrder}) {
    const onClick = () => {
        if(!order){
            setOrder(1)
        }else {
            order===1 ? setOrder(-1) : setOrder(1)
        }
    }

  return (
    <button type="button" onClick={() => onClick()} className={OrderCSS.button}>
        {order===1 ? 'Oldest ' : 'Newest '}
        <FontAwesomeIcon icon={order===-1 ? faCaretUp: faCaretDown}/>
    </button>
  )
}
export default Order