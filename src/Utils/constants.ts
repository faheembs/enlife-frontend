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
  logo: require(`../Assets/logoenlife.png`),
  logoIcon: require(`../Assets/logo-icon2.png`),
  google: require(`../Assets/google.png`),
  bckImg: require(`../Assets/bck_banner.jpeg`),
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
      text: `Let's visualize this setting: It is very early in the morning, and the day is about to break over the ocean. You're looking at the horizon and thinking about what is most important in your life. You think about what society wants you to be, the ideal people you see in the advertisements, and who your family and friends want you to be. They are not right or wrong. You don't fight with these opinions. You simply accept them as opinions. Thank them and put all of those images aside.Then you focus on what is really important for you. This is your journey and yours alone. You reach deep inside to see what you value most. When you get closer to the things that are important to you, excitement and a sense of urgency fill your heart. Now you remember the things you care about. You would work on these things even when things get tough.`,
      question: "What are the things that are most important for you?",
      caption: `(For example, being honest, adventurous, fun, hard-working, a leader, keep growing and improving, funny)(please note that being successful, wealthy, happy, etc., are important for most people, but they are generally byproducts of what we do. Not our core values. So here, let's try focusing on values rather than outcomes)`,
      type: "free-response",
    },
    {
      text: `When you focus on the horizon, you remember the time you were working on something that made you feel at your best. It was a time that you felt aremarkable sense of clarity, purpose, and enthusiasm. Every action flowed effortlessly. You were driven by a deep passion for what you were doing. You welcomed the challenges as chances for growth. You felt liberated, inspired, and fulfilled, making every moment rich with potential and meaning.`,
      question:
        "What three adjectives describes you in that moment when you were feeling at your best?",
      caption:
        "(e.g., kind, creative, energetic, fair, protective, romantic, respectful)",
      type: "free-response",
    },
    {
      text: `The cool ocean breeze fills you with energy. This reminds you of when you were full of energy and motivation. You feel like you can tackle everything that comes your way. This reminds you of when you were full of energy and motivation. It feels like you could work on that thing forever, and nothing could stop you! Think about that memory for a second.       `,
      question:
        "What were you doing at that time when you were feeling fully energized?",
      caption:
        "(e.g., solving a critical problem, giving a presentation on a meaningful topic, collaborating with a team to achieve a goal)",
      type: "free-response",
    },
    {
      text: `The first glimpses of light remind you of the actions that inspire you. When you think about these actions, you are filled with admiration and motivation. These actions resonate deeply with you and spark a connection with others. They motivate you to elevate yourself and strive for greater heights. Among those actions, one of them stands out the most.`,
      question: "What specific action inspired you and deeply moved you?",
      caption:
        "(e.g., Jennifer launching a non-profit organization for clean water, Dave starting a mentorship program for at-risk youth, Mia developing apps for accessibility)",
      type: "free-response",
    },
    {
      text: `When the gentle ocean breeze brushes your face, you close your eyes. In your mind's eye, the passage of time accelerates, and you find yourself transported through the years. Decades unfold like the pages of a book, revealing the chapters of your life's journey. You complete a full and meaningful life, then you find yourself watching your funeral from above. Your loved ones and admirers share memories about you.      
      `,
      question:
        "How would you like to be remembered by those who gathered at your funeral to celebrate your life?",
      caption:
        "(e.g., a compassionate leader who fostered growth, an empathetic listener who lifted spirits, a fearless adventurer who spread joy, a boundless optimist who spread hope)",
      type: "free-response",
    },
    {
      vision: "",
      explaination: null,
      meaningFulness: "",
      type: "brief-description",
    },
  ],
  SecondModule: [
    {
      text: `You’re back on the shore overlooking the ocean. The day is about to break. The rhythmic sound of waves motivates you to make a meaningful change in the world. Your mind wanders into a realm where limitations are cast aside, and you possess all the resources and support needed to create a remarkable impact in the world. In this moment of clarity, you find out what you’re passionate about changing in the world.`,
      question:
        `If you had all the resources and support you needed, what would you like to change in the world?"`,
      caption:
        "",
      type: "free-response",
    },
    {
      text: `When the dawn paints the horizon with its first light, you let your mind carry you to a place of profound introspection and clarity. As you feel the warm sunlight on your face, your mind turns to a singular cause worthy of dedicating your life to—a cause that would make every moment of your existence feel worthwhile.`,
      question: `If you were to commit the entirety of your being to one cause, what would that cause be?`,
      caption: "",
      type: "free-response",
    },
    {
      text: `As you stand on the tranquil shore in the early morning light, gazing at the horizon, let your thoughts drift forward in time. You see yourself dedicating your life to a cause that resonates deeply with you. Then, you see the individuals whose lives were touched and transformed by your efforts.`,
      question: `How did your tireless work benefit and uplift them?`,
      caption: "",
      type: "free-response",
    },
    {
      text: `As you embrace the tranquility of the shore, your sense of purpose becomes clearer. You're on the brink of uncovering what truly resonates with your soul. The liberating feeling of being in sync with your purpose surrounds you. Now, let's complete this sentence:`,
      question: `I am here (on this earth) to ____________, because I want to _________.`,
      caption: "",
      type: "free-response",
    },
    {
      text: "",
      question: `Why is this purpose meaningful for you? `,
      caption: "",
      type: "free-response",
    },
    {
      text: "As you listen to the sound of the waves, you feel a surge of strength coursing through you. The clarity of your purpose helps you to think about your strengths. Now, consider this:",
      question: "How can your strengths help you with your purpose?",
      caption: "",
      type: "free-response",
    },
    {
      text: "",
      question: "",
      caption: "",
      type: "brief-description",
    },
  ],
  ThirdModule: [
    {
      question: "Please select up to 3 roles",
      roles: [
        'Educator/Teacher',
        'Entrepreneur',
        'Healer/Doctor',
        'Innovator/Creator',
        'Artist',
        'Researcher/Scientist',
        'Philanthropist',
        'Advocate/Activist',
        'Mentor/Coach',
        'Athlete',
        'Explorer/Adventurer',
        'Spiritual Leader',
        'Environmentalist',
        'Public Servant/Politician',
        'Writer/Author',
        'Counselor/Therapist'
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
      text: "Please Select one",
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
  FifthModule: [
    {
      text: "Please answer the following question:",
      question:
        "Have you previously attempted to achieve your mid-term goal of",
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
    {
      vision: "",
      explaination: null,
      meaningFulness: "",
      type: "brief-description",
    },
    {
      vision: "",
      explaination: null,
      meaningFulness: "",
      type: "selection",
    },
    {
      type: "single",
    }
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
  apiKey: "AIzaSyDLc9hZrioQbdQN1QWPfvxYOgu8jcX-66I",
  authDomain: "enlife-bb0de.firebaseapp.com",
  projectId: "enlife-bb0de",
  storageBucket: "enlife-bb0de.appspot.com",
  messagingSenderId: "836450151464",
  appId: "1:836450151464:web:e84d0ed3313aa3260cd91d",
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
