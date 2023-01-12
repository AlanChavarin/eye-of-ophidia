export const getYoutubeParams = (link) => {
    if(!link){
        return false
    } else if(link.substring(0, 17) === 'https://youtu.be/'){
        const params = link.substring(17, link.length)
        const ytid = params.substring(0, params.indexOf('?'))
        const time = params.substring(params.indexOf('=')+1, params.length)
        return [ytid, time]
    } else if (link.substring(0, 24) === 'https://www.youtube.com/'){
        const paramsObject = new URLSearchParams(link.substring(30, link.length))
        const params = [paramsObject.get('v'), paramsObject.get('t')]
        params[1] && (params[1] = params[1].replace(/\D/g,''))
        return params
    } else {
        return false
    }

}