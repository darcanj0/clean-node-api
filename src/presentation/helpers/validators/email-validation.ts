import { InvalidParamError } from '../../errors'
import { IEmailValidator } from '../../protocols/email-validator'
import { IValidation } from './validation'

export class EmailValidation implements IValidation {
  private readonly emailValidator: IEmailValidator
  private readonly fieldname: string
  constructor (emailValidator: IEmailValidator, fieldName: string) {
    this.emailValidator = emailValidator
    this.fieldname = fieldName
  }

  validate (input: any): Error | null {
    const isValid = this.emailValidator.isValid(input[this.fieldname])
    if (!isValid) {
      throw new InvalidParamError(this.fieldname)
    }
    return null
  }
}
