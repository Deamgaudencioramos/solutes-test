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
    const invalidIds = [null, "", 9999]
    invalidIds.forEach((ids) => {
      it(`Deletar um board com id ${ids} - deve retornar status code 400`, () => {
        cy.deleteBoard().then((response) => {
          expect(response.status).to.eq(400);
          expect(response.body).to.eq("invalid id")
        })
      })
    })
    const invalidCredentialsTests = [
      {
        descricao: 'credenciais inválidas',
        key: 'teste123',
        token: 'teste123',
      },
      {
        descricao: 'credenciais vazias',
        key: ' ',
        token: ' ',
      }
    ];

    invalidCredentialsTests.forEach(({ descricao, key, token }) => {
      it(`Criar e deletar um board com ${descricao} - deve retornar status code 401`, () => {
        cy.creatBoardInvalidAuthorization("board-name-teste", key, token).then((response) => {
          expect(response.status).to.eq(401);
          expect(response.body).to.eq("invalid key");
        });
        cy.deletBoardInvalidAuthorization("123456132", key, token).then((response) => {
          expect(response.status).to.eq(401);
          expect(response.body).to.eq("invalid key");
        });
      });
    })
  })
})