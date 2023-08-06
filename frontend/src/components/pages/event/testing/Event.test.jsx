import { render, act, within, queryByAttribute, cleanup, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import UserContext from '../../../../context/UserContext'
import '@testing-library/jest-dom'
import Event from '../Event'
import {eventJanAge, eventBaltimoreProtour} from './eventFixtures'
import {matchesJanAge, matchesBaltimoreProtour} from './matchFixtures'
import useEventService from '../../../../service/useEventService'
import useMatchService from '../../../../service/useMatchService'

afterEach(cleanup)

const userData = {
    name:'',
    email: '',
    karma: 0,
    privilege: ''
}

jest.mock('../../../../service/useEventService')
jest.mock('../../../../service/useMatchService')

describe('event component', () => {

    test('Does the event component show all matches when given a 1 day event', async () => {

        const mockEvent = {...eventJanAge[0]}
        const mockMatches = [...matchesJanAge]

        useEventService.mockImplementation(() => {
            let eventLoading = false
        
            const getEvent = jest.fn(async () => {
                eventLoading = true
                return new Promise(resolve => {
                    eventLoading = false
                    resolve(mockEvent)
                })
            })
        
            const restoreEvent = jest.fn(async () => {
                eventLoading = true
                return new Promise(resolve => {
                    eventLoading = false
                    resolve({message: 'Hello'})
                })
            })
        
            return {
                eventLoading,
                getEvent,
                restoreEvent,
            }
        })

        useMatchService.mockImplementation(() => {
            let matchLoading = false
        
            const getMatchesByEvent = jest.fn(async () => {
                matchLoading = true
                return new Promise(resolve => {
                    matchLoading = false
                    resolve(mockMatches)
                })
            })
        
            return {
                matchLoading,
                getMatchesByEvent,
            }
        })

        let container
        const getByMatchId = queryByAttribute.bind(null, 'href')

        await act(() => {
            ({container} = render(

                <UserContext.Provider value={{
                    userData
                }}>
                    <Event />
                </UserContext.Provider>, 
            
                {wrapper: MemoryRouter}
            ))
        })

       await waitFor(() => {
            mockMatches.map(match => {
                const currElement = getByMatchId(container, `/matches/${match._id}`)

                expect(currElement).toBeDefined()
                expect(currElement).not.toBeNull()

                const eventTitleElement = within(currElement).findByText(match.event.name)

                expect(eventTitleElement).toBeDefined()
                expect(eventTitleElement).not.toBeNull()
            })
       }) 
       
       
    }) 

    test('Does the event component show all matches when given a multi-day event', async () => {

        const mockEvent = {...eventBaltimoreProtour[0]}
        const mockMatches = [...matchesBaltimoreProtour]

        useEventService.mockImplementation(() => {
            let eventLoading = false
        
            const getEvent = jest.fn(async () => {
                eventLoading = true
                return new Promise(resolve => {
                    eventLoading = false
                    resolve(mockEvent)
                })
            })
        
            const restoreEvent = jest.fn(async () => {
                eventLoading = true
                return new Promise(resolve => {
                    eventLoading = false
                    resolve({message: 'Hello'})
                })
            })
        
            return {
                eventLoading,
                getEvent,
                restoreEvent,
            }
        })

        useMatchService.mockImplementation(() => {
            let matchLoading = false
        
            const getMatchesByEvent = jest.fn(async () => {
                matchLoading = true
                return new Promise(resolve => {
                    matchLoading = false
                    resolve(mockMatches)
                })
            })
        
            return {
                matchLoading,
                getMatchesByEvent,
            }
        })

        let container
        const getByMatchId = queryByAttribute.bind(null, 'href')

        await act(() => {
            ({container} = render(

                <UserContext.Provider value={{
                    userData
                }}>
                    <Event />
                </UserContext.Provider>, 
            
                {wrapper: MemoryRouter}
            ))
        })

        await waitFor(() => {
            mockMatches.map(match => {
                const currElement = getByMatchId(container, `/matches/${match._id}`)

                expect(currElement).toBeDefined()
                expect(currElement).not.toBeNull()

                const eventTitleElement = within(currElement).findByText(match.event.name)

                expect(eventTitleElement).toBeDefined()
                expect(eventTitleElement).not.toBeNull()
            })
        })

    }) 

})

