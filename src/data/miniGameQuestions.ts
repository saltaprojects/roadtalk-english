export interface GameQuestion {
  id: string;
  scenario: string;
  imageUrl: string;
  phraseEN: string;
  phraseRU: string;
  questionLanguage: "en" | "ru";
  correctAnswer: string;
  wrongAnswers: string[];
  difficulty: "easy" | "medium" | "hard";
}

export const miniGameQuestions: GameQuestion[] = [
  // Weigh Station Scenario - English to Russian
  {
    id: "weigh-en-1",
    scenario: "weigh-station",
    imageUrl: "/src/assets/scenarios/weigh-station-conversation.jpg",
    phraseEN: "May I see your logbook?",
    phraseRU: "Можно посмотреть вашу путевую книгу?",
    questionLanguage: "en",
    correctAnswer: "Можно посмотреть вашу путевую книгу?",
    wrongAnswers: [
      "Где ваши документы?",
      "Вы превысили скорость?",
      "Какой груз вы везете?"
    ],
    difficulty: "easy"
  },
  {
    id: "weigh-en-2",
    scenario: "weigh-station",
    imageUrl: "/src/assets/scenarios/weigh-station-conversation.jpg",
    phraseEN: "Pull your truck onto the scale",
    phraseRU: "Заезжайте на весы",
    questionLanguage: "en",
    correctAnswer: "Заезжайте на весы",
    wrongAnswers: [
      "Остановите двигатель",
      "Покажите права",
      "Откройте прицеп"
    ],
    difficulty: "easy"
  },
  {
    id: "weigh-en-3",
    scenario: "weigh-station",
    imageUrl: "/src/assets/scenarios/weigh-station-conversation.jpg",
    phraseEN: "Your axle weight is over the limit",
    phraseRU: "Вес на оси превышает норму",
    questionLanguage: "en",
    correctAnswer: "Вес на оси превышает норму",
    wrongAnswers: [
      "Ваша скорость слишком высокая",
      "У вас сломаны фары",
      "Документы не в порядке"
    ],
    difficulty: "medium"
  },
  {
    id: "weigh-en-4",
    scenario: "weigh-station",
    imageUrl: "/src/assets/scenarios/weigh-station-conversation.jpg",
    phraseEN: "Are you carrying any hazardous materials?",
    phraseRU: "Вы перевозите опасные грузы?",
    questionLanguage: "en",
    correctAnswer: "Вы перевозите опасные грузы?",
    wrongAnswers: [
      "Сколько миль вы проехали?",
      "Куда вы направляетесь?",
      "Когда вы отдыхали?"
    ],
    difficulty: "medium"
  },
  {
    id: "weigh-en-5",
    scenario: "weigh-station",
    imageUrl: "/src/assets/scenarios/weigh-station-conversation.jpg",
    phraseEN: "How many hours have you been driving today?",
    phraseRU: "Сколько часов вы сегодня за рулем?",
    questionLanguage: "en",
    correctAnswer: "Сколько часов вы сегодня за рулем?",
    wrongAnswers: [
      "Когда вы начали работать?",
      "Где вы будете спать?",
      "Сколько вам лет?"
    ],
    difficulty: "easy"
  },

  // Weigh Station Scenario - Russian to English
  {
    id: "weigh-ru-1",
    scenario: "weigh-station",
    imageUrl: "/src/assets/scenarios/weigh-station-conversation.jpg",
    phraseEN: "Here it is, officer",
    phraseRU: "Вот, офицер",
    questionLanguage: "ru",
    correctAnswer: "Here it is, officer",
    wrongAnswers: [
      "I don't have it",
      "Why do you need it?",
      "It's in the truck"
    ],
    difficulty: "easy"
  },
  {
    id: "weigh-ru-2",
    scenario: "weigh-station",
    imageUrl: "/src/assets/scenarios/weigh-station-conversation.jpg",
    phraseEN: "I understand. What should I do?",
    phraseRU: "Я понимаю. Что мне делать?",
    questionLanguage: "ru",
    correctAnswer: "I understand. What should I do?",
    wrongAnswers: [
      "That's impossible!",
      "Your scale is broken",
      "I checked it myself"
    ],
    difficulty: "easy"
  },
  {
    id: "weigh-ru-3",
    scenario: "weigh-station",
    imageUrl: "/src/assets/scenarios/weigh-station-conversation.jpg",
    phraseEN: "No, just regular cargo",
    phraseRU: "Нет, просто обычный груз",
    questionLanguage: "ru",
    correctAnswer: "No, just regular cargo",
    wrongAnswers: [
      "Yes, I have chemicals",
      "What do you mean?",
      "I'm not sure"
    ],
    difficulty: "easy"
  },
  {
    id: "weigh-ru-4",
    scenario: "weigh-station",
    imageUrl: "/src/assets/scenarios/weigh-station-conversation.jpg",
    phraseEN: "I've driven 8 hours so far",
    phraseRU: "Я проехал 8 часов на данный момент",
    questionLanguage: "ru",
    correctAnswer: "I've driven 8 hours so far",
    wrongAnswers: [
      "Not too many hours",
      "I lost count",
      "Enough hours"
    ],
    difficulty: "medium"
  },
  {
    id: "weigh-ru-5",
    scenario: "weigh-station",
    imageUrl: "/src/assets/scenarios/weigh-station-conversation.jpg",
    phraseEN: "Thank you, officer. Have a good day",
    phraseRU: "Спасибо, офицер. Хорошего дня",
    questionLanguage: "ru",
    correctAnswer: "Thank you, officer. Have a good day",
    wrongAnswers: [
      "Finally!",
      "About time",
      "Okay, bye"
    ],
    difficulty: "easy"
  },

  // Gas Station Scenario - English to Russian
  {
    id: "gas-en-1",
    scenario: "gas-station",
    imageUrl: "/src/assets/scenarios/gas-station-conversation.jpg",
    phraseEN: "Diesel, please. Fill it up",
    phraseRU: "Дизель, пожалуйста. Полный бак",
    questionLanguage: "en",
    correctAnswer: "Дизель, пожалуйста. Полный бак",
    wrongAnswers: [
      "Бензин на 50 долларов",
      "Где туалет?",
      "Сколько это стоит?"
    ],
    difficulty: "easy"
  },
  {
    id: "gas-en-2",
    scenario: "gas-station",
    imageUrl: "/src/assets/scenarios/gas-station-conversation.jpg",
    phraseEN: "Can I pay with a company card?",
    phraseRU: "Могу я оплатить корпоративной картой?",
    questionLanguage: "en",
    correctAnswer: "Могу я оплатить корпоративной картой?",
    wrongAnswers: [
      "Это слишком дорого!",
      "У меня нет денег",
      "Дайте скидку"
    ],
    difficulty: "easy"
  },
  {
    id: "gas-en-3",
    scenario: "gas-station",
    imageUrl: "/src/assets/scenarios/gas-station-conversation.jpg",
    phraseEN: "Yes, please. I need it for my company",
    phraseRU: "Да, пожалуйста. Он нужен для моей компании",
    questionLanguage: "en",
    correctAnswer: "Да, пожалуйста. Он нужен для моей компании",
    wrongAnswers: [
      "Нет, забудьте",
      "Мне всё равно",
      "Может быть"
    ],
    difficulty: "easy"
  },
  {
    id: "gas-en-4",
    scenario: "gas-station",
    imageUrl: "/src/assets/scenarios/gas-station-conversation.jpg",
    phraseEN: "How far is the next station?",
    phraseRU: "Как далеко следующая заправка?",
    questionLanguage: "en",
    correctAnswer: "Как далеко следующая заправка?",
    wrongAnswers: [
      "Это смешно!",
      "Я не могу в это поверить",
      "Что мне делать?"
    ],
    difficulty: "medium"
  },
  {
    id: "gas-en-5",
    scenario: "gas-station",
    imageUrl: "/src/assets/scenarios/gas-station-conversation.jpg",
    phraseEN: "I'm at pump number 7",
    phraseRU: "Я на колонке номер 7",
    questionLanguage: "en",
    correctAnswer: "Я на колонке номер 7",
    wrongAnswers: [
      "Та, что снаружи",
      "Дизельная колонка",
      "Я забыл"
    ],
    difficulty: "easy"
  },

  // Gas Station Scenario - Russian to English
  {
    id: "gas-ru-1",
    scenario: "gas-station",
    imageUrl: "/src/assets/scenarios/gas-station-conversation.jpg",
    phraseEN: "Let me try another card. One moment",
    phraseRU: "Позвольте попробовать другую карту. Одну минуту",
    questionLanguage: "ru",
    correctAnswer: "Let me try another card. One moment",
    wrongAnswers: [
      "That's impossible!",
      "Your machine is broken",
      "I used it yesterday"
    ],
    difficulty: "easy"
  },
  {
    id: "gas-ru-2",
    scenario: "gas-station",
    imageUrl: "/src/assets/scenarios/gas-station-conversation.jpg",
    phraseEN: "Yes, I'll take 5 gallons",
    phraseRU: "Да, возьму 5 галлонов",
    questionLanguage: "ru",
    correctAnswer: "Yes, I'll take 5 gallons",
    wrongAnswers: [
      "What's that?",
      "Is it expensive?",
      "Maybe later"
    ],
    difficulty: "easy"
  },
  {
    id: "gas-ru-3",
    scenario: "gas-station",
    imageUrl: "/src/assets/scenarios/gas-station-conversation.jpg",
    phraseEN: "Great! Thank you for letting me know",
    phraseRU: "Отлично! Спасибо, что сообщили",
    questionLanguage: "ru",
    correctAnswer: "Great! Thank you for letting me know",
    wrongAnswers: [
      "I don't drink coffee",
      "Is it good?",
      "Whatever"
    ],
    difficulty: "easy"
  },
  {
    id: "gas-ru-4",
    scenario: "gas-station",
    imageUrl: "/src/assets/scenarios/gas-station-conversation.jpg",
    phraseEN: "You can park in the back lot, near the fence",
    phraseRU: "Можете припарковаться сзади, у забора",
    questionLanguage: "ru",
    correctAnswer: "You can park in the back lot, near the fence",
    wrongAnswers: [
      "Anywhere you want",
      "I don't know",
      "Figure it out"
    ],
    difficulty: "medium"
  },
  {
    id: "gas-ru-5",
    scenario: "gas-station",
    imageUrl: "/src/assets/scenarios/gas-station-conversation.jpg",
    phraseEN: "Is there another restroom nearby?",
    phraseRU: "Есть ли другой туалет поблизости?",
    questionLanguage: "ru",
    correctAnswer: "Is there another restroom nearby?",
    wrongAnswers: [
      "This is unacceptable!",
      "Why didn't you fix it?",
      "Great, just great"
    ],
    difficulty: "easy"
  },

  // Police Stop Scenario - English to Russian
  {
    id: "police-en-1",
    scenario: "police-stop",
    imageUrl: "/src/assets/scenarios/police-conversation.jpg",
    phraseEN: "Yes, officer. Let me get them for you",
    phraseRU: "Да, офицер. Позвольте я их достану",
    questionLanguage: "en",
    correctAnswer: "Да, офицер. Позвольте я их достану",
    wrongAnswers: [
      "Почему вы меня остановили?",
      "Я ничего не сделал",
      "Это займет минуту"
    ],
    difficulty: "easy"
  },
  {
    id: "police-en-2",
    scenario: "police-stop",
    imageUrl: "/src/assets/scenarios/police-conversation.jpg",
    phraseEN: "No, officer. I'm not sure",
    phraseRU: "Нет, офицер. Я не уверен",
    questionLanguage: "en",
    correctAnswer: "Нет, офицер. Я не уверен",
    wrongAnswers: [
      "Потому что вы хотели?",
      "Я понятия не имею",
      "Я превысил скорость?"
    ],
    difficulty: "easy"
  },
  {
    id: "police-en-3",
    scenario: "police-stop",
    imageUrl: "/src/assets/scenarios/police-conversation.jpg",
    phraseEN: "I apologize, officer. I didn't realize",
    phraseRU: "Прошу прощения, офицер. Я не осознавал",
    questionLanguage: "en",
    correctAnswer: "Прошу прощения, офицер. Я не осознавал",
    wrongAnswers: [
      "Все ехали быстрее",
      "Я ехал в потоке",
      "Вы уверены?"
    ],
    difficulty: "medium"
  },
  {
    id: "police-en-4",
    scenario: "police-stop",
    imageUrl: "/src/assets/scenarios/police-conversation.jpg",
    phraseEN: "No, officer. Not at all",
    phraseRU: "Нет, офицер. Совсем нет",
    questionLanguage: "en",
    correctAnswer: "Нет, офицер. Совсем нет",
    wrongAnswers: [
      "Немного",
      "Это личное",
      "Почему вы спрашиваете?"
    ],
    difficulty: "medium"
  },
  {
    id: "police-en-5",
    scenario: "police-stop",
    imageUrl: "/src/assets/scenarios/police-conversation.jpg",
    phraseEN: "Of course, officer. Here are the keys",
    phraseRU: "Конечно, офицер. Вот ключи",
    questionLanguage: "en",
    correctAnswer: "Конечно, офицер. Вот ключи",
    wrongAnswers: [
      "У вас есть ордер?",
      "Это действительно необходимо?",
      "Это просто обычный груз"
    ],
    difficulty: "medium"
  },

  // Police Stop Scenario - Russian to English
  {
    id: "police-ru-1",
    scenario: "police-stop",
    imageUrl: "/src/assets/scenarios/police-conversation.jpg",
    phraseEN: "I'm coming from Denver, Colorado",
    phraseRU: "Я еду из Денвера, Колорадо",
    questionLanguage: "ru",
    correctAnswer: "I'm coming from Denver, Colorado",
    wrongAnswers: [
      "From back there",
      "Does it matter?",
      "A warehouse somewhere"
    ],
    difficulty: "easy"
  },
  {
    id: "police-ru-2",
    scenario: "police-stop",
    imageUrl: "/src/assets/scenarios/police-conversation.jpg",
    phraseEN: "I didn't know that. I'll get it fixed immediately",
    phraseRU: "Я не знал об этом. Я исправлю это немедленно",
    questionLanguage: "ru",
    correctAnswer: "I didn't know that. I'll get it fixed immediately",
    wrongAnswers: [
      "It was fine this morning",
      "Can I just tape it?",
      "How much is the fine?"
    ],
    difficulty: "easy"
  },
  {
    id: "police-ru-3",
    scenario: "police-stop",
    imageUrl: "/src/assets/scenarios/police-conversation.jpg",
    phraseEN: "It belongs to my company, Swift Transport",
    phraseRU: "Он принадлежит моей компании, Swift Transport",
    questionLanguage: "ru",
    correctAnswer: "It belongs to my company, Swift Transport",
    wrongAnswers: [
      "I do",
      "Some company",
      "Why do you need to know?"
    ],
    difficulty: "medium"
  },
  {
    id: "police-ru-4",
    scenario: "police-stop",
    imageUrl: "/src/assets/scenarios/police-conversation.jpg",
    phraseEN: "Thank you, officer. I appreciate it",
    phraseRU: "Спасибо, офицер. Я ценю это",
    questionLanguage: "ru",
    correctAnswer: "Thank you, officer. I appreciate it",
    wrongAnswers: [
      "Okay, whatever",
      "Can I go now?",
      "Fine"
    ],
    difficulty: "easy"
  },
  {
    id: "police-ru-5",
    scenario: "police-stop",
    imageUrl: "/src/assets/scenarios/police-conversation.jpg",
    phraseEN: "Yes, officer. Right away",
    phraseRU: "Да, офицер. Прямо сейчас",
    questionLanguage: "ru",
    correctAnswer: "Yes, officer. Right away",
    wrongAnswers: [
      "Why should I?",
      "Am I under arrest?",
      "I'd rather not"
    ],
    difficulty: "easy"
  },

  // Border Crossing Scenario - English to Russian
  {
    id: "border-en-1",
    scenario: "border-crossing",
    imageUrl: "/src/assets/scenarios/border-conversation.jpg",
    phraseEN: "I'm delivering commercial cargo to Toronto",
    phraseRU: "Я доставляю коммерческий груз в Торонто",
    questionLanguage: "en",
    correctAnswer: "Я доставляю коммерческий груз в Торонто",
    wrongAnswers: [
      "Просто бизнес",
      "Перевожу товары",
      "Рабочие дела"
    ],
    difficulty: "medium"
  },
  {
    id: "border-en-2",
    scenario: "border-crossing",
    imageUrl: "/src/assets/scenarios/border-conversation.jpg",
    phraseEN: "Here's the invoice and bill of lading",
    phraseRU: "Вот счет-фактура и коносамент",
    questionLanguage: "en",
    correctAnswer: "Вот счет-фактура и коносамент",
    wrongAnswers: [
      "Я думаю, это где-то здесь",
      "У моей компании это есть",
      "Это требуется?"
    ],
    difficulty: "hard"
  },
  {
    id: "border-en-3",
    scenario: "border-crossing",
    imageUrl: "/src/assets/scenarios/border-conversation.jpg",
    phraseEN: "No, sir. Only the items listed on my manifest",
    phraseRU: "Нет, сэр. Только предметы, указанные в моем манифесте",
    questionLanguage: "en",
    correctAnswer: "Нет, сэр. Только предметы, указанные в моем манифесте",
    wrongAnswers: [
      "Я так не думаю",
      "Какие предметы запрещены?",
      "Просто обычный груз"
    ],
    difficulty: "hard"
  },
  {
    id: "border-en-4",
    scenario: "border-crossing",
    imageUrl: "/src/assets/scenarios/border-conversation.jpg",
    phraseEN: "I'll be here for two days to complete the delivery",
    phraseRU: "Я буду здесь два дня, чтобы завершить доставку",
    questionLanguage: "en",
    correctAnswer: "Я буду здесь два дня, чтобы завершить доставку",
    wrongAnswers: [
      "Ненадолго",
      "Несколько дней",
      "Пока не закончу"
    ],
    difficulty: "medium"
  },
  {
    id: "border-en-5",
    scenario: "border-crossing",
    imageUrl: "/src/assets/scenarios/border-conversation.jpg",
    phraseEN: "The total declared value is $85,000",
    phraseRU: "Общая заявленная стоимость составляет $85,000",
    questionLanguage: "en",
    correctAnswer: "Общая заявленная стоимость составляет $85,000",
    wrongAnswers: [
      "Много",
      "Это в документах",
      "Около 80 или 90 тысяч"
    ],
    difficulty: "hard"
  },

  // Border Crossing Scenario - Russian to English
  {
    id: "border-ru-1",
    scenario: "border-crossing",
    imageUrl: "/src/assets/scenarios/border-conversation.jpg",
    phraseEN: "I apologize. Can I cross with standard documentation?",
    phraseRU: "Прошу прощения. Могу я пересечь границу со стандартными документами?",
    questionLanguage: "ru",
    correctAnswer: "I apologize. Can I cross with standard documentation?",
    wrongAnswers: [
      "I didn't notice that",
      "Can you make an exception?",
      "I renewed it online"
    ],
    difficulty: "hard"
  },
  {
    id: "border-ru-2",
    scenario: "border-crossing",
    imageUrl: "/src/assets/scenarios/border-conversation.jpg",
    phraseEN: "Yes, sir. Where should I park?",
    phraseRU: "Да, сэр. Где мне припарковаться?",
    questionLanguage: "ru",
    correctAnswer: "Yes, sir. Where should I park?",
    wrongAnswers: [
      "Is there a problem?",
      "How long will this take?",
      "Do I have to?"
    ],
    difficulty: "medium"
  },
  {
    id: "border-ru-3",
    scenario: "border-crossing",
    imageUrl: "/src/assets/scenarios/border-conversation.jpg",
    phraseEN: "I have all the required permits",
    phraseRU: "У меня есть все необходимые разрешения",
    questionLanguage: "ru",
    correctAnswer: "I have all the required permits",
    wrongAnswers: [
      "I think so",
      "My company handles that",
      "What permits?"
    ],
    difficulty: "medium"
  },
  {
    id: "border-ru-4",
    scenario: "border-crossing",
    imageUrl: "/src/assets/scenarios/border-conversation.jpg",
    phraseEN: "The cargo is sealed and secure",
    phraseRU: "Груз опечатан и надежно закреплен",
    questionLanguage: "ru",
    correctAnswer: "The cargo is sealed and secure",
    wrongAnswers: [
      "It looks fine to me",
      "I loaded it myself",
      "Everything is inside"
    ],
    difficulty: "hard"
  },
  {
    id: "border-ru-5",
    scenario: "border-crossing",
    imageUrl: "/src/assets/scenarios/border-conversation.jpg",
    phraseEN: "Thank you. Have a good day",
    phraseRU: "Спасибо. Хорошего дня",
    questionLanguage: "ru",
    correctAnswer: "Thank you. Have a good day",
    wrongAnswers: [
      "Finally done",
      "About time",
      "See you"
    ],
    difficulty: "easy"
  }
];

export const getQuestionsByScenario = (scenario: string): GameQuestion[] => {
  return miniGameQuestions.filter(q => q.scenario === scenario);
};

export const scenarios = [
  {
    id: "weigh-station",
    icon: "⚖️",
    titleKey: "miniGames.scenarios.weighStation.title",
    descriptionKey: "miniGames.scenarios.weighStation.description",
    difficulty: "easy",
    questionCount: 10
  },
  {
    id: "gas-station",
    icon: "⛽",
    titleKey: "miniGames.scenarios.gasStation.title",
    descriptionKey: "miniGames.scenarios.gasStation.description",
    difficulty: "easy",
    questionCount: 10
  },
  {
    id: "police-stop",
    icon: "🚨",
    titleKey: "miniGames.scenarios.policeStop.title",
    descriptionKey: "miniGames.scenarios.policeStop.description",
    difficulty: "medium",
    questionCount: 10
  },
  {
    id: "border-crossing",
    icon: "🛂",
    titleKey: "miniGames.scenarios.borderCrossing.title",
    descriptionKey: "miniGames.scenarios.borderCrossing.description",
    difficulty: "hard",
    questionCount: 10
  }
];
