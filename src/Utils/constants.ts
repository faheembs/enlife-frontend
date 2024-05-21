const LOADING_TIMOUT_DELAY = 1500;
const USER_AUTH_TOKEN_KEY = "token";
const USER_SESSION_KEY = "user";
const MODULES_LABEL = {
  firstModule: { key: "1", label: "Module 1" },
  secondModule: { key: "2", label: "Module 2" },
  thirdModule: { key: "3", label: "Module 3" },
  fourthModule: { key: "4", label: "Module 4" },
  fifthModule: { key: "5", label: "Module 5" },
};

const Images = {
  logo: require(`../Assets/logo.png`),
  google: require(`../Assets/google.png`),
};

const IconNames = {
  HOME: "home",
  SETTINGS: "settings",
  PROFILE: "profile",
  SEARCH: "search",
  GOOGLE: "google",
};

const DummyAdminProfile = {
  email: "admin@gmail.com",
  password: "Admin@123",
  token: "token",
};

const MODULES = {
  FirstModules: [
    {
      text: "Imagine it's early morning, and you're watching the sunrise during a quiet jog. As you feel the energy of the new day, think about what drives your fitness journey.",
      question:
        "Beyond societal trends or expectations, what personal values guide your fitness goals?",
      caption:
        "For instance, is it about discipline, self-respect, resillence, or perhaps the joy of challenging your limits?",
      type: "free-response",
    },
    {
      text: "Imagine it's early morning, and you're watching the sunrise during a quiet jog. As you feel the energy of the new day, think about what drives your fitness journey.",
      question:
        "Beyond societal trends or expectations, what personal values guide your fitness goals?",
      caption:
        "For instance, is it about discipline, self-respect, resillence, or perhaps the joy of challenging your limits?",
      type: "free-response",
    },
    {
      text: "Imagine it's early morning, and you're watching the sunrise during a quiet jog. As you feel the energy of the new day, think about what drives your fitness journey.",
      question:
        "Beyond societal trends or expectations, what personal values guide your fitness goals?",
      caption:
        "For instance, is it about discipline, self-respect, resillence, or perhaps the joy of challenging your limits?",
      type: "free-response",
    },
  ],
  SecondModule: [
    {
      vision: '"Your fitness vision is: Detailed Definition of Vision."',
      explaination: [
        "Alignment with Fitness Value 1: Explanation of how the vision aligns with this value.",
        "Alignment with Fitness Value 2: Explanation of how the vision aligns with this value.",
        "Alignment with Fitness Value 3: Explanation of how the vision aligns with this value.",
      ],
      meaningFulness:
        "Meaningfulness: Discuss why this vision is personally meaningful to the user, meeting the criteria of a long-term aim and focusing beyond self.",
      type: "brief-description",
    },
    {
      text: "As the day begins to brighten, you're filled with a sense of possibility",
      question:
        "It you had unlimited resources and support, what significant change or impact would you like to achieve through your fitness journey?",
      caption:
        "Think about the broader impact on your life, health, or community",
      type: "free-response",
    },
  ],
  ThirdModule: [
    {
      roles: [
        "Health Enthusiast",
        "Marathon Runner",
        "Yoga Practitioner",
        "Fitness Coach",
        "Strength Trainer",
        "Nutrition Advocate",
        "Outdoor Adventurer",
        "Mindfulness Practitioner",
        "Sports Competitor",
        "Dance Fitness Enthusiast",
        "Swimming Enthusiast",
        "Cyclic Alicionado",
        "Bodybuiling Aspiriant",
        "Gymnastic Amateur",
        "Wellness Advocate",
      ],
      type: "multiple-selection",
    },
    {
      identities: [
        { id: 1, name: "A" },
        { id: 2, name: "B" },
        { id: 3, name: "C" },
      ],
      type: "single-selection",
    },
  ],
  FourthModule: [
    {
      text: "Please answer the following question:",
      question:
        "Which of your past skills, experiences, strengths, resources, and networks contribute to your journey in becoming the person you want to be?",
      caption: "",
      type: "free-response",
    },
    {
      text: "Please answer the following question:",
      question: "How close are you to becoming who you want to be? ",
      caption: "",
      options: [
        "Not close at all",
        "Somewhat close",
        "Moderately close",
        "Very close",
        "Extremely close",
      ],
      type: "scale",
    },
    {
      text: "Please answer the following question:",
      question:
        "What do you believe should be your next step in your journey toward becoming the person you want to become? ",
      caption: "",
      type: "free-response",
    },
    {
      text: "Imagine it's early morning, and you're watching the sunrise during a quiet jog. As you feel the energy of the new day, think about what drives your fitness journey.",
      question:
        "Beyond societal trends or expectations, what personal values guide your fitness goals?",
      caption: "For instan",
      type: "brief-description",
    },
  ],
  FifthModule: [
    {
      text: "Please answer the following question:",
      question:
        "Have you previously attempted to achieve your mid-term goal of *How to get there*?",
      caption: "",
      options: ["Yes", "No"],
      type: "precursor-question",
      q_conditional:
        "Could you share what challenges or obstacles prevented you from successfully achieving it?",
    },
    {
      identities: [
        {
          id: 1,
          name: "30 day goal: Recommendation 1<br/>30 day goal: Recommendation 2<br/>30 day goal: Recommendation 3",
        },
        {
          id: 2,
          name: "30 day goal: Recommendation 4<br/>30 day goal: Recommendation 5<br/>30 day goal: Recommendation 6",
        },
        {
          id: 3,
          name: "30 day goal: Recommendation 7<br/>30 day goal: Recommendation 8<br/>30 day goal: Recommendation 9",
        },
      ],
      type: "single-selection",
    },
  ],
};

const MODULES_SUMMARY_LABEL = {
  firstModuleSummary: {
    key: "1",
    label: "Value/Motivation 1",
  },
  secondModuleSummary: {
    key: "2",
    label: "Value/Motivation 2",
  },
  thirdModuleSummary: {
    key: "3",
    label: "Value/Motivation 3",
  },
};

const MODULES_SUMMARY = {
  ModuleSummary1: [
    {
      explanationHeading: "(Explanation for Value/Motivation 1)",
      explanationText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
  ],
  ModuleSummary2: [
    {
      explanationHeading: "(Explanation for Value/Motivation 2)",
      explanationText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
  ],
  ModuleSummary3: [
    {
      explanationHeading: "(Explanation for Value/Motivation 3)",
      explanationText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
  ],
};

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

export {
  LOADING_TIMOUT_DELAY,
  IconNames,
  Images,
  USER_AUTH_TOKEN_KEY,
  USER_SESSION_KEY,
  DummyAdminProfile,
  MODULES,
  MODULES_LABEL,
  MODULES_SUMMARY,
  MODULES_SUMMARY_LABEL,
  firebaseConfig,
};
