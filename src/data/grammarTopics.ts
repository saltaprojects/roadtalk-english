export interface GrammarExample {
  en: string;
  ru: string;
  highlight?: string;
}

export interface GrammarExercise {
  type: 'multiple-choice' | 'fill-blank' | 'reorder' | 'translate';
  question: { en: string; ru: string };
  options?: Array<{ en: string; ru: string }>;
  correctAnswer: string;
  explanation: { en: string; ru: string };
}

export interface GrammarTopic {
  id: string;
  title: { en: string; ru: string };
  description: { en: string; ru: string };
  explanation: { en: string; ru: string };
  examples: GrammarExample[];
  exercises: GrammarExercise[];
  icon: string;
  difficulty: 'beginner' | 'intermediate';
  estimatedMinutes: number;
  tips: { en: string; ru: string }[];
}

export const grammarTopics: GrammarTopic[] = [
  {
    id: 'present-simple',
    title: { 
      en: 'Present Simple - Daily Routines', 
      ru: 'Present Simple - Ежедневные действия' 
    },
    description: { 
      en: 'Learn to talk about your regular truck driving routines', 
      ru: 'Научитесь говорить о ваших регулярных рабочих действиях' 
    },
    explanation: { 
      en: 'We use Present Simple to talk about regular actions, habits, and routines in truck driving. Add -s/-es for he/she/it.', 
      ru: 'Мы используем Present Simple для регулярных действий и привычек. Добавляем -s/-es для he/she/it.' 
    },
    difficulty: 'beginner',
    estimatedMinutes: 15,
    tips: [
      { en: '💡 Use this when talking about your daily pre-trip inspection', ru: '💡 Используйте это при разговоре о ежедневном осмотре' },
      { en: '⚠️ Don\'t forget the -s with he/she/it (dispatcher sends, truck needs)', ru: '⚠️ Не забывайте -s с he/she/it (диспетчер отправляет, грузовик нуждается)' },
    ],
    examples: [
      { en: 'I inspect the truck every morning', ru: 'Я осматриваю грузовик каждое утро', highlight: 'inspect' },
      { en: 'The dispatcher sends me the route', ru: 'Диспетчер отправляет мне маршрут', highlight: 'sends' },
      { en: 'We rest at truck stops', ru: 'Мы отдыхаем на стоянках для грузовиков', highlight: 'rest' },
      { en: 'The weigh station opens at 6 AM', ru: 'Весовая станция открывается в 6 утра', highlight: 'opens' },
      { en: 'Drivers check tire pressure weekly', ru: 'Водители проверяют давление в шинах еженедельно', highlight: 'check' },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: { en: 'I ___ my hours every day', ru: 'Я ___ свои часы каждый день' },
        options: [
          { en: 'log', ru: 'логирую' },
          { en: 'logged', ru: 'логировал' },
          { en: 'logging', ru: 'логирую (сейчас)' },
          { en: 'logs', ru: 'логирует' }
        ],
        correctAnswer: 'log',
        explanation: { en: 'Use base form with I/you/we/they', ru: 'Используйте базовую форму с I/you/we/they' }
      },
      {
        type: 'fill-blank',
        question: { en: 'Every driver ___ (need) a valid CDL', ru: 'Каждому водителю ___ (нужна) действующая лицензия CDL' },
        correctAnswer: 'needs',
        explanation: { en: 'Add -s with every driver (third person singular)', ru: 'Добавляем -s с every driver (третье лицо единственное число)' }
      },
      {
        type: 'multiple-choice',
        question: { en: 'The truck ___ 40 tons', ru: 'Грузовик ___ 40 тонн' },
        options: [
          { en: 'weigh', ru: 'весить' },
          { en: 'weighs', ru: 'весит' },
          { en: 'weight', ru: 'вес' },
          { en: 'weighting', ru: 'взвешивание' }
        ],
        correctAnswer: 'weighs',
        explanation: { en: 'The truck = it, so add -s', ru: 'The truck = it, поэтому добавляем -s' }
      },
      {
        type: 'translate',
        question: { en: 'Translate: Я проверяю тормоза перед каждой поездкой', ru: 'Переведите: I check the brakes before every trip' },
        correctAnswer: 'I check the brakes before every trip',
        explanation: { en: 'Present Simple for routine actions', ru: 'Present Simple для регулярных действий' }
      }
    ],
    icon: 'Calendar'
  },
  {
    id: 'present-continuous',
    difficulty: 'beginner',
    estimatedMinutes: 15,
    tips: [
      { en: '🎯 Perfect for CB radio communication: "I am approaching exit 45"', ru: '🎯 Отлично для радио: "Я подъезжаю к выходу 45"' },
      { en: '⚠️ Common mistake: Don\'t say "I waiting" - always use am/is/are', ru: '⚠️ Частая ошибка: не говорите "I waiting" - всегда используйте am/is/are' },
    ],
    title: { 
      en: 'Present Continuous - Current Actions', 
      ru: 'Present Continuous - Текущие действия' 
    },
    description: { 
      en: 'Describe what is happening right now on the road', 
      ru: 'Описывайте, что происходит прямо сейчас на дороге' 
    },
    explanation: { 
      en: 'Use Present Continuous (am/is/are + verb-ing) for actions happening now. Common in radio communication.', 
      ru: 'Используйте Present Continuous (am/is/are + глагол-ing) для действий, происходящих сейчас.' 
    },
    examples: [
      { en: 'I am backing up to the dock', ru: 'Я сейчас сдаю назад к погрузочной платформе', highlight: 'am backing up' },
      { en: 'The dispatcher is calling me', ru: 'Диспетчер звонит мне сейчас', highlight: 'is calling' },
      { en: 'They are unloading the cargo', ru: 'Они сейчас разгружают груз', highlight: 'are unloading' },
      { en: 'Traffic is moving slowly', ru: 'Движение идет медленно', highlight: 'is moving' },
      { en: 'We are approaching the weigh station', ru: 'Мы приближаемся к весовой станции', highlight: 'are approaching' },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: { en: 'I ___ at the fuel pump right now', ru: 'Я сейчас ___ на топливной колонке' },
        options: [
          { en: 'wait', ru: 'жду' },
          { en: 'waiting', ru: 'ждущий' },
          { en: 'am waiting', ru: 'жду (сейчас)' },
          { en: 'waits', ru: 'ждёт' }
        ],
        correctAnswer: 'am waiting',
        explanation: { en: 'Use am + verb-ing for I', ru: 'Используйте am + глагол-ing с I' }
      },
      {
        type: 'fill-blank',
        question: { en: 'The truck ___ (break) down on the highway', ru: 'Грузовик ___ (ломается) на шоссе' },
        correctAnswer: 'is breaking',
        explanation: { en: 'The truck = it, use is + verb-ing', ru: 'The truck = it, используйте is + глагол-ing' }
      },
      {
        type: 'multiple-choice',
        question: { en: 'What ___ you ___ right now?', ru: 'Что ты сейчас ___?' },
        options: [
          { en: 'do...do', ru: 'делаешь (обычно)' },
          { en: 'are...doing', ru: 'делаешь (сейчас)' },
          { en: 'is...doing', ru: 'делает (сейчас)' },
          { en: 'does...do', ru: 'делает (обычно)' }
        ],
        correctAnswer: 'are...doing',
        explanation: { en: 'Questions: Are/Is + subject + verb-ing', ru: 'Вопросы: Are/Is + подлежащее + глагол-ing' }
      }
    ],
    icon: 'Radio'
  },
  {
    id: 'past-simple',
    difficulty: 'beginner',
    estimatedMinutes: 20,
    tips: [
      { en: '💡 Essential for trip reports and accident reports', ru: '💡 Необходимо для отчетов о рейсах и авариях' },
      { en: '⚠️ Watch out for irregular verbs: drive→drove, break→broke, sleep→slept', ru: '⚠️ Следите за неправильными глаголами: drive→drove, break→broke' },
    ],
    title: { 
      en: 'Past Simple - Trip Reports', 
      ru: 'Past Simple - Отчеты о рейсах' 
    },
    description: { 
      en: 'Report completed trips and past events', 
      ru: 'Сообщайте о завершенных рейсах и прошлых событиях' 
    },
    explanation: { 
      en: 'Use Past Simple for completed actions. Regular verbs add -ed, irregular verbs change form.', 
      ru: 'Используйте Past Simple для завершенных действий. Правильные глаголы + -ed, неправильные меняют форму.' 
    },
    examples: [
      { en: 'I delivered the load yesterday', ru: 'Я доставил груз вчера', highlight: 'delivered' },
      { en: 'The truck broke down in Nevada', ru: 'Грузовик сломался в Неваде', highlight: 'broke' },
      { en: 'We stopped at the weigh station', ru: 'Мы остановились на весовой станции', highlight: 'stopped' },
      { en: 'The inspection took two hours', ru: 'Проверка заняла два часа', highlight: 'took' },
      { en: 'I drove 600 miles today', ru: 'Я проехал 600 миль сегодня', highlight: 'drove' },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: { en: 'I ___ the load at 3 PM', ru: 'Я ___ груз в 3 часа дня' },
        options: [
          { en: 'pick up', ru: 'забираю' },
          { en: 'picked up', ru: 'забрал' },
          { en: 'picking up', ru: 'забирающий' },
          { en: 'picks up', ru: 'забирает' }
        ],
        correctAnswer: 'picked up',
        explanation: { en: 'Past Simple: add -ed to regular verbs', ru: 'Past Simple: добавляем -ed к правильным глаголам' }
      },
      {
        type: 'fill-blank',
        question: { en: 'The dispatcher ___ (call) me this morning', ru: 'Диспетчер ___ (позвонил) мне этим утром' },
        correctAnswer: 'called',
        explanation: { en: 'Regular verb: call → called', ru: 'Правильный глагол: call → called' }
      },
      {
        type: 'multiple-choice',
        question: { en: 'I ___ at a truck stop in Ohio', ru: 'Я ___ на стоянке в Огайо' },
        options: [
          { en: 'sleep', ru: 'сплю' },
          { en: 'slept', ru: 'спал' },
          { en: 'sleeping', ru: 'спящий' },
          { en: 'sleeps', ru: 'спит' }
        ],
        correctAnswer: 'slept',
        explanation: { en: 'Irregular verb: sleep → slept', ru: 'Неправильный глагол: sleep → slept' }
      }
    ],
    icon: 'FileText'
  },
  {
    id: 'future',
    difficulty: 'beginner',
    estimatedMinutes: 15,
    tips: [
      { en: '🎯 Use "will arrive" when giving ETAs to dispatch', ru: '🎯 Используйте "will arrive" при сообщении ETA диспетчеру' },
      { en: '💡 Use "going to" when you already have a plan to fuel or rest', ru: '💡 Используйте "going to" когда уже есть план заправиться или отдохнуть' },
    ],
    title: { 
      en: 'Future - Will & Going to', 
      ru: 'Будущее время - Will & Going to' 
    },
    description: { 
      en: 'Talk about arrival times and future plans', 
      ru: 'Говорите о времени прибытия и будущих планах' 
    },
    explanation: { 
      en: "Use 'will' for predictions and promises. Use 'going to' for definite plans.", 
      ru: "Используйте 'will' для предсказаний. Используйте 'going to' для определенных планов." 
    },
    examples: [
      { en: 'I will arrive at 3 PM', ru: 'Я прибуду в 3 часа дня', highlight: 'will arrive' },
      { en: "I'm going to refuel in Texas", ru: 'Я собираюсь заправиться в Техасе', highlight: 'going to refuel' },
      { en: 'The load will be ready tomorrow', ru: 'Груз будет готов завтра', highlight: 'will be' },
      { en: "I'm going to rest for 10 hours", ru: 'Я собираюсь отдыхать 10 часов', highlight: 'going to rest' },
      { en: 'The delivery will take 3 days', ru: 'Доставка займет 3 дня', highlight: 'will take' },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: { en: 'I ___ there by 5 PM', ru: 'Я ___ там к 5 вечера' },
        options: [
          { en: 'will be', ru: 'буду' },
          { en: 'am', ru: 'есть (сейчас)' },
          { en: 'was', ru: 'был' },
          { en: 'be', ru: 'быть' }
        ],
        correctAnswer: 'will be',
        explanation: { en: "Use 'will' for future predictions", ru: "Используйте 'will' для будущих предсказаний" }
      },
      {
        type: 'fill-blank',
        question: { en: 'I ___ (stop) at the next truck stop', ru: 'Я ___ (остановлюсь) на следующей стоянке' },
        correctAnswer: "am going to stop",
        explanation: { en: "Use 'going to' for definite plans", ru: "Используйте 'going to' для определенных планов" }
      }
    ],
    icon: 'Clock'
  },
  {
    id: 'modals',
    difficulty: 'intermediate',
    estimatedMinutes: 20,
    tips: [
      { en: '⚠️ MUST = DOT regulation (legal requirement)', ru: '⚠️ MUST = требование DOT (законное требование)' },
      { en: '💡 SHOULD = safety recommendation, CAN = permission or ability', ru: '💡 SHOULD = рекомендация по безопасности, CAN = разрешение или возможность' },
    ],
    title: { 
      en: 'Modal Verbs - Rules & Requirements', 
      ru: 'Модальные глаголы - Правила' 
    },
    description: { 
      en: 'Understand DOT regulations and requirements', 
      ru: 'Понимайте правила DOT и требования' 
    },
    explanation: { 
      en: "Modals (must, can, should, may) show obligation, ability, advice. Format: modal + base verb.", 
      ru: "Модальные глаголы (must, can, should, may) показывают обязательство, возможность, совет." 
    },
    examples: [
      { en: 'You must have a valid CDL', ru: 'Вы должны иметь действующую лицензию CDL', highlight: 'must have' },
      { en: "I can't drive over 11 hours", ru: 'Я не могу ехать больше 11 часов', highlight: "can't drive" },
      { en: 'You should check the brakes', ru: 'Вам следует проверить тормоза', highlight: 'should check' },
      { en: 'Drivers may rest here', ru: 'Водители могут отдыхать здесь', highlight: 'may rest' },
      { en: 'You must not exceed the weight limit', ru: 'Вы не должны превышать лимит веса', highlight: 'must not exceed' },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: { en: 'All drivers ___ log their hours', ru: 'Все водители ___ записывать свои часы' },
        options: [
          { en: 'must', ru: 'должны' },
          { en: 'can', ru: 'могут' },
          { en: 'may', ru: 'могут (разрешение)' },
          { en: 'should', ru: 'следует' }
        ],
        correctAnswer: 'must',
        explanation: { en: "Use 'must' for legal obligations", ru: "Используйте 'must' для обязательств" }
      },
      {
        type: 'fill-blank',
        question: { en: 'You ___ (should) wear a seatbelt', ru: 'Вам ___ (следует) пристегиваться' },
        correctAnswer: 'should',
        explanation: { en: "Use 'should' for strong advice", ru: "Используйте 'should' для совета" }
      }
    ],
    icon: 'AlertTriangle'
  },
  {
    id: 'prepositions',
    difficulty: 'intermediate',
    estimatedMinutes: 20,
    tips: [
      { en: '🎯 AT = specific location (at the dock, at mile marker 45)', ru: '🎯 AT = конкретное место (у дока, на миле 45)' },
      { en: '💡 ON = surface/road (on I-80), IN = enclosed space (in the cab)', ru: '💡 ON = поверхность/дорога (на I-80), IN = закрытое пространство (в кабине)' },
    ],
    title: { 
      en: 'Prepositions - Location & Movement', 
      ru: 'Предлоги - Местоположение' 
    },
    description: { 
      en: 'Navigate and describe locations accurately', 
      ru: 'Ориентируйтесь и описывайте местоположение' 
    },
    explanation: { 
      en: 'Prepositions show position and direction: at (point), on (surface), in (enclosed space), through, across, etc.', 
      ru: 'Предлоги показывают положение и направление: at (точка), on (поверхность), in (закрытое пространство).' 
    },
    examples: [
      { en: 'Turn left at the truck stop', ru: 'Поверните налево у стоянки', highlight: 'at' },
      { en: 'Drive on Highway 80', ru: 'Езжайте по шоссе 80', highlight: 'on' },
      { en: 'Go through the tunnel', ru: 'Проезжайте через туннель', highlight: 'through' },
      { en: 'The dock is across the parking lot', ru: 'Док находится через парковку', highlight: 'across' },
      { en: 'Wait in the staging area', ru: 'Ждите в зоне ожидания', highlight: 'in' },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: { en: 'Meet me ___ the fuel island', ru: 'Встретимся ___ на топливной колонке' },
        options: [
          { en: 'at', ru: 'у/на (точка)' },
          { en: 'in', ru: 'в (внутри)' },
          { en: 'on', ru: 'на (поверхность)' },
          { en: 'to', ru: 'к/в (направление)' }
        ],
        correctAnswer: 'at',
        explanation: { en: "Use 'at' for specific locations", ru: "Используйте 'at' для конкретных мест" }
      },
      {
        type: 'fill-blank',
        question: { en: 'Drive ___ the bridge', ru: 'Проезжайте ___ мост' },
        correctAnswer: 'across',
        explanation: { en: "Use 'across' for crossing over", ru: "Используйте 'across' для пересечения" }
      }
    ],
    icon: 'MapPin'
  },
  {
    id: 'questions',
    difficulty: 'beginner',
    estimatedMinutes: 15,
    tips: [
      { en: '💡 Start with the question word: Where, What, When, How, Who', ru: '💡 Начинайте с вопросительного слова: Where, What, When, How, Who' },
      { en: '🎯 Essential at loading docks and weigh stations', ru: '🎯 Необходимо на погрузочных площадках и весовых станциях' },
    ],
    title: { 
      en: 'Questions - Asking for Information', 
      ru: 'Вопросы - Запрос информации' 
    },
    description: { 
      en: 'Ask and answer important work questions', 
      ru: 'Задавайте и отвечайте на важные рабочие вопросы' 
    },
    explanation: { 
      en: 'Question words: What, Where, When, How, Who. Structure: Question word + auxiliary verb + subject + main verb?', 
      ru: 'Вопросительные слова: What, Where, When, How, Who. Структура: Вопрос + вспомогательный глагол + подлежащее + основной глагол?' 
    },
    examples: [
      { en: 'Where is the loading dock?', ru: 'Где находится погрузочная платформа?', highlight: 'Where is' },
      { en: 'What time should I arrive?', ru: 'Во сколько мне прибыть?', highlight: 'What time' },
      { en: 'How much does it weigh?', ru: 'Сколько это весит?', highlight: 'How much' },
      { en: 'When does the warehouse open?', ru: 'Когда открывается склад?', highlight: 'When does' },
      { en: 'Who should I call?', ru: 'Кому мне позвонить?', highlight: 'Who should' },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: { en: '___ do I sign?', ru: '___ мне расписаться?' },
        options: [
          { en: 'Where', ru: 'Где' },
          { en: 'What', ru: 'Что' },
          { en: 'When', ru: 'Когда' },
          { en: 'Who', ru: 'Кто' }
        ],
        correctAnswer: 'Where',
        explanation: { en: "Use 'Where' for location questions", ru: "Используйте 'Where' для вопросов о местоположении" }
      },
      {
        type: 'fill-blank',
        question: { en: '___ time is my appointment?', ru: '___ время моего назначения?' },
        correctAnswer: 'What',
        explanation: { en: "Use 'What time' for asking about time", ru: "Используйте 'What time' для вопросов о времени" }
      }
    ],
    icon: 'MessageCircle'
  },
  {
    id: 'imperatives',
    difficulty: 'beginner',
    estimatedMinutes: 15,
    tips: [
      { en: '🎯 You\'ll hear these at loading docks: "Back it up", "Stop here"', ru: '🎯 Вы услышите это на погрузочных площадках: "Сдай назад", "Остановись здесь"' },
      { en: '💡 Polite form: "Please" + imperative ("Please sign here")', ru: '💡 Вежливая форма: "Please" + повелительное ("Пожалуйста подпишите здесь")' },
    ],
    title: { 
      en: 'Imperatives - Instructions & Commands', 
      ru: 'Повелительное наклонение - Инструкции' 
    },
    description: { 
      en: 'Give and follow directions and safety instructions', 
      ru: 'Давайте и следуйте указаниям и инструкциям безопасности' 
    },
    explanation: { 
      en: 'Imperatives give commands or instructions. Use base verb form. Negative: Do not/Don\'t + verb.', 
      ru: 'Повелительное наклонение дает команды. Используйте базовую форму глагола. Отрицание: Don\'t + глагол.' 
    },
    examples: [
      { en: 'Turn left at the light', ru: 'Поверните налево на светофоре', highlight: 'Turn' },
      { en: 'Stop here', ru: 'Остановитесь здесь', highlight: 'Stop' },
      { en: 'Back it up slowly', ru: 'Сдавайте медленно назад', highlight: 'Back it up' },
      { en: 'Sign the BOL', ru: 'Подпишите BOL', highlight: 'Sign' },
      { en: "Don't park there", ru: 'Не паркуйтесь там', highlight: "Don't park" },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: { en: '___ your truck at dock 5', ru: '___ ваш грузовик у дока 5' },
        options: [
          { en: 'Park', ru: 'Паркуйте' },
          { en: 'Parking', ru: 'Парковка' },
          { en: 'Parked', ru: 'Припарковал' },
          { en: 'Parks', ru: 'Паркует' }
        ],
        correctAnswer: 'Park',
        explanation: { en: 'Use base verb form for commands', ru: 'Используйте базовую форму глагола для команд' }
      },
      {
        type: 'fill-blank',
        question: { en: "___ (not drive) over the speed limit", ru: '___ (не ездите) превышая скорость' },
        correctAnswer: "Don't drive",
        explanation: { en: "Negative imperative: Don't + base verb", ru: "Отрицание: Don't + базовый глагол" }
      }
    ],
    icon: 'Navigation'
  }
];
