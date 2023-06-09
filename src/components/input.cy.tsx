/// <reference types="cypress" />
import React from 'react'
import { Input } from './input'

describe('input component', () => {
  it('should render the user input', () => {
    cy.mount(<Input />)

    cy.get('[data-cy="user"]').should('be.visible')
  })

  it('should render the password input', () => {
    cy.mount(<Input isPassword />)

    cy.get('[data-cy="pass"]').should('be.visible')
  })

  it('should click on show password button', () => {
    const showPasswordSpy = cy.spy().as('showPasswordSpy')
    cy.mount(<Input isPassword setIsShowPassword={showPasswordSpy} />)

    cy.get('[data-cy="button-password"]').click()
    cy.get('[data-cy="lock-open"]').should('be.visible')
  })
})
