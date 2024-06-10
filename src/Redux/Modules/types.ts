export interface Module {
  ai_evaluation: {
    response_text: string;
    response_html: string;
  };
  _id: string;
  user: string;
  moduleNumber: string;
  questionnaires: [
    {
      question_text: string;
      response_type: string;
      answers: null;
      selection: [string];
      scale_value: string;
      _id: string;
    }
  ];
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface ModuleState {
  module: Module | null;
  questionData: QuestionData | null | undefined;
  modulesByUserId: Module | null;
  isLoading: boolean;
  error: string | null;
  assessmentResponse: any;
}
export interface QuestionData {
  questionID: string;
  question_text: string;
  response_type: string;
  answers: string;
  selection: [string];
  scale_value: string;
  _id: string;
}

export interface QuestionDataBody {
  userId: string;
  moduleNumber: string;
  question: string | undefined;
}
export interface UserId {
  userId: string;
}
export interface ModuleBody {
  ai_evaluation?: {
    response_text: string;
    response_html: string;
  };
  userId: string;
  moduleNumber: string;
  questionnaires: {
    questionID?: string;
    question_text: string | undefined;
    response_type: string;
    answers?: string | null;
    selection?: [string] |  null;
    scale_value?: string|  null;
    precursor_question?: string | null
  };
}

export interface ApiError {
  message: string;
}
