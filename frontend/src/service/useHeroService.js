import {useContext, useState} from 'react'
import AlertContext from '../context/AlertContext'
const API_URL =  `${process.env.REACT_APP_API && process.env.NODE_ENV==='development' ? process.env.REACT_APP_API : ''}` + '/api/heroes/'

const useHeroService = () => {
    
    const {addAlert} = useContext(AlertContext)
    const [heroLoading, setLoading] = useState(false)

    const getHeroes = async () => {
        setLoading(true)
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
                setLoading(false)
                resolve(heroNames)
            })
            .catch(error => err(error))
        ))
    }

    const getAdultHeroNames = async () => {
        setLoading(true)
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
                setLoading(false)
                resolve(heroNames)
            })
            .catch(error => err(error))
        ))
    }

    const getYoungHeroNames = async () => {
        setLoading(true)
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
                setLoading(false)
                resolve(heroNames)
            })
            .catch(error => err(error))
        ))
    }

    const getHero = async (heroid) => {
        setLoading(true)
        return new Promise(resolve => {
            fetch(API_URL + heroid)
            .then(res => res.json())
            .then(data => {
                if(data.errorMessage){
                    throw new Error(data.errorMessage)
                }
                setLoading(false)
                resolve(data)
            })
            .catch((error) => err(error))
        })
    }

    const err = (error) => {
        console.error(error.message)
        addAlert(error.message, 'error')
        setLoading(false)
    }

    return {heroLoading, getHeroes, getHero, getAdultHeroNames, getYoungHeroNames}
}

export default useHeroService