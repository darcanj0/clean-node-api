import { SurveyModel } from '@/domain/models/survey'

export interface ILoadSurveyByIdRepository {
  loadById: (id: string) => Promise<ILoadSurveyByIdRepository.Result>
}

export namespace ILoadSurveyByIdRepository {
  export type Result = SurveyModel
}
