import {useEffect, useState, useContext} from 'react'
import PropTypes from 'prop-types'
import UserContext from '../../context/UserContext'

function Issues({matchid}) {
    const API_URL = 'http://localhost:5000/api/issues/'
    const {userData} = useContext(UserContext)
    const [issues, setIssues] = useState()
    const [formData, setFormData] = useState({
        title: '',
        body: '',
    })

    const {title, body} = formData

    useEffect(() => {
        getIssues()
    }, [])

    const getIssues = () => {
        fetch(API_URL + matchid)
        .then(res => res.json())
        .then((data) => {
            if(data.errorMessage){
                throw new Error(data.errorMessage)
            }
            setIssues(data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value 
        }))
    }

    const changeStatus = (e) => {
        const issueid = e.target.parentElement.getAttribute('issueid')
        const status = e.target.getAttribute('status')
        fetch(API_URL + issueid, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('user')
            },
            body: JSON.stringify({
                status: status
            })
        })
        .then(res => res.json())
        .then((data) => {
            if(data.errorMessage){
                throw new Error(data.errorMessage)
            }
            getIssues()
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const onSubmit = (e) => {   
        e.preventDefault()
        console.log(formData)
        fetch(API_URL + matchid, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('user')
            },
            body: JSON.stringify({
                title: title,
                body: body
            })
        })
        .then(res => res.json())
        .then((data) => {
            if(data.errorMessage){
                throw new Error(data.errorMessage)
            }
            getIssues()
        })
        .catch((error) => {
            console.log(error);
        })
    }

  return (
    <div>
        {issues?.map((issue) => (
            <div key={issue._id} issueid={issue._id}>
                <div>{issue.title}</div>
                <div>{issue.body}</div>
                <div>{issue.status}</div>
                {(userData?.privilege === 'admin') ? (
                    <div>
                        <button status='pending' onClick={changeStatus}>Status: pending</button>
                        <button status='fixed' onClick={changeStatus}>Status: fixed</button>
                        <button status='closed' onClick={changeStatus}>Status: closed</button>
                    </div>
                ) : <></>}
            </div>
        ))}
        <form onSubmit={onSubmit}>
            <div>
                <label>Title</label>
                <input name='title' type="text" onChange={onChange} value={title}/>
            </div>
            <div>
                <label>Body</label>
                <textarea name='body' id="" cols="60" rows="7" value={body} onChange={onChange}></textarea>
            </div>
            <input type="submit" />
        </form>
    </div>
  )
}

Issues.propTypes = {
    matchid: PropTypes.string.isRequired
}

export default Issues