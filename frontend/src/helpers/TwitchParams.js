export const getTwitchParams = (link) => {
    let params = []
    if(link.includes('?t=')){
        params[0] = link.substring(link.indexOf('/videos/') + 8, link.indexOf('?'))
        params[1] = link.substring(link.indexOf('?t=') + 3, link.length)
    } else {
        params[0] = link.substring(link.indexOf('/videos/') + 8, link.length)
        params[1] = '1s'
    }
    
    return params
}