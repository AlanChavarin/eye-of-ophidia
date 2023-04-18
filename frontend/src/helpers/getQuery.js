const getQuery = () => {
    const params = new URL(document.location).searchParams
    let query = {}
    for(const [key, value] of params.entries()){
        query[key] = value
    }
    if(!query.recyclebin){
        query.recyclebin = false
    }
    return query
}

export default getQuery