export interface Question {
  id: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  category?: string;
  difficulty?: string;
}

export const quizQuestions: Question[] = [
  {
    id: "1",
    question: "What is the official name of Prince's backing band?",
    correct_answer: "The Revolution",
    incorrect_answers: ["The Paupers", "The Wailers", "The Heartbreakers"]
  },
  {
    id: "2",
    question: "Which is not a playable character in the 2005 video game Killer7?",
    correct_answer: "Frank Smith",
    incorrect_answers: ["Mask de Smith", "Dan Smith", "Coyote Smith"]
  },
  {
    id: "3",
    question: "Who is One Punch Man voiced by in the Japanese version?",
    correct_answer: "Makoto Furukawa",
    incorrect_answers: ["Zach Aguilar", "Kaito Ishikawa", "Max Mittelman"]
  },
  {
    id: "4",
    question: "Which is the largest freshwater lake in the world?",
    correct_answer: "Lake Superior",
    incorrect_answers: ["Caspian Sea", "Lake Michigan", "Lake Huron"]
  },
  {
    id: "5",
    question: "When did the Battle of the Somme begin?",
    correct_answer: "July 1st, 1916",
    incorrect_answers: ["August 1st, 1916", "July 2nd, 1916", "June 30th, 1916"]
  },
  {
    id: "6",
    question: "In what year was the first eSports competition?",
    correct_answer: "1972",
    incorrect_answers: ["1989", "1990", "2000"]
  },
  {
    id: "7",
    question: "What is the county seat of King County, Washington?",
    correct_answer: "Seattle",
    incorrect_answers: ["Bellevue", "Enumclaw", "Skykomish"]
  },
  {
    id: "8",
    question: "What was the code name given to Sonic the Hedgehog 4 during its development?",
    correct_answer: "Project Needlemouse",
    incorrect_answers: ["Project Bluespike", "Project Roboegg", "Project Darksphere"]
  },
  {
    id: "9",
    question: "In \"Call Of Duty: Zombies\", which weapon does NOT deal any damage?",
    correct_answer: "31-79 JGb215",
    incorrect_answers: ["Sliquifier", "V-R11", "Wunderwaffe DG-2"]
  },
  {
    id: "10",
    question: "The Western Electric Model 500 telephone uses tone dialing to dial phone numbers.",
    correct_answer: "False",
    incorrect_answers: ["True"]
  },
  {
    id: "11",
    question: "Which of the following authors was not born in England?",
    correct_answer: "Arthur Conan Doyle",
    incorrect_answers: ["Graham Greene", "H G Wells", "Arthur C Clarke"]
  },
  {
    id: "12",
    question: "In World of Warcraft the default UI color that signifies Druid is what?",
    correct_answer: "Orange",
    incorrect_answers: ["Brown", "Green", "Blue"]
  },
  {
    id: "13",
    question: "This Greek goddess's name was chosen for the dwarf planet responsible for discord on Pluto's classification amongst astronomers.",
    correct_answer: "Eris",
    incorrect_answers: ["Charon", "Ceres", "Dysnomia"]
  },
  {
    id: "14",
    question: "Who is the creator of Touhou project?",
    correct_answer: "Zun",
    incorrect_answers: ["Jun", "Twilight Frontier", "Tasofro"]
  },
  {
    id: "15",
    question: "What is the official name of the star located closest to the North Celestial Pole?",
    correct_answer: "Polaris",
    incorrect_answers: ["Eridanus", "Gamma Cephei", "Iota Cephei"]
  }
];

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getShuffledOptions = (question: Question): string[] => {
  return shuffleArray([question.correct_answer, ...question.incorrect_answers]);
};