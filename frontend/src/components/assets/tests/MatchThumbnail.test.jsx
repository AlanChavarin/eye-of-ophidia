import {render} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import MatchThumbnail from '../MatchThumbnail'
import '@testing-library/jest-dom'


const exampleMatch = {
    "event": {
        "_id": "642b74dcad7c9e49cf97e67f",
        "name": "January AGE Open",
        "location": "Pasadena, CA",
        "format": "Classic Constructed",
        "startDate": "2023-01-07T00:00:00.000Z",
        "endDate": null,
        "description": "https://www.age.events/pages/january-age-open ",
        "backgroundPosition": 17,
        "bigImage": "https://res.cloudinary.com/dzfwflvgv/image/upload/v1688670875/ofbdsnqiutuj0d5al4jb.jpg",
        "dayRoundArr": [],
        "image": "https://res.cloudinary.com/dzfwflvgv/image/upload/v1688670873/jmzk3zbrll9sss18ptsu.jpg"
    },
    "_id": "642b7fe5ff5f3ef28bc36cac",
    "player1name": "Jacob Bertrand",
    "player1deck": "",
    "player1hero": "Fai, Rising Rebellion",
    "player2name": "Alan Chavarin",
    "player2deck": "",
    "player2hero": "Iyslander, Stormbind",
    "top8": false,
    "swissRound": 1,
    "top8Round": "None",
    "format": "Classic Constructed",
    "link": "42U0QkG3SfQ",
    "timeStamp": 0,
    "deleted": false,
}

test('Is given matchs event name displayed correctly in MatchThumbnail', () => {
    const {getByText} = render(<MatchThumbnail match={exampleMatch} />, {wrapper: MemoryRouter})

    const divElement = getByText(exampleMatch.event.name)
    expect(divElement).toBeInTheDocument()
})

test('is the match date displayed correctly in MatchThumbnail', () => {
    const {getByText} = render(<MatchThumbnail match={exampleMatch}/>, {wrapper: MemoryRouter})

    const divElement = getByText(exampleMatch.event.startDate.substring(0, 10))
    expect(divElement).toBeInTheDocument()
}) 