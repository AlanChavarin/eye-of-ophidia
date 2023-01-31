export const getYoutubeParams = (link) => {
    if(!link){
        return false
    } else if(link.substring(0, 17) === 'https://youtu.be/'){
        let params = link.substring(17, link.length)
        let time
        if(!params.includes('?', 0)){
            params = params + '?'
            time = 0
        } else {
            time = params.substring(params.indexOf('=')+1, params.length)
        }
        const ytid = params.substring(0, params.indexOf('?'))
        return [ytid, time]
    } else if (link.substring(0, 24) === 'https://www.youtube.com/'){
        const paramsObject = new URLSearchParams(link.substring(30, link.length))
        const params = [paramsObject.get('v'), paramsObject.get('t')]
        if(!params[1]){params[1]=0}
        params[1] && (params[1] = params[1].replace(/\D/g,''))
        return params
    } else {
        return false
    }

}