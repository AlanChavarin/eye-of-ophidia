//react
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

//css
import CommentsCSS from './styles/Comments.module.css'

function PageButtons({count, limit}) {
    const [searchParams, setSearchParams] = useSearchParams()
    let params = new URLSearchParams(window.location.search)
    const [page, setPage] = useState(searchParams.get('page'))

    useEffect(() => {
      setPage(searchParams.get('page'))
      console.log(page)
    }, [searchParams])

    const onClick = (i) => {
      params.set('page', i)
      setSearchParams(params)
    }

  return (
    <div className={CommentsCSS.pageButtons}>
      {count && Array.from(Array(Math.floor(count/limit + 1)), (e, i) => <button className={i==page || (!page && i===0) ? CommentsCSS.selectedButton : ''} onClick={() => onClick(i)}>{i+1}</button>)}
    </div>
  )
}

export default PageButtons