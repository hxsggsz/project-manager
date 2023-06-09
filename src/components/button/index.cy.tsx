/// <reference types="cypress" />
import React from 'react'
import { Button } from '.'

describe('Button', () => {
  it('should render the button content', () => {
    cy.mount(<Button>test</Button>)

    cy.get('button').contains('test').should('be.visible')
  })

  it('should render the loading button', () => {
    cy.mount(<Button isLoading>test</Button>)

    cy.get('[data-cy="loading"]').should('be.visible')
  })
})
