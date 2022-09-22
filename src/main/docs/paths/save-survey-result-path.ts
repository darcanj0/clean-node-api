export const saveSurveyResultPath = {
  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Survey'],
    summary: 'Salva uma resposta de uma enquete',
    parameters: [{
      in: 'path',
      name: 'surveyId',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/saveSurveyResultParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'sucesso',
        content: {
          'application/json': {
            $ref: '#/schemas/surveyResult'
          }
        }
      },
      403: {
        $ref: '#/components/forbidden'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
