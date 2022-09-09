import { LoginController } from './login'
import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest } from '../../helpers/http-helper'
import { IEmailValidator } from '../signup/signup-protocols'
import { InvalidParamError } from '../../errors'

interface SutTypes {
  sut: LoginController
  emailValidatorStub: IEmailValidator
}

const makeEmailValidatorStub = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidatorStub()
  const sut = new LoginController(emailValidatorStub)
  return { sut, emailValidatorStub }
}

const makeFakeHttpRequest = (): any => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

describe('Login Controller', () => {
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('Should call EmailValidator with correct email value', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const validatorSpy = jest.spyOn(emailValidatorStub, 'isValid')
    await sut.handle(makeFakeHttpRequest())
    expect(validatorSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
