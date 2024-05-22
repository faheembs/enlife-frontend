export interface Module {
    ai_evaluation: {
        response_text: string,
        response_html: string
    },
    _id: string,
    user: string,
    moduleNumber: string,
    questionnaires: [
        {
            questionID: string,
            question_text: string,
            response_type: string,
            answers: null,
            selection: [string],
            scale_value: string,
            _id: string
        }
    ],
    createdAt: string,
    updatedAt: string,
    id: string
}
  
  
  export interface ModuleState {
    module: Module | null;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface ModuleBody {
    ai_evaluation?: {
        response_text: string,
        response_html: string
    },
    userId: string,
    moduleNumber: string,
    questionnaires: 
        {
            questionID?: string,
            question_text: string,
            response_type: string,
            answers?: string,
            selection?: [string],
            scale_value?: string,
        },
  }
  
  export interface ApiError {
    message: string;
  }
  