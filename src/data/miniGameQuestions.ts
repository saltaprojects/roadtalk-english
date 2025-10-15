export interface GameQuestion {
  id: string;
  scenario: string;
  situationEN: string;
  situationRU: string;
  correctAnswer: string;
  wrongAnswers: string[];
  difficulty: "easy" | "medium" | "hard";
}

export const miniGameQuestions: GameQuestion[] = [
  // Weigh Station Scenario (Easy)
  {
    id: "weigh-1",
    scenario: "weigh-station",
    situationEN: "The inspector asks: 'What's your gross vehicle weight?'",
    situationRU: "Инспектор спрашивает: 'Какова масса вашего транспортного средства?'",
    correctAnswer: "It's 78,000 pounds, sir",
    wrongAnswers: [
      "I don't know the weight",
      "Maybe 50 tons",
      "Is it important?"
    ],
    difficulty: "easy"
  },
  {
    id: "weigh-2",
    scenario: "weigh-station",
    situationEN: "The inspector says: 'Pull your truck onto the scale'",
    situationRU: "Инспектор говорит: 'Заезжайте на весы'",
    correctAnswer: "Yes, sir. Right away",
    wrongAnswers: [
      "Why do I need to?",
      "Can I skip this?",
      "I'm in a hurry"
    ],
    difficulty: "easy"
  },
  {
    id: "weigh-3",
    scenario: "weigh-station",
    situationEN: "The inspector asks: 'May I see your logbook?'",
    situationRU: "Инспектор спрашивает: 'Можно посмотреть вашу путевую книгу?'",
    correctAnswer: "Here it is, officer",
    wrongAnswers: [
      "I forgot it at home",
      "Do you really need it?",
      "It's in the truck somewhere"
    ],
    difficulty: "easy"
  },
  {
    id: "weigh-4",
    scenario: "weigh-station",
    situationEN: "The inspector says: 'Your axle weight is over the limit'",
    situationRU: "Инспектор говорит: 'Вес на оси превышает норму'",
    correctAnswer: "I understand. What should I do?",
    wrongAnswers: [
      "That's impossible!",
      "Your scale is broken",
      "I checked it myself"
    ],
    difficulty: "easy"
  },
  {
    id: "weigh-5",
    scenario: "weigh-station",
    situationEN: "The inspector asks: 'Are you carrying any hazardous materials?'",
    situationRU: "Инспектор спрашивает: 'Вы перевозите опасные грузы?'",
    correctAnswer: "No, just regular cargo",
    wrongAnswers: [
      "What do you mean?",
      "I'm not sure",
      "Maybe some chemicals"
    ],
    difficulty: "easy"
  },
  {
    id: "weigh-6",
    scenario: "weigh-station",
    situationEN: "The inspector says: 'Your permits look good. You're cleared to go'",
    situationRU: "Инспектор говорит: 'Ваши документы в порядке. Можете ехать'",
    correctAnswer: "Thank you, officer. Have a good day",
    wrongAnswers: [
      "Finally!",
      "About time",
      "Okay, bye"
    ],
    difficulty: "easy"
  },
  {
    id: "weigh-7",
    scenario: "weigh-station",
    situationEN: "The inspector asks: 'How many hours have you been driving today?'",
    situationRU: "Инспектор спрашивает: 'Сколько часов вы сегодня за рулем?'",
    correctAnswer: "I've driven 8 hours so far",
    wrongAnswers: [
      "Not too many",
      "I lost count",
      "Enough hours"
    ],
    difficulty: "easy"
  },
  {
    id: "weigh-8",
    scenario: "weigh-station",
    situationEN: "The inspector says: 'I need to inspect your cargo area'",
    situationRU: "Инспектор говорит: 'Мне нужно осмотреть грузовой отсек'",
    correctAnswer: "Sure, let me open it for you",
    wrongAnswers: [
      "Why is that necessary?",
      "Can't you just trust me?",
      "I'm running late"
    ],
    difficulty: "easy"
  },
  {
    id: "weigh-9",
    scenario: "weigh-station",
    situationEN: "The inspector asks: 'Where are you headed?'",
    situationRU: "Инспектор спрашивает: 'Куда вы направляетесь?'",
    correctAnswer: "I'm heading to Chicago, Illinois",
    wrongAnswers: [
      "Just driving around",
      "North somewhere",
      "To deliver stuff"
    ],
    difficulty: "easy"
  },
  {
    id: "weigh-10",
    scenario: "weigh-station",
    situationEN: "The inspector says: 'Your brake lights aren't working properly'",
    situationRU: "Инспектор говорит: 'Ваши стоп-сигналы не работают должным образом'",
    correctAnswer: "I'll get them fixed right away. Where's the nearest shop?",
    wrongAnswers: [
      "They were working this morning",
      "I didn't notice",
      "Can I fix it later?"
    ],
    difficulty: "easy"
  },

  // Gas Station Scenario (Easy)
  {
    id: "gas-1",
    scenario: "gas-station",
    situationEN: "The attendant asks: 'Diesel or gas?'",
    situationRU: "Работник спрашивает: 'Дизель или бензин?'",
    correctAnswer: "Diesel, please. Fill it up",
    wrongAnswers: [
      "Whatever's cheaper",
      "I don't know",
      "Just fuel"
    ],
    difficulty: "easy"
  },
  {
    id: "gas-2",
    scenario: "gas-station",
    situationEN: "The attendant says: 'That'll be $450'",
    situationRU: "Работник говорит: 'С вас 450 долларов'",
    correctAnswer: "Can I pay with a company card?",
    wrongAnswers: [
      "That's too much!",
      "Are you sure?",
      "I only have $300"
    ],
    difficulty: "easy"
  },
  {
    id: "gas-3",
    scenario: "gas-station",
    situationEN: "The attendant asks: 'Do you need a receipt?'",
    situationRU: "Работник спрашивает: 'Вам нужен чек?'",
    correctAnswer: "Yes, please. I need it for my company",
    wrongAnswers: [
      "No, forget it",
      "Whatever",
      "I guess so"
    ],
    difficulty: "easy"
  },
  {
    id: "gas-4",
    scenario: "gas-station",
    situationEN: "The attendant says: 'We're out of diesel. Try the next station'",
    situationRU: "Работник говорит: 'У нас закончилось дизельное топливо. Попробуйте следующую заправку'",
    correctAnswer: "Okay, thanks. How far is the next station?",
    wrongAnswers: [
      "This is ridiculous!",
      "I can't believe this",
      "What am I supposed to do?"
    ],
    difficulty: "easy"
  },
  {
    id: "gas-5",
    scenario: "gas-station",
    situationEN: "The attendant asks: 'Which pump number are you at?'",
    situationRU: "Работник спрашивает: 'На какой колонке вы стоите?'",
    correctAnswer: "I'm at pump number 7",
    wrongAnswers: [
      "The one outside",
      "The diesel one",
      "I forgot"
    ],
    difficulty: "easy"
  },
  {
    id: "gas-6",
    scenario: "gas-station",
    situationEN: "The attendant says: 'Your card was declined'",
    situationRU: "Работник говорит: 'Ваша карта не прошла'",
    correctAnswer: "Let me try another card. One moment",
    wrongAnswers: [
      "That's impossible!",
      "Your machine must be broken",
      "I used it yesterday"
    ],
    difficulty: "easy"
  },
  {
    id: "gas-7",
    scenario: "gas-station",
    situationEN: "The attendant asks: 'Do you need DEF fluid?'",
    situationRU: "Работник спрашивает: 'Вам нужна жидкость DEF?'",
    correctAnswer: "Yes, I'll take 5 gallons",
    wrongAnswers: [
      "What's that?",
      "Is it expensive?",
      "Maybe later"
    ],
    difficulty: "easy"
  },
  {
    id: "gas-8",
    scenario: "gas-station",
    situationEN: "The attendant says: 'We have free coffee inside'",
    situationRU: "Работник говорит: 'У нас внутри есть бесплатный кофе'",
    correctAnswer: "Great! Thank you for letting me know",
    wrongAnswers: [
      "I don't drink coffee",
      "Is it good?",
      "Okay"
    ],
    difficulty: "easy"
  },
  {
    id: "gas-9",
    scenario: "gas-station",
    situationEN: "The attendant asks: 'Where can I park my truck?'",
    situationRU: "Работник спрашивает: 'Где я могу припарковать свой грузовик?'",
    correctAnswer: "You can park in the back lot, near the fence",
    wrongAnswers: [
      "Anywhere you want",
      "I don't know",
      "Figure it out"
    ],
    difficulty: "easy"
  },
  {
    id: "gas-10",
    scenario: "gas-station",
    situationEN: "The attendant says: 'The restroom is out of order'",
    situationRU: "Работник говорит: 'Туалет не работает'",
    correctAnswer: "Is there another restroom nearby?",
    wrongAnswers: [
      "This is unacceptable!",
      "Why didn't you fix it?",
      "Great, just great"
    ],
    difficulty: "easy"
  },

  // Police Stop Scenario (Medium)
  {
    id: "police-1",
    scenario: "police-stop",
    situationEN: "The officer says: 'License and registration, please'",
    situationRU: "Офицер говорит: 'Права и регистрацию, пожалуйста'",
    correctAnswer: "Yes, officer. Let me get them for you",
    wrongAnswers: [
      "Why did you stop me?",
      "I didn't do anything wrong",
      "This will take a minute"
    ],
    difficulty: "medium"
  },
  {
    id: "police-2",
    scenario: "police-stop",
    situationEN: "The officer asks: 'Do you know why I pulled you over?'",
    situationRU: "Офицер спрашивает: 'Вы знаете, почему я вас остановил?'",
    correctAnswer: "No, officer. I'm not sure",
    wrongAnswers: [
      "Because you wanted to?",
      "I have no idea",
      "Was I speeding?"
    ],
    difficulty: "medium"
  },
  {
    id: "police-3",
    scenario: "police-stop",
    situationEN: "The officer says: 'You were going 75 in a 55 zone'",
    situationRU: "Офицер говорит: 'Вы ехали 75 в зоне с ограничением 55'",
    correctAnswer: "I apologize, officer. I didn't realize",
    wrongAnswers: [
      "Everyone else was going faster",
      "I was just keeping up with traffic",
      "Are you sure?"
    ],
    difficulty: "medium"
  },
  {
    id: "police-4",
    scenario: "police-stop",
    situationEN: "The officer asks: 'Have you been drinking?'",
    situationRU: "Офицер спрашивает: 'Вы употребляли алкоголь?'",
    correctAnswer: "No, officer. Not at all",
    wrongAnswers: [
      "Just a little",
      "That's personal",
      "Why do you ask?"
    ],
    difficulty: "medium"
  },
  {
    id: "police-5",
    scenario: "police-stop",
    situationEN: "The officer says: 'I need to inspect your cargo'",
    situationRU: "Офицер говорит: 'Мне нужно осмотреть ваш груз'",
    correctAnswer: "Of course, officer. Here are the keys",
    wrongAnswers: [
      "Do you have a warrant?",
      "Is that really necessary?",
      "It's just regular cargo"
    ],
    difficulty: "medium"
  },
  {
    id: "police-6",
    scenario: "police-stop",
    situationEN: "The officer asks: 'Where are you coming from?'",
    situationRU: "Офицер спрашивает: 'Откуда вы едете?'",
    correctAnswer: "I'm coming from Denver, Colorado",
    wrongAnswers: [
      "From back there",
      "Does it matter?",
      "A warehouse somewhere"
    ],
    difficulty: "medium"
  },
  {
    id: "police-7",
    scenario: "police-stop",
    situationEN: "The officer says: 'Your tail light is broken'",
    situationRU: "Офицер говорит: 'У вас разбит задний фонарь'",
    correctAnswer: "I didn't know that. I'll get it fixed immediately",
    wrongAnswers: [
      "It was fine this morning",
      "Can I just tape it?",
      "How much is the fine?"
    ],
    difficulty: "medium"
  },
  {
    id: "police-8",
    scenario: "police-stop",
    situationEN: "The officer asks: 'Who owns this truck?'",
    situationRU: "Офицер спрашивает: 'Кому принадлежит этот грузовик?'",
    correctAnswer: "It belongs to my company, Swift Transport",
    wrongAnswers: [
      "I do",
      "Some company",
      "Why do you need to know?"
    ],
    difficulty: "medium"
  },
  {
    id: "police-9",
    scenario: "police-stop",
    situationEN: "The officer says: 'I'm giving you a warning this time'",
    situationRU: "Офицер говорит: 'На этот раз я выпишу вам предупреждение'",
    correctAnswer: "Thank you, officer. I appreciate it",
    wrongAnswers: [
      "Okay, whatever",
      "Can I go now?",
      "Fine"
    ],
    difficulty: "medium"
  },
  {
    id: "police-10",
    scenario: "police-stop",
    situationEN: "The officer asks: 'Can you step out of the vehicle?'",
    situationRU: "Офицер спрашивает: 'Можете выйти из машины?'",
    correctAnswer: "Yes, officer. Right away",
    wrongAnswers: [
      "Why should I?",
      "Am I under arrest?",
      "I'd rather not"
    ],
    difficulty: "medium"
  },

  // Border Crossing Scenario (Hard)
  {
    id: "border-1",
    scenario: "border-crossing",
    situationEN: "The officer asks: 'What's the purpose of your trip?'",
    situationRU: "Офицер спрашивает: 'Какова цель вашей поездки?'",
    correctAnswer: "I'm delivering commercial cargo to Toronto",
    wrongAnswers: [
      "Just business",
      "Transporting goods",
      "Work stuff"
    ],
    difficulty: "hard"
  },
  {
    id: "border-2",
    scenario: "border-crossing",
    situationEN: "The officer says: 'I need to see your commercial invoice'",
    situationRU: "Офицер говорит: 'Мне нужен коммерческий счет-фактура'",
    correctAnswer: "Here's the invoice and bill of lading",
    wrongAnswers: [
      "I think I have it somewhere",
      "My company has that",
      "Is that required?"
    ],
    difficulty: "hard"
  },
  {
    id: "border-3",
    scenario: "border-crossing",
    situationEN: "The officer asks: 'Are you carrying any restricted items?'",
    situationRU: "Офицер спрашивает: 'Вы перевозите запрещенные предметы?'",
    correctAnswer: "No, sir. Only the items listed on my manifest",
    wrongAnswers: [
      "I don't think so",
      "What items are restricted?",
      "Just normal cargo"
    ],
    difficulty: "hard"
  },
  {
    id: "border-4",
    scenario: "border-crossing",
    situationEN: "The officer says: 'Your FAST card has expired'",
    situationRU: "Офицер говорит: 'Срок действия вашей карты FAST истек'",
    correctAnswer: "I apologize. Can I cross with standard documentation?",
    wrongAnswers: [
      "I didn't notice that",
      "Can you make an exception?",
      "I renewed it online"
    ],
    difficulty: "hard"
  },
  {
    id: "border-5",
    scenario: "border-crossing",
    situationEN: "The officer asks: 'How long will you be in Canada?'",
    situationRU: "Офицер спрашивает: 'Как долго вы пробудете в Канаде?'",
    correctAnswer: "I'll be here for two days to complete the delivery",
    wrongAnswers: [
      "Not long",
      "A few days",
      "Until I finish"
    ],
    difficulty: "hard"
  },
  {
    id: "border-6",
    scenario: "border-crossing",
    situationEN: "The officer says: 'Pull over for secondary inspection'",
    situationRU: "Офицер говорит: 'Остановитесь для дополнительного досмотра'",
    correctAnswer: "Yes, sir. Where should I park?",
    wrongAnswers: [
      "Is there a problem?",
      "How long will this take?",
      "Do I have to?"
    ],
    difficulty: "hard"
  },
  {
    id: "border-7",
    scenario: "border-crossing",
    situationEN: "The officer asks: 'What's the total value of your cargo?'",
    situationRU: "Офицер спрашивает: 'Какова общая стоимость вашего груза?'",
    correctAnswer: "The total declared value is $85,000",
    wrongAnswers: [
      "A lot",
      "It's on the paperwork",
      "Around 80 or 90 thousand"
    ],
    difficulty: "hard"
  },
  {
    id: "border-8",
    scenario: "border-crossing",
    situationEN: "The officer says: 'I need your passport and visa'",
    situationRU: "Офицер говорит: 'Мне нужен ваш паспорт и виза'",
    correctAnswer: "Here's my passport. I have a work permit as well",
    wrongAnswers: [
      "I have a driver's license",
      "Do I need a visa?",
      "I'm just passing through"
    ],
    difficulty: "hard"
  },
  {
    id: "border-9",
    scenario: "border-crossing",
    situationEN: "The officer asks: 'Have you been to any farms recently?'",
    situationRU: "Офицер спрашивает: 'Вы недавно посещали фермы?'",
    correctAnswer: "No, officer. I haven't been near any farms",
    wrongAnswers: [
      "I don't remember",
      "Maybe last week",
      "Why does that matter?"
    ],
    difficulty: "hard"
  },
  {
    id: "border-10",
    scenario: "border-crossing",
    situationEN: "The officer says: 'You're cleared. Welcome to Canada'",
    situationRU: "Офицер говорит: 'Все в порядке. Добро пожаловать в Канаду'",
    correctAnswer: "Thank you, officer. Have a great day",
    wrongAnswers: [
      "Finally!",
      "Okay, thanks",
      "About time"
    ],
    difficulty: "hard"
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
    difficulty: "easy" as const,
    questionCount: 10
  },
  {
    id: "gas-station",
    icon: "⛽",
    titleKey: "miniGames.scenarios.gasStation.title",
    descriptionKey: "miniGames.scenarios.gasStation.description",
    difficulty: "easy" as const,
    questionCount: 10
  },
  {
    id: "police-stop",
    icon: "🚔",
    titleKey: "miniGames.scenarios.policeStop.title",
    descriptionKey: "miniGames.scenarios.policeStop.description",
    difficulty: "medium" as const,
    questionCount: 10
  },
  {
    id: "border-crossing",
    icon: "🛂",
    titleKey: "miniGames.scenarios.borderCrossing.title",
    descriptionKey: "miniGames.scenarios.borderCrossing.description",
    difficulty: "hard" as const,
    questionCount: 10
  }
];
