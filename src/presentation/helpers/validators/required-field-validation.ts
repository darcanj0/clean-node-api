import { MissingParamError } from '../../errors'
import { IValidation } from './validation'

export class RequiredFieldValidation implements IValidation {
  private readonly fieldname: string
  constructor (fieldName: string) {
    this.fieldname = fieldName
  }

  validate (input: any): Error | null {
    if (!input[this.fieldname]) {
      return new MissingParamError(this.fieldname)
    }
    return null
  }
}
