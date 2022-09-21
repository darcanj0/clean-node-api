import { SurveyModel } from '@/domain/models/survey'

export interface ILoadSurveyByIdRepository {
  load: (id: string) => Promise<SurveyModel>
}
