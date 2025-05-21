describe('CT02 - Cadastrar e Deletar um Card', () => {
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
    cy.deleteBoard(boardId).then((response)=>{
      expect(response.status).to.eq(200)
    })
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


