describe('CT01 - Cadastrar e Deletar Board', () => {
  context('CT01 - Cadastrar e Deletar um Board com sucesso', () => {

    it('Cadastrar um board com sucesso - deve retornar status code 200', () => {
      cy.creatBoard('teste - board').then((response) => {
        const body = response.body;
        expect(response.status).to.eq(200);
        expect(body).to.have.property('id').and.to.be.a('string');
        expect(body).to.have.property('id').and.not.be.null
        expect(body).to.have.property('url').and.to.include('https://trello.com/b/');
        expect(body).to.have.property('shortUrl').and.to.include('https://trello.com/b/');
      })
    })

    it('Deletar um board com sucesso - deve retornar status code 200', () => {
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
  context('CT01 - Cadastrar e Deletar um Board sem sucesso', () => {

    it('Cadastrar um board sem nome - deve retornar status code 400', () => {
      cy.creatBoard().then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.message).to.eq("invalid value for name")
        expect(response.body.error).to.eq("ERROR")
      })
    })

    it('Deletar um board com id vazio - deve retornar status code 400', () => {
      return cy.deleteBoard().then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.eq("invalid id")
      })
    })

    it('Deletar um board com id inexistente - deve retornar status code 400', () => {
      return cy.deleteBoard(99999).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.eq("invalid id")
      })
    })

    it('Deletar um board com id null - deve retornar status code 400', () => {
      return cy.deleteBoard(null).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.eq("invalid id")
      })
    })
  })
})