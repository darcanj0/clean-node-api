import { IEmailValidator } from '../../presentation/controllers/user/signup/signup-controller-protocols'
import { EmailValidation } from './email-validation'

interface ISutTypes {
  sut: EmailValidation
  emailValidatorStub: IEmailValidator
}

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeSut = (): ISutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new EmailValidation(emailValidatorStub, 'email')
  return {
    sut, emailValidatorStub
  }
}

describe('Email Validation', () => {
  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    sut.validate({ email: 'any_email@mail.com' })
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should thow if an EmailValidator throws', () => {
    const { emailValidatorStub, sut } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
