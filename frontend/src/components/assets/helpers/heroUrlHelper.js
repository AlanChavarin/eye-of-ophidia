const heroUrlHelper = (heroName) => {

    let heroUrl

    //this is because file names cant have forward dashes
    if(heroName==='Dash I/O'){
        heroUrl = window.location.origin + `/images/${encodeURI('Dash IO')}.jpg`
        return heroUrl
    }

    if(heroName==='Maxx \'The Hype\' Nitro'){
        heroUrl = window.location.origin + `/images/${encodeURI('Maxx The Hype Nitro')}.jpg`
        return heroUrl
    }

    heroUrl = window.location.origin + `/images/${encodeURI(heroName)}.jpg`

    return heroUrl
}

export default heroUrlHelper