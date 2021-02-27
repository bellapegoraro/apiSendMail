import { EntityRepository, Repository } from "typeorm";
import { SurveyUser } from "../models/SurveyUser";

@EntityRepository(SurveyUser)
class SurveysUsersReposytory extends Repository<SurveyUser> {}

export { SurveysUsersReposytory };
