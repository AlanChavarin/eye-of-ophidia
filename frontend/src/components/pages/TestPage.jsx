//react
import { useState } from 'react'

//css
import PostMatchCSS from './styles/PostMatch.module.css'


function TestPage() {

    const [image, setImage] = useState()

    const onChange = (e) => {
        setImage(e.target.files[0]) 
        console.log(e.target.files[0].size)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        
        const formData = new FormData()
        formData.append("image", image)

        fetch(process.env.REACT_APP_API + '/api/test/upload', {
            method: 'POST',
            headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('user')
            },
            body: formData
        })
        .then(r => r.json())
        .then(data => console.log(data))
    }

  return (
    <div className={PostMatchCSS.parent}>
        <form className={PostMatchCSS.form} onSubmit={onSubmit}>
            <div className={PostMatchCSS.container}>
                <label>Upload Image</label>
                <input 
                    type="file" 
                    onChange={onChange}
                    accept="image/*"
                />
            </div>
            <div className={PostMatchCSS.container}>
                <input type="submit" />
            </div>
        </form>
    </div>
  )
}
export default TestPage