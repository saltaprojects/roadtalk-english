export type ListeningExercise = {
  id: string;
  title: string;
  titleRu: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  videoUrl: string; // YouTube embed URL
  correctText: string;
  correctTextRu: string;
  wrongOption1: string;
  wrongOption1Ru: string;
  wrongOption2: string;
  wrongOption2Ru: string;
  scenario: string;
  duration: string;
};

export const listeningExercises: ListeningExercise[] = [
  // Beginner Level
  {
    id: "lex-beg-1",
    title: "Gas Station Conversation",
    titleRu: "Разговор на заправке",
    difficulty: "beginner",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder - replace with actual video
    correctText: "Hi! I need to fill up with diesel. Which pump can I use?",
    correctTextRu: "Привет! Мне нужно заправить дизель. Каким насосом я могу воспользоваться?",
    wrongOption1: "Hello! Where is the bathroom? I need to wash my hands.",
    wrongOption1Ru: "Здравствуйте! Где туалет? Мне нужно помыть руки.",
    wrongOption2: "Hi! I need to buy some coffee. How much does it cost?",
    wrongOption2Ru: "Привет! Мне нужно купить кофе. Сколько это стоит?",
    scenario: "gas-station",
    duration: "0:35"
  },
  {
    id: "lex-beg-2",
    title: "Restaurant Order",
    titleRu: "Заказ в ресторане",
    difficulty: "beginner",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    correctText: "Can I get a cheeseburger and fries, please? And a large coffee to go.",
    correctTextRu: "Можно мне чизбургер и картошку фри, пожалуйста? И большой кофе с собой.",
    wrongOption1: "Do you have a menu? I'm looking for the bathroom.",
    wrongOption1Ru: "У вас есть меню? Я ищу туалет.",
    wrongOption2: "I need gas for my truck. Where is the diesel pump?",
    wrongOption2Ru: "Мне нужно заправить грузовик. Где дизельный насос?",
    scenario: "restaurant",
    duration: "0:40"
  },
  {
    id: "lex-beg-3",
    title: "Hotel Check-in",
    titleRu: "Регистрация в отеле",
    difficulty: "beginner",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    correctText: "Hi, I have a reservation under Smith. Do you have parking for my truck?",
    correctTextRu: "Привет, у меня бронь на имя Смит. У вас есть парковка для моего грузовика?",
    wrongOption1: "I need directions to the highway. Which way should I go?",
    wrongOption1Ru: "Мне нужны указания до трассы. Куда мне ехать?",
    wrongOption2: "Can you fix my truck? The engine is making a strange noise.",
    wrongOption2Ru: "Можете починить мой грузовик? Двигатель издаёт странный звук.",
    scenario: "hotel",
    duration: "0:45"
  },
  {
    id: "lex-beg-4",
    title: "Asking for Directions",
    titleRu: "Как спросить дорогу",
    difficulty: "beginner",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    correctText: "Excuse me, how do I get to Interstate 95 from here?",
    correctTextRu: "Извините, как мне добраться до Междуштатной трассы 95 отсюда?",
    wrongOption1: "I want to order a pizza. Do you deliver?",
    wrongOption1Ru: "Я хочу заказать пиццу. Вы доставляете?",
    wrongOption2: "My truck broke down. Can you help me?",
    wrongOption2Ru: "Мой грузовик сломался. Можете мне помочь?",
    scenario: "directions",
    duration: "0:30"
  },

  // Intermediate Level
  {
    id: "lex-int-1",
    title: "Dispatcher Call",
    titleRu: "Звонок диспетчеру",
    difficulty: "intermediate",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    correctText: "I'm running about 45 minutes behind schedule due to heavy traffic. Should I take an alternate route?",
    correctTextRu: "Я опаздываю примерно на 45 минут из-за плотного движения. Мне стоит выбрать альтернативный маршрут?",
    wrongOption1: "The weather is nice today. I'll arrive on time for sure.",
    wrongOption1Ru: "Погода сегодня хорошая. Я точно приеду вовремя.",
    wrongOption2: "I need to find a gas station. Where's the nearest one?",
    wrongOption2Ru: "Мне нужно найти заправку. Где ближайшая?",
    scenario: "dispatcher",
    duration: "0:50"
  },
  {
    id: "lex-int-2",
    title: "Warehouse Delivery",
    titleRu: "Доставка на склад",
    difficulty: "intermediate",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    correctText: "I have a delivery for dock 7. Here's my bill of lading. Where should I back up?",
    correctTextRu: "У меня доставка для дока 7. Вот моя накладная. Куда мне задом заехать?",
    wrongOption1: "I'm looking for a place to sleep. Do you have a hotel nearby?",
    wrongOption1Ru: "Я ищу место для сна. У вас есть отель поблизости?",
    wrongOption2: "Can you check my truck? The brakes feel weird.",
    wrongOption2Ru: "Можете проверить мой грузовик? Тормоза ведут себя странно.",
    scenario: "delivery",
    duration: "0:55"
  },
  {
    id: "lex-int-3",
    title: "Police Traffic Stop",
    titleRu: "Остановка полицией",
    difficulty: "intermediate",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    correctText: "Good afternoon, officer. Here's my license, registration, and logbook. Is there a problem?",
    correctTextRu: "Добрый день, офицер. Вот мои права, регистрация и журнал. Есть проблема?",
    wrongOption1: "I don't have my documents with me. Can I go now?",
    wrongOption1Ru: "У меня нет документов с собой. Могу я ехать?",
    wrongOption2: "Where's the nearest truck stop? I need to refuel.",
    wrongOption2Ru: "Где ближайшая стоянка для грузовиков? Мне нужно заправиться.",
    scenario: "police",
    duration: "1:00"
  },
  {
    id: "lex-int-4",
    title: "Mechanic Shop",
    titleRu: "Ремонтная мастерская",
    difficulty: "intermediate",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    correctText: "My check engine light came on, and I'm hearing a strange noise from the transmission. Can you take a look?",
    correctTextRu: "У меня загорелась лампочка Check Engine, и я слышу странный звук из трансмиссии. Можете посмотреть?",
    wrongOption1: "I need to buy a new truck. How much do they cost?",
    wrongOption1Ru: "Мне нужно купить новый грузовик. Сколько они стоят?",
    wrongOption2: "Where can I park my truck for the night? Do you know?",
    wrongOption2Ru: "Где я могу припарковать грузовик на ночь? Вы знаете?",
    scenario: "mechanic",
    duration: "1:05"
  },

  // Advanced Level
  {
    id: "lex-adv-1",
    title: "Border Crossing",
    titleRu: "Пересечение границы",
    difficulty: "advanced",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    correctText: "Good morning. Here's my customs declaration, manifest, and cargo inspection documents. The load is sealed and documented.",
    correctTextRu: "Доброе утро. Вот моя таможенная декларация, манифест и документы на проверку груза. Груз опечатан и задокументирован.",
    wrongOption1: "I'm just passing through. I don't have any documents.",
    wrongOption1Ru: "Я просто проезжаю. У меня нет никаких документов.",
    wrongOption2: "Can you tell me where the nearest restaurant is?",
    wrongOption2Ru: "Можете сказать, где ближайший ресторан?",
    scenario: "border",
    duration: "1:10"
  },
  {
    id: "lex-adv-2",
    title: "Weigh Station Inspection",
    titleRu: "Проверка на весовой станции",
    difficulty: "advanced",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    correctText: "Here's my logbook showing my rest periods and driving hours. My gross vehicle weight is within legal limits, and I have all DOT inspection records.",
    correctTextRu: "Вот мой журнал, показывающий периоды отдыха и часы вождения. Масса моего автомобиля в пределах нормы, и у меня есть все записи проверки DOT.",
    wrongOption1: "I don't keep a logbook. Is that a problem?",
    wrongOption1Ru: "Я не веду журнал. Это проблема?",
    wrongOption2: "I need to call my dispatcher. Where's the phone?",
    wrongOption2Ru: "Мне нужно позвонить диспетчеру. Где телефон?",
    scenario: "weigh-station",
    duration: "1:15"
  },
  {
    id: "lex-adv-3",
    title: "Accident Report",
    titleRu: "Отчёт о происшествии",
    difficulty: "advanced",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    correctText: "I need to file an accident report. I have dash cam footage, insurance information, and witness statements. No one was injured.",
    correctTextRu: "Мне нужно заполнить отчёт о происшествии. У меня есть видео с регистратора, страховая информация и показания свидетелей. Никто не пострадал.",
    wrongOption1: "It wasn't my fault. I'm leaving now.",
    wrongOption1Ru: "Это не моя вина. Я сейчас уезжаю.",
    wrongOption2: "Can you recommend a good restaurant around here?",
    wrongOption2Ru: "Можете порекомендовать хороший ресторан здесь?",
    scenario: "accident",
    duration: "1:20"
  },
  {
    id: "lex-adv-4",
    title: "Contract Negotiation",
    titleRu: "Переговоры по контракту",
    difficulty: "advanced",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    correctText: "Given the current fuel prices and distance, I'd need $2.50 per mile. Also, I require detention pay after two hours and layover compensation.",
    correctTextRu: "Учитывая текущие цены на топливо и расстояние, мне нужно 2.50 доллара за милю. Также, мне нужна плата за простой после двух часов и компенсация за ночёвку.",
    wrongOption1: "I'll take any rate you offer. When do I start?",
    wrongOption1Ru: "Я приму любую ставку, которую вы предложите. Когда начинать?",
    wrongOption2: "Where's your office? I need to use the restroom.",
    wrongOption2Ru: "Где ваш офис? Мне нужно в туалет.",
    scenario: "contract",
    duration: "1:25"
  },
];

export const getExercisesByDifficulty = (difficulty: ListeningExercise['difficulty']) => {
  return listeningExercises.filter(ex => ex.difficulty === difficulty);
};

export const getExerciseById = (id: string) => {
  return listeningExercises.find(ex => ex.id === id);
};
