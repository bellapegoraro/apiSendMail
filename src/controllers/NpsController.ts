import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveysUsersReposytory } from "../repositories/SurveysUsersReposytory";

class NpsController {
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params;
    const surveysUsersRepository = getCustomRepository(SurveysUsersReposytory);

    const surveysUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull()),
    });

    const detractror = surveysUsers.filter(
      (survey) => survey.value >= 0 && survey.value <= 6
    ).length;

    const promoters = surveysUsers.filter(
      (survey) => survey.value >= 9 && survey.value <= 10
    ).length;

    const passive = surveysUsers.filter(
      (survey) => survey.value >= 7 && survey.value <= 8
    ).length;

    const totalAnswers = surveysUsers.length;

    const calculate = Number(
      (((promoters - detractror) / totalAnswers) * 100).toFixed(2)
    );

    return response.json({
      detractror,
      promoters,
      passive,
      totalAnswers,
      nps: calculate,
    });
  }
}

export { NpsController };
