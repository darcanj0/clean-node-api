import { IController, HttpRequest, HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator implements IController {
  private readonly controller: IController
  constructor (controller: IController) {
    this.controller = controller
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.controller.handle(httpRequest)
    return null
  }
}
