const {getMatch, getMatchesByEvent, getMatches, postMatch, updateMatch, deleteMatch, getNameLinkPairsbyEvent} = require('../matchController')
const {connect, closeDatabase, clearDatabase, seedDatabase} = require('../../dbHandler')
const ObjectId = require('mongodb').ObjectId


//these tests require proper fixtures to be provided to the mongodb memory database

beforeAll(async () => await connect()) 

beforeEach(async () => await seedDatabase())

afterEach(async () => await clearDatabase())

afterAll(async () => await closeDatabase())

const res = {
    status: jest.fn(x => x),
    json: jest.fn(x => x)
}

test('does getMatch get match given matchid', async () => {
    const req = {
        recyclebin: false,
        params: {
            id: '642b95f9ff5f3ef28bc36f9b'
        }
    }

    await getMatch(req, res)

    expect(res.status).toHaveBeenCalledWith(200)

    expect(res.json)
    .toHaveBeenCalledWith(
        expect.objectContaining({
            "_id": ObjectId("642b95f9ff5f3ef28bc36f9b")
        })
    )
})

test('does getMatch throw an error when non-existent matchid is given', async () => {
    const req = {
        recyclebin: false,
        params: {
            id: '642b95f9ff5f3ef28bc36f91'
        }
    }

    await expect(getMatch(req, res)).rejects.toThrow()
    expect(res.status).toHaveBeenCalledWith(400)
})

test('does getMatchesByEvent work when given an event id', async () => {
    const req = {
        recyclebin: false,
        params: {
            event: '642b74dcad7c9e49cf97e67f'
        }
    }

    await getMatchesByEvent(req, res)

    expect(res.status).toHaveBeenCalledWith(200)

    expect(res.json).toHaveBeenCalledWith(
        expect.not.arrayContaining([
            expect.not.objectContaining({
                'event': expect.objectContaining({
                    '_id': ObjectId('642b74dcad7c9e49cf97e67f')
                })
            })
        ])
    )

})

test('does getMatchesByEvent work when given an event name', async () => {
    const req = {
        recyclebin: false,
        params: {
            event: 'February AGE Open'
        }
    }

    await getMatchesByEvent(req, res)

    expect(res.status).toHaveBeenCalledWith(200)

    expect(res.json).toHaveBeenCalledWith(
        expect.not.arrayContaining([
            expect.not.objectContaining({
                'event': expect.objectContaining({
                    'name': 'February AGE Open'
                })
            })
        ])
    )

})

test('does getMatchesByEvent throw error when wrong event name given', async () => {
    const req = {
        recyclebin: false,
        params: {
            event: 'POTATOXD'
        }
    }

    await expect(getMatchesByEvent(req, res)).rejects.toThrow()
    expect(res.status).toHaveBeenCalledWith(400)
})

test('does getMatchesByEvent work when the the given event exists but has no matches', async () => {
    const req = {
        recyclebin: false,
        params: {
            event: '643ca29100f71398982e8271'
        }
    }

    await getMatchesByEvent(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith([])
})

test('does getMatches return matches when no parameters (assuming filled database)', async () => {
    const req = {
        recyclebin: false
    }

    await getMatches(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
            count: expect.any(Number),
        })
    )
    expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
            matches: expect.not.arrayContaining([
                expect.not.objectContaining({
                    '_id': expect.any(ObjectId)
                })
            ])
        })
    )
})

test('get getMatches return matches given 1 hero parameter properly', async () => {
    const req = {
        recyclebin: false,
        query: {
            hero1: 'Bravo, Showstopper'
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

    const checkData = () => {
        let returnable = true
        data.matches.map(match => {
            if(match.player1hero !== 'Bravo, Showstopper' && match.player2hero !== 'Bravo, Showstopper'){
                returnable = false
            }
        })
        return returnable
    }

    await getMatches(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    
    expect(checkData()).toBe(true)
    
})

test('get getMatches return matches given 2 hero parameters properly', async () => {
    const req = {
        recyclebin: false,
        query: {
            hero1: 'Oldhim, Grandfather of Eternity',
            hero2: 'Iyslander, Stormbind'
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

    const checkData = () => {
        let returnable = true
        data.matches.map(match => {
            if(!((match.player1hero === 'Oldhim, Grandfather of Eternity' 
            && match.player2hero === 'Iyslander, Stormbind') 
            || (match.player1hero === 'Iyslander, Stormbind' 
            && match.player2hero === 'Oldhim, Grandfather of Eternity'))){
                returnable = false
            }
        })
        return returnable
    }

    await getMatches(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    
    expect(checkData()).toBe(true)
    
})

test('do text queries work when searching player names', async () => {
    const req = {
        recyclebin: false,
        query: {
            text: 'Alan Chavarin'
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

    //check that at every match has one of the player's match the text query 'Alan Chavarin'
    const checkData = () => {
        let returnable = true
        data.matches.map(match => {
            if(match.player1name !== 'Alan Chavarin' && match.player2name !== 'Alan Chavarin'){
                returnable = false
            }
        })
        return returnable
    }

    await getMatches(req, res)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(data.matches.length > 0).toBe(true)
    expect(checkData()).toBe(true)
    
})

test('do text queries work when searching event names', async () => {
    const req = {
        recyclebin: false,
        query: {
            text: 'January AGE Open'
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

    //check that at every match has one of the player's match the text query 'Alan Chavarin'
    const checkData = () => {
        let returnable = true
        data.matches.map(match => {
            if(match.event.name !== 'January AGE Open'){
                returnable = false
            }
        })
        return returnable
    }

    await getMatches(req, res)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(data.matches.length > 0).toBe(true)
    expect(checkData()).toBe(true)
    
})

test('does pagination work with getMatches', async () => {
    const req1 = {
        recyclebin: false,
        query: {
            limit: 6,
            page: 0,
        }
    }
    const req2 = {
        recyclebin: false,
        query: {
            limit: 3,
            page: 1,
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
    
    await getMatches(req1, res)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(data.matches.length == 6).toBe(true)
    const firstPageData = data

    await getMatches(req2, res)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(data.matches.length == 3).toBe(true)

    const checkData = () => {
        let returnable = true
        data.matches.map((match, i) => {
            if(!match._id.equals(firstPageData.matches[i+3]._id)){
                returnable = false
            }
        })
        return returnable
    }
    
    expect(checkData()).toBe(true)
})

test('does posting a match with postMatch work', async () => {
    const req = {
        body: {
            player1name: 'Joe Biden',
            player1hero: 'Iyslander, Stormbind',
            player1deck: '',

            player2name: 'Barack Obama',
            player2hero: 'Levia, Shadowborn Abomination',
            player2deck: '',

            top8: false,
            swissRound: 1,
            top8Round: 'None',

            format: 'Classic Constructed',
            event: 'March AGE Open',
            link: 'rzLIUgnKY40',
            timeStamp: 5,
        },
        user: {
            _id: '64292819a9dea7a8c2461c38'
        },
        query: {
            dontUpdateLinks: false
        }
    }

    await postMatch(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
            '_id': expect.any(ObjectId),
        })
    )
})

test('does updating a match with updateMatch work', async () => {
    const req = {
        params: {
            matchid: '642b7fe5ff5f3ef28bc36cac'
        },
        body: {
            player1name: 'Jacob Bertrand',
            player1hero: 'Fai, Rising Rebellion',
            player1deck: '',

            player2name: 'Alan Chavarin',
            player2hero: 'Levia, Shadowborn Abomination',
            player2deck: '',

            top8: false,
            swissRound: 1,
            top8Round: 'None',

            format: 'Classic Constructed',
            event: 'January AGE Open',
            link: 'rzLIUgnKY40',
            timeStamp: 0,
        },
        query: {
            dontUpdateLinks: true,
        },
        user: {
            _id: '64292819a9dea7a8c2461c38'
        }
    }

    await updateMatch(req, res)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
            '_id': ObjectId('642b7fe5ff5f3ef28bc36cac'),
            'player2hero': 'Levia, Shadowborn Abomination',
        })
    )
})

test('does deleteMatch delete matches properly', async () => {
    const req = {
        params: {
            id: '642b7fe5ff5f3ef28bc36cac'
        },
    }

    await deleteMatch(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
            '_id': ObjectId('642b7fe5ff5f3ef28bc36cac'),
            'deleted': true
        })
    )
})

test('does getNameLinkPairsByEvent work properly', async () => {
    const req = {
        query: {
            event: 'January AGE Open',
            format: 'Classic Constructed'
        }
    }

    await getNameLinkPairsbyEvent(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
            'Craig Pollack': "https://fabrary.net/decks/01GP98PX7BTCPBZNZG0D8R0BER",
            'Chris Iaali': "https://fabrary.net/decks/01GP99673KEAMJ878TVAW751DV",
            'Anthony Pham': "https://fabrary.net/decks/01GP99XA085KYE6G1BQRVXF8AB",
            'Rihanna LaGrou': "https://fabrary.net/decks/01GP9B03ZJGGJ4HE85BG0VHN13"
        })
    )
})