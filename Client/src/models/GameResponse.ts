export type GameScenarios = {
  career: string;
  outcomes: {
    failure: string;
    success: string;
  };
  scenarios: {
    options: string[];
    scenario: string;
  }[];
};
