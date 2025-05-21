describe('CT01 - Cadastrar e Deletar Board', () => {
  it('Cadastrar um board com sucesso deve retornar status code 200', () => {
    cy.creatBoard('teste - board').then((response) => {
      const body = response.body;
      expect(response.status).to.eq(200);
      expec(body).to.have.property('id').and.to.be.a('string');
      expec(body).to.have.property('id').and.not.be.null
      expect(body).to.have.property('url').and.to.include('https://trello.com/b/');
      expect(body).to.have.property('shortUrl').and.to.include('https://trello.com/b/');
    })
  })

  
  it('Deletar um board com sucesso deve retornar status code 200', () => {
    let boardId
    cy.creatBoard('Solutes - board').then((resp) => {
      expect(resp.status).to.eq(200)
      boardId = resp.body.id
      cy.log(`BoardId criado:${boardId}`)
      return cy.deleteBoard(boardId).then((response) => {
        expect(response.status).to.eq(200);
        cy.log(`BoardId deletado:${boardId} `)
      })
    })
  })
})

