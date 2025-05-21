describe('CT02 - Cadastrar e Deletar um Card', () => {
  context('CT02 - Cadastrar e Deletar um Card com sucesso',()=>{

    let boardId
    let listId
    
    beforeEach(() => {
      cy.creatBoard('Solutes - board').then((response) => {
        expect(response.status).to.eq(200)
        boardId = response.body.id
        cy.log(`BoardId criado:${boardId}`)
      }).then(() => {
        cy.createList(boardId, 'Backlog').then((response) => {
          expect(response.status).to.eq(200)
          listId = response.body.id
          expect(response.body.idBoard).to.eq(boardId)
          expect(response.body.pos).to.eq(8192)
          cy.log(`ListId criado:${listId}`)
        })
      })
    })
    
    afterEach(()=>{
      // cy.deleteBoard(boardId).then((response)=>{
      //   expect(response.status).to.eq(200)
      // })
    })
    it('Cadastrar um card com sucesso deve retornar status code 200', () => {
      cy.creatCard('QA - teste', listId).then((response) => {
        expect(response.status).to.eq(200)
        const body = response.body;
        expect(body.id).not.be.null
        expect(body.id).and.to.be.a('string')
        expect(body.badges).to.have.property('attachments', 0);
        expect(body.badges).to.have.property('comments', 0);
      })
    })
    
    
    it('Deletar um card com sucesso deve retornar status code 200', () => {
      cy.creatCard('QA - teste', listId).then((response) => {
        expect(response.status).to.eq(200)
        const cardId = response.body.id;
        return cy.deleteCard(cardId).then((response) => {
          expect(response.status).to.eq(200)
        })
      })
    })
  })
  context('CT02 - Cadastrar e Deletar um card sem sucesso',()=>{
    it('Cadastrar um card sem nome e listId - deve retornar status code 400', () => {
      cy.creatCard().then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.eq('invalid value for idList')
      })
    })

    it('Cadastrar um card sem listId - deve retornar status code 400', () => {
      cy.creatCard('QA - teste').then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.eq('invalid value for idList')
      })
    })

    it('Deletar um card com id vazio - deve retornar status code 404', () => {
      //possivel falhar de segurança api retornando key e token no response avaliar 
        cy.deleteCard('').then((response) => {
        expect(response.status).to.eq(404)
        expect(response.body).to.eq('Cannot DELETE /1/cards/?log=false&key=xxxe&token=xxx')
      })
    })

    it('Deletar um card com id null - deve retornar status code 400', () => {
      cy.deleteCard(null).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.eq('invalid id')
      })
    })
    it('Deletar um card com id vazio - deve retornar status code 400', () => {
      cy.deleteCard(null).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.eq('invalid id')
      })
    })
  })
})


