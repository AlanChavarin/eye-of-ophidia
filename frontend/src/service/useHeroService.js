import {useContext} from 'react'
import AlertContext from '../context/AlertContext'

const useHeroService = () => {
    const API_URL = 'http://localhost:5000/api/heroes/'
    const {addAlert} = useContext(AlertContext)

    const getHeroes = async () => {
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
            .catch(error => {
                console.error(error)
                addAlert(error.message, 'error')
            })
        ))
    }

    const getAdultHeroNames = async () => {
        return new Promise(resolve => (
            fetch(API_URL + 'adultnames')
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
            .catch(error => {
                console.error(error)
                addAlert(error.message, 'error')
            })
        ))
    }

    const getYoungHeroNames = async () => {
        return new Promise(resolve => (
            fetch(API_URL + 'youngnames')
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
            .catch(error => {
                console.error(error)
                addAlert(error.message, 'error')
            })
        ))
    }

    const getHero = async (heroid) => {
        return new Promise(resolve => {
            fetch(API_URL + heroid)
            .then(res => res.json())
            .then(data => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                resolve(data)
            })
            .catch((error) => {
                console.error(error)
                addAlert(error.message, 'error')
            })
        })
    }

    return {getHeroes, getHero, getAdultHeroNames, getYoungHeroNames}
}

export default useHeroService