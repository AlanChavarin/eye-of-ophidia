const ObjectId = require('mongodb').ObjectId
const {getEvent, getEvents, postEvent, updateEvent, getAllBackgroundImageLinks, deleteEvent, restoreEvent, deleteBackgroundImage} = require('../eventController')
const {postEventEdit} = require('../eventEditHistoryController')
const {connect, closeDatabase, clearDatabase, seedDatabase} = require('../../dbHandler')

beforeAll(async () => await connect()) 

beforeEach(async () => await seedDatabase())

afterEach(async () => await clearDatabase())

afterAll(async () => await closeDatabase())

const res = {
    status: jest.fn(x => x),
    json: jest.fn(x => x)
}

jest.mock('../eventEditHistoryController')

jest.mock('../abstractions/cloudinaryHelper', () => ({
    handleImageFiles: jest.fn(() => true),
    handleImageDeletion: jest.fn(() => true)
}))

//these tests assume seeded database with data from fixtures

test('does getEvent get the given event properly', async () => {
    const req = {
        params: {
            eventid: '642b74dcad7c9e49cf97e67f'
        }
    }

    await getEvent(req, res)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
            '_id': ObjectId('642b74dcad7c9e49cf97e67f'),
            'name': 'January AGE Open'
        })
    )
})

test('does getEvent throw an error when non-existent event is given', async () => {
    const req = {
        params: {
            eventid: '642b74dcad7c9e49cf97e67D'
        }
    }
    
    await expect(getEvent(req, res)).rejects.toThrow()

    expect(res.status).toHaveBeenCalledWith(400)
    
})

test('does getEvents get all events when no input given', async () => {
    const req = {
        
    }

    await getEvents(req, res)

    expect(res.status).toHaveBeenCalledWith(200)

    expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
            "events": expect.arrayContaining([
                expect.objectContaining({
                    "_id": expect.any(ObjectId),
                    "name": expect.any(String)
                })
            ]),
            "count": expect.any(Number)
        })
    )
}) 

test('does getEvents $text query work', async () => {
    const req = {
        query: {
            text: 'Birmingham'
        }
    }

    await getEvents(req, res)

    expect(res.status).toHaveBeenCalledWith(200)

    expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
            "events": expect.arrayContaining([
                expect.objectContaining({
                    "_id": ObjectId("64c56a0a4a3c7555dd5fb388")
                })
            ])
        })
    )
})

test('does getEvent $text query work (this time expecting multiple events to return)', async () => {

    const textQuery = 'AGE'

    const req = {
        query: {
            text: textQuery
        }
    }

    let data
    const res = {
        status: jest.fn(x => x),
        json: jest.fn(x => {
            data = x
            return data
        })
    }

    const assertionFunc = (data) => {
        let returnable = true
        data.events.map(event => {
            
            if(!(event.name.toLowerCase().includes(textQuery.toLowerCase())
            || event.location.toLowerCase().includes(textQuery.toLowerCase())
            || event.format.toLowerCase().includes(textQuery.toLowerCase())
            || event.description.toLowerCase().includes(textQuery.toLowerCase()))){
                returnable = false
            }
        })
        return returnable
    }

    await getEvents(req, res)

    expect(res.status).toHaveBeenCalledWith(200)

    expect(assertionFunc(data)).toBe(true)

})

test('does getEvent properly require documents to include both phrases in a $text query', async () => {
    const req = {
        query: {
            text: 'Birmingham Calling 2023'
        }
    }

    await getEvents(req, res)

    expect(res.status).toHaveBeenCalledWith(200)

    expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
            "events": expect.arrayContaining([
                expect.objectContaining({
                    "_id": ObjectId("64c56a0a4a3c7555dd5fb388")
                })
            ]),
            "count": 1
        })
    )
})

test('does getEvents properly sort by date, newest first', async () => {
    const req = {

    }

    let data
    const res = {
        status: jest.fn(x => x),
        json: jest.fn(x => {
            data = x
            return data
        })
    }

    const assertionFunc = (data) => {
        let returnable = true
        for(let i = 1; i < data.events.length; i++){
            if(!(data.events[i].startDate <= data.events[i-1].startDate)){
                returnable = false
            }
        }
        return returnable
    }

    await getEvents(req, res)

    expect(res.status).toHaveBeenCalledWith(200)

    expect(assertionFunc(data)).toBe(true)
})

test('does getEvents properly sort by date, oldest first', async () => {
    const req = {
        query: {
            order: 1
        }
    }

    let data
    const res = {
        status: jest.fn(x => x),
        json: jest.fn(x => {
            data = x
            return data
        })
    }

    const assertionFunc = (data) => {
        let returnable = true
        for(let i = 1; i < data.events.length; i++){
            if(!(data.events[i].startDate >= data.events[i-1].startDate)){
                returnable = false
            }
        }
        return returnable
    }

    await getEvents(req, res)

    expect(res.status).toHaveBeenCalledWith(200)

    expect(assertionFunc(data)).toBe(true)
})

test('does postEvent work given a multiday event', async () => {
    const req = {
        body: {
            name: 'Calling: Singapore 2023',
            location: "Singapore",
            format: "Classic Constructed",
            startDate: "2023-06-10",
            endDate: "2023-06-11",
            notATypicalTournamentStructure: false,
            dayRoundArr: [7,12],
            top8Day: false,
            description: "",
            image: "https://res.cloudinary.com/dzfwflvgv/image/upload/v1688604269/qajp5kgq2xoohnlfgsmk.jpg",
            bigImage: "https://res.cloudinary.com/dzfwflvgv/image/upload/v1688604270/hsc4dtmtiwxq0wantklb.jpg",
            backgroundPosition: 21
        },
        user: {

        }
    }

    postEventEdit.mockImplementation(() => {
        return true
    })

    await postEvent(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    
    expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
            'name': 'Calling: Singapore 2023'
        })
    )
})

test('does postEvent throw an error given missing name', async () => {
    const req = {
        body: {
            location: "Singapore",
            format: "Classic Constructed",
            startDate: "2023-06-10",
            endDate: "2023-06-11",
            notATypicalTournamentStructure: false,
            dayRoundArr: [7,12],
            top8Day: false,
            description: "",
            backgroundPosition: 21
        },
        user: {

        }
    }

    postEventEdit.mockImplementation(() => {
        return true
    })

    await expect(postEvent(req, res)).rejects.toThrow()

})

test('does postEvent throw an error given nonsensical date values', async () => {
    const req = {
        body: {
            name: 'Calling: Singapore 2023',
            location: "Singapore",
            format: "Classic Constructed",
            startDate: "POTATOPOTAPTOAPTOAE",
            endDate: "AAAAAA",
            notATypicalTournamentStructure: false,
            dayRoundArr: [7,12],
            top8Day: false,
            description: "",
            backgroundPosition: 21
        },
        user: {

        }
    }

    postEventEdit.mockImplementation(() => {
        return true
    })

    await expect(postEvent(req, res)).rejects.toThrow()

})

test('does postEvent throw an error given nonsensical dayRoundArr values', async () => {
    const req = {
        body: {
            name: 'Calling: Singapore 2023',
            location: "Singapore",
            format: "Classic Constructed",
            startDate: "2023-06-10",
            endDate: "2023-06-11",
            notATypicalTournamentStructure: false,
            dayRoundArr: 'wtglpjkd',
            top8Day: false,
            description: "",
            backgroundPosition: 21
        },
        user: {

        }
    }

    postEventEdit.mockImplementation(() => {
        return true
    })

    await expect(postEvent(req, res)).rejects.toThrow()

})

test('does updateEvent update an event properly', async () => {
    const req = {
        params: {
            eventid: '64c56a0a4a3c7555dd5fb388'
        },
        body: {
            name: 'Calling: Birmingham 2023 edit',
            location: "Singapore edit",
            format: "Blitz",
            startDate: "2026-06-19",
            endDate: "2026-06-21",
            notATypicalTournamentStructure: false,
            dayRoundArr: [
                9,
                14
            ],
            top8Day: true,
            description: "",
            backgroundPosition: 5,
            image: "https://www.google.com",
            bigImage: "https://www.youtube.com"
        },
        user: {

        }
    }

    postEventEdit.mockImplementation(() => {
        return true
    })

    await updateEvent(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
            "_id": ObjectId('64c56a0a4a3c7555dd5fb388'),
            "name": 'Calling: Birmingham 2023 edit',
            "location": "Singapore edit",
            "format": "Blitz",
            "backgroundPosition": 5,
            "image": "https://www.google.com",
            "bigImage": "https://www.youtube.com"
        })
    )
})

test('does getAllBackgroundImageLinks work properly', async () => {
    req = {

    }

    await getAllBackgroundImageLinks(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(
        expect.arrayContaining([
            expect.objectContaining({
                "image": expect.any(String),
                "bigImage": expect.any(String),
            })
        ])
    )
    expect(res.json).toHaveBeenCalledWith(
        expect.not.arrayContaining([
            expect.not.objectContaining({
                "image": expect.any(String),
                "bigImage": expect.any(String),
            })
        ])
    )
})

test('does deleteEvent work', async () => {
    const req = {
        params : {
            eventid: '64c56a0a4a3c7555dd5fb388'
        }
    }

    await deleteEvent(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
            "_id": ObjectId('64c56a0a4a3c7555dd5fb388'),
            "deleted": true
        })
    )
})

test('does restoreEvent work', async () => {
    const req = {
        params: {
            eventid: '64d0281b9082d4626deaa525'
        }
    }

    await restoreEvent(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
            "_id": ObjectId('64d0281b9082d4626deaa525'),
            "deleted": false
        })
    )
})

test('does deleteBackgroundImage work', async () => {
    req = {
        body: {
            image: 'https://res.cloudinary.com/dzfwflvgv/image/upload/v1691286288/kma6szcmm0gr3nqzcqmt.png',
            bigImage: 'https://res.cloudinary.com/dzfwflvgv/image/upload/v1691286289/ss8gyqoodebqi25minig.png'
        }
    }

    await deleteBackgroundImage(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({'message': 'images deleted'})
    )
})

