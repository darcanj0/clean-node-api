import { InvalidParamError } from '../../presentation/errors'
import { IEmailValidator } from '../protocols/email-validator'
import { IValidation } from '../../presentation/protocols'

export class EmailValidation implements IValidation {
  constructor (private readonly emailValidator: IEmailValidator, private readonly fieldName: string) {}

  validate (input: any): Error | null {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      throw new InvalidParamError(this.fieldName)
    }
    return null
  }
}
