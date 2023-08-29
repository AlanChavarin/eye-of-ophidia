function getSubstringBetweenStrings(mainString, startString, endString) {
    const startIndex = mainString.indexOf(startString)
    if (startIndex === -1) {
        return ''; // Start string not found
    }

    const endIndex = mainString.indexOf(endString, startIndex + startString.length)
    if (endIndex === -1) {
        return ''; // End string not found
    }

    const startIndexWithOffset = startIndex + startString.length
    const endIndexWithOffset = endIndex + endString.length

    return mainString.substring(startIndexWithOffset, endIndexWithOffset)
}

describe('Tests the postEvent form', () => {
    beforeEach(() => {
        cy.login()
    })

    it.skip('Does my user page show up when logged in', () => {
        cy.visit('/')
        cy.get('[data-cy="navbarProfile"]').click()
        cy.url().should('contain', '/me')
    })

    it('Does submitting a new event work given a new custom image to upload? (and delete the image afterwards)', () => {
        cy.visit('/')
        
        cy.get('[data-cy="navbarSubmitEvent"]').click()
        cy.url().should('contain', '/postevent')

        cy.get('[data-cy="eventChooseFile"]').selectFile('cypress/fixtures/Jinx.PNG')
        cy.get('[data-cy="fileCompressionStatusSpan"]').should('exist')

        cy.get('[data-cy="eventName"]').type('test_name ' + crypto.randomUUID())
        cy.get('[data-cy="eventLocation"]').type('test_location ' + crypto.randomUUID())
        cy.get('[data-cy="eventFormat"]').select('Blitz')
        cy.get('[data-cy="eventMultidayCheckbox"]').check()
        cy.get('[data-cy="eventStartDate"]').type('2024-03-22')
        cy.get('[data-cy="eventEndDate"]').type('2024-03-24')
        cy.get('[data-cy="eventTop8DayCheckbox"]').check()
        cy.get('[data-cy="dayRound0"]').type('7')
        cy.get('[data-cy="dayRound1"]').type('8{upArrow}{upArrow}{upArrow}{upArrow}')

        cy.get('[data-cy="fileCompresionStatusSpan"]').should('not.exist')
        cy.wait(700)

        cy.get('[data-cy="eventFormSubmitButton"]').click()

        cy.url().should('contain', '/events/')
        cy.get('[data-cy="eventHero"]').invoke('css', 'background-image').should('contain', 'https://res.cloudinary.com')

        //delete uploaded image
        cy.get('[data-cy="eventEditButton"]').click()
        cy.wait(500)
        cy.get('[data-cy="eventResetImageCheckbox"]').click()
        
        cy.get('[data-cy="eventFormSubmitButton"]').click()
        cy.url().should('contain', '/events/')
        cy.get('[data-cy="eventHero"]').invoke('css', 'background-image').should('not.contain', 'https://res.cloudinary.com')
    })

    it('Does submitting a new event work given a previously uploaded image?', () => {
        cy.visit('/')
        
        cy.get('[data-cy="navbarSubmitEvent"]').click()
        cy.url().should('contain', '/postevent')

        cy.get('[data-cy="eventBackgroundImageSelectorButton"]').click()
        cy.get('[data-cy="eventBackgroundImageSelector"]').should('exist')
        cy.get('[data-cy="eventBackgroundImage5"]').click()
        cy.get('[data-cy="eventBackgroundImageSelectorExitButton"]').click()
        

        cy.get('[data-cy="eventName"]').type('test_name ' + crypto.randomUUID())
        cy.get('[data-cy="eventLocation"]').type('test_location ' + crypto.randomUUID())
        cy.get('[data-cy="eventFormat"]').select('Blitz')
        cy.get('[data-cy="eventMultidayCheckbox"]').check()
        cy.get('[data-cy="eventStartDate"]').type('2024-03-22')
        cy.get('[data-cy="eventEndDate"]').type('2024-03-24')
        cy.get('[data-cy="eventTop8DayCheckbox"]').check()
        cy.get('[data-cy="dayRound0"]').type('7')
        cy.get('[data-cy="dayRound1"]').type('8{upArrow}{upArrow}{upArrow}{upArrow}')
        cy.get('[data-cy="eventFormSubmitButton"]').click()

        cy.url().should('contain', '/events/')
        cy.get('[data-cy="alertMessage"]').should('contain', 'event posted!')
        cy.get('[data-cy="eventHero"]').should('exist')
        cy.get('[data-cy="eventHero"]').invoke('css', 'background-image').should('include', 'cloudinary')
        
    })

})