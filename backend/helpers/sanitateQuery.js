export const sanitate = (query) => {
    let cleanedQuery = query.replace(/{|}|#|"|:/, '')
    console.log(cleanedQuery)
    return cleanedQuery
}