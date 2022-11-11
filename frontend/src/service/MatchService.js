const API_URL = 'http://localhost:5000/api/matches/'

export const getMatch = async (setMatch, matchid) => {
    return new Promise(resolve => {
        fetch(API_URL + matchid)
        .then(res => res.json())
        .then((data) => {
            if(data.errorMessage){
                throw new Error(data.errorMessage)
            }
            setMatch(data)
            resolve(true)
        })
        .catch((error) => {
            console.log(error);
        })
    })
}

export const getMatches = async (text, hero1, hero2, setMatches) => {
    fetch(API_URL + '?text=' + text + '&hero1=' + hero1 + '&hero2=' + hero2)
    .then(res => res.json())
    .then((data) => {
        setMatches(data)
    })
}