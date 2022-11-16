import {useEffect} from 'react'

function EditHistory({editHistory}) {

    useEffect(() => {
        editHistory?.forEach(test => {
            console.log(test)
        })
    }, [])

  return (
    <div>
        {editHistory._id}
    </div>
  )
}
export default EditHistory