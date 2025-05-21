
 const getAuthorization = () => {
    return {
        key: Cypress.env('API_KEY'),
        token: Cypress.env('API_TOKEN')
    };
  };

Cypress.Commands.add('creatBoard',(boardname)=>{
    cy.api({
      method: 'POST',
      url: `/boards/`,
      qs: {
        name: boardname,
        ...getAuthorization()
      },
      failOnStatusCode: false
    })
})

Cypress.Commands.add('creatBoardInvalidAuthorization',(boardname, key, token)=>{
    cy.api({
      method: 'POST',
      url: `/boards/`,
      qs: {
        name: boardname,
        key:key,
        token:token,
      },
      failOnStatusCode: false
    })
})

Cypress.Commands.add('deleteBoard',(boarId)=>{
    cy.api({
      method: 'DELETE',
      url: `/boards/${boarId}`,
      qs: {
        ...getAuthorization()
      },
      failOnStatusCode: false
    })
})

Cypress.Commands.add('deletBoardInvalidAuthorization',(boarId, key, token)=>{
    cy.api({
      method: 'DELETE',
      url: `/boards/${boarId}/`,
      qs: {
        key:key,
        token:token,
      },
      failOnStatusCode: false
    })
})

Cypress.Commands.add('createList', (boardId, listName) => {
    return cy.api({
      method: 'POST',
      url: '/lists',
      qs: {
        name: listName,
        idBoard: boardId,
        ...getAuthorization()
      }
    });
  });

Cypress.Commands.add('creatCard',(cardName,listId)=>{
    cy.api({
        method: 'POST',
        url: `/cards/`,
        qs: {
          name: cardName,
          idList: listId,
          ...getAuthorization()
        },
        failOnStatusCode: false
      })

})

Cypress.Commands.add('deleteCard',(cardId)=>{
  cy.api({
    method: 'DELETE',
    url: `/cards/${cardId}`,
    qs: {
      log:false,
      ...getAuthorization()
    },
    failOnStatusCode: false
  })
})