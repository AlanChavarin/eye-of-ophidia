describe('tests the postmatch form', () => {
    beforeEach(() => {
        cy.login()
    })

    it('creates an event and posts a match to it', () => {
        cy.visit('/')
        //first create a new event to post a match too
        cy.get('[data-cy="navbarSubmitEvent"]').click()
        cy.url().should('contain', '/postevent')
        cy.get('[data-cy="eventName"]').type('test_name ' + crypto.randomUUID())
        cy.get('[data-cy="eventLocation"]').type('test_location ' + crypto.randomUUID())
        cy.get('[data-cy="eventFormat"]').select('Blitz')
        cy.get('[data-cy="eventStartDate"]').type('2042-03-22')
        cy.wait(300)
        cy.get('[data-cy="eventFormSubmitButton"]').click()
        cy.url().should('contain', '/events/')

        //creates the match on the new event
        cy.get('[data-cy="postMatchButton"]').click()
        cy.url().should('contain', '/postmatch/')
        cy.wait(1000)
        
        cy.get('[data-cy="matchEvent"]').should(input => {
            expect(input.val()).to.include('test_name')
        })
        cy.get('[data-cy="matchFormat"]').should('have.value', 'Blitz')
        
        cy.get('[data-cy="matchSwissRadioButton"]').click()
        cy.get('[data-cy="matchSwissRound"]').type('1')
        cy.get('[data-cy="matchYoutubeVideoLink"]').type('https://youtu.be/s1TsnnqgkoY?t=2')
        cy.get('[data-cy="matchYoutubeTimeStamp"]').should('have.value', '2')
        cy.get('[data-cy="matchYoutubeVideoId"]').should('have.value', 's1TsnnqgkoY')
        cy.get('[data-cy="matchPlayer1Hero"]').type('Bravo')
        cy.get('[data-cy="appContainer"]').click()
        cy.get('[data-cy="matchPlayer1FullName"]').type('Alan Chavarin')
        cy.get('[data-cy="appContainer"]').click()
        cy.get('[data-cy="matchPlayer1DeckLink"]').type('https://fabrary.net/decks/01GA4V9YRZPCJ1ZAQREFETS4JZ')
        cy.get('[data-cy="matchPlayer2Hero"]').type('Iyslander')
        cy.get('[data-cy="appContainer"]').click()
        cy.get('[data-cy="matchPlayer2FullName"]').type('Zachary Wallach')
        cy.get('[data-cy="appContainer"]').click()
        cy.get('[data-cy="matchPlayer2DeckLink"]').type('https://fabrary.net/decks/01GZH29YRAR0HJ1REDFA9Y3PP1')
        cy.wait(300)
        cy.get('[data-cy="matchSubmitButton"]').click()
        cy.url().should('contain', '/matches/')
        cy.get('[data-cy="alert"]').should('contain', 'Bravo vs Iyslander match successfully posted!')

        
        cy.get('[data-cy="youtubeIFrame"]').should('have.attr', 'src').then(src => {
            expect(src).to.include('s1TsnnqgkoY')
            expect(src).to.include('start=2')
        })
        cy.get('[data-cy="player1Name"]').should('contain', 'Alan Chavarin')
        cy.get('[data-cy="player2Name"]').should('contain', 'Zachary Wallach')
        cy.get('[data-cy="player1DeckLink"]').should('have.attr', 'href', 'https://fabrary.net/decks/01GA4V9YRZPCJ1ZAQREFETS4JZ')
        cy.get('[data-cy="player2DeckLink"]').should('have.attr', 'href', 'https://fabrary.net/decks/01GZH29YRAR0HJ1REDFA9Y3PP1')
        cy.get('[data-cy="player1Details"]').should('have.css', 'background-image').then(backgroundImage => {
            expect(backgroundImage).to.include('Bravo')
        })
        cy.get('[data-cy="player2Details"]').should('have.css', 'background-image').then(backgroundImage => {
            expect(backgroundImage).to.include('Iyslander')
        })

        cy.get('[data-cy="eventThumbnail"]').click()
        cy.url().should('contain', '/events/')

    })

    

})