import {useState} from 'react'

function EditHistory({editHistory}) {
    const [dropdown, setDropdown] = useState(false)

    const onClick = () => {
        dropdown ? setDropdown(false) : setDropdown(true)
    }

  return (
    <div>
        <button onClick={onClick}>{editHistory._id}</button>
        {dropdown && ( 
        <>
            <div>updated at: {editHistory.updatedAt}</div>
            <div>change submitted by: {editHistory.editor}</div>
        </>
        )}
    </div>
  )
}
export default EditHistory