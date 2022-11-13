const API_URL = 'http://localhost:5000/api/heroes'

export const getHeroes = async () => {
    return new Promise(resolve => (
        fetch(API_URL)
        .then(res => res.json())
        .then((data) => {
            if(data.errorMessage){
                throw new Error(data.errorMessage)
            }
            let heroNames = []
            data.map((hero) => {
                heroNames.push(hero.name)
            })
            resolve(heroNames)
        })
    ))
}