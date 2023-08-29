describe('tests the matches page search', () => {
    it('does a blank match seach', () => {
        cy.visit('/')
        cy.get('[data-cy="matchesSearchBarInput"]').type('{enter}')
        cy.url().should('include', '/matches')
        cy.get('[data-cy="matchThumbnail"]').should('have.length.gt', 10)
    })

    it('does searching matches by hero work', () => {
        cy.visit('/')
        cy.get('[data-cy="paramsButton"]').click()
        cy.get('[data-cy="heroSelect1"]').type('Bravo, Showstopper{enter}')
        cy.get('[data-cy="matchThumbnail"]')
        .find('[data-cy="player1ImageContainer"], [data-cy="player2ImageContainer"]')
        .should((elements) => {
            const assertion1 = elements.filter('[data-cy="player1ImageContainer"]').css('background-image').includes('Showstopper')
            const assertion2 = elements.filter('[data-cy="player2ImageContainer"]').css('background-image').includes('Showstopper')

            expect(assertion1 || assertion2).to.be.true
        })
        
    })

    it('does searching matches by a hero matchup work', () => {
        cy.visit('/')
        cy.get('[data-cy="paramsButton"]').click()
        cy.get('[data-cy="heroSelect1"]').type('Bravo, Showstopper')
        cy.get('[data-cy="heroSelect2"]').type('Oldhim, Grandfather of Eternity{enter}')
        cy.get('[data-cy="matchThumbnail"]').each(element => {
            cy.wrap(element)
            .find('[data-cy="player1ImageContainer"], [data-cy="player2ImageContainer"]')
            .should((elements) => {
                const assertion1 = elements.filter('[data-cy="player1ImageContainer"]').css('background-image').includes('Showstopper')
                const assertion2 = elements.filter('[data-cy="player2ImageContainer"]').css('background-image').includes('Grandfather')
    
                const assertion3 = elements.filter('[data-cy="player1ImageContainer"]').css('background-image').includes('Grandfather')
                const assertion4 = elements.filter('[data-cy="player2ImageContainer"]').css('background-image').includes('Showstopper')
    
                expect( (assertion1 && assertion2) || (assertion3 && assertion4) ).to.be.true
            })
        })
    })

    it('does searching matches by a hero matchup work via searchbar work', () => {
        cy.visit('/')
        cy.get('[data-cy="matchesSearchBarInput"]').type('Oldhim, Grandfather Bravo{enter}')
        cy.get('[data-cy="matchThumbnail"]').each(element => {
            cy.wrap(element)
            .find('[data-cy="player1ImageContainer"], [data-cy="player2ImageContainer"]')
            .should((elements) => {
                const assertion1 = elements.filter('[data-cy="player1ImageContainer"]').css('background-image').includes('Showstopper')
                const assertion2 = elements.filter('[data-cy="player2ImageContainer"]').css('background-image').includes('Grandfather')
    
                const assertion3 = elements.filter('[data-cy="player1ImageContainer"]').css('background-image').includes('Grandfather')
                const assertion4 = elements.filter('[data-cy="player2ImageContainer"]').css('background-image').includes('Showstopper')
    
                expect( (assertion1 && assertion2) || (assertion3 && assertion4) ).to.be.true
            })
        })
    })

    it('Does format filter work', () => {
        cy.visit('/')
        cy.get('[data-cy="paramsButton"]').click()
        cy.get('[data-cy="selectFormatDropdown"]').select('Blitz').type('{enter}')
        cy.get('[data-cy="matchThumbnail"]').each(element => {
            cy.wrap(element).find('[data-cy="matchThumbnailFormat"]').should('have.text', 'Blitz')
        })
    })

    it('are results sorted by date correctly?', () => {
        cy.visit('/')
        cy.get('[data-cy="matchesSearchBarInput"]').type('battle{enter}')
        cy.get('[data-cy="matchThumbnail"]').each((currentElement, index, elements) => {
            if(index < elements.length - 1){
                const date1 = new Date(currentElement.find('[data-cy="matchThumbnailDate"]').text())
                const date2 = new Date(elements.eq(index+1).find('[data-cy="matchThumbnailDate"]').text())
                expect((date1 >= date2)).to.be.true
            }
        })
    })

    

})