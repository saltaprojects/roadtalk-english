import gasStationImage from "@/assets/scenarios/gas-station-conversation.jpg";
import restaurantImage from "@/assets/scenarios/restaurant-conversation.jpg";
import hotelImage from "@/assets/scenarios/hotel-conversation.jpg";
import facilitiesImage from "@/assets/scenarios/facilities-conversation.jpg";
import dispatcherImage from "@/assets/scenarios/dispatcher-conversation.jpg";
import deliveryImage from "@/assets/scenarios/delivery-conversation.jpg";
import policeImage from "@/assets/scenarios/police-conversation.jpg";
import mechanicImage from "@/assets/scenarios/mechanic-conversation.jpg";
import borderImage from "@/assets/scenarios/border-conversation.jpg";
import weighStationImage from "@/assets/scenarios/weigh-station-conversation.jpg";
import accidentImage from "@/assets/scenarios/accident-conversation.jpg";
import contractImage from "@/assets/scenarios/contract-conversation.jpg";

import gasAttendantChar from "@/assets/characters/gas-attendant.png";
import dispatcherChar from "@/assets/characters/dispatcher.png";
import warehouseWorkerChar from "@/assets/characters/warehouse-worker.png";
import policeOfficerChar from "@/assets/characters/police-officer.png";
import borderOfficerChar from "@/assets/characters/border-officer.png";
import weighInspectorChar from "@/assets/characters/weigh-inspector.png";

export type DialogueLine = {
  speaker: string;
  speakerRu: string;
  text: string;
  textRu: string;
};

export type ListeningExercise = {
  id: string;
  title: string;
  titleRu: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  imageUrl: string;
  characterImage?: string;
  dialogue: DialogueLine[];
  correctAnswer: string;
  correctAnswerRu: string;
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
    imageUrl: gasStationImage,
    characterImage: gasAttendantChar,
    dialogue: [
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "Hi! I need diesel.",
        textRu: "Привет! Мне нужен дизель."
      },
      {
        speaker: "Gas Attendant",
        speakerRu: "Заправщик",
        text: "Sure! Use pump number 5.",
        textRu: "Конечно! Используйте насос номер 5."
      },
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "Thanks! Where can I pay?",
        textRu: "Спасибо! Где я могу заплатить?"
      },
      {
        speaker: "Gas Attendant",
        speakerRu: "Заправщик",
        text: "Inside the store.",
        textRu: "Внутри магазина."
      }
    ],
    correctAnswer: "Buying diesel fuel",
    correctAnswerRu: "Покупка дизельного топлива",
    wrongOption1: "Looking for a bathroom",
    wrongOption1Ru: "Ищет туалет",
    wrongOption2: "Buying coffee",
    wrongOption2Ru: "Покупает кофе",
    scenario: "gas-station",
    duration: "0:20"
  },
  {
    id: "lex-beg-2",
    title: "Restaurant Order",
    titleRu: "Заказ в ресторане",
    difficulty: "beginner",
    imageUrl: restaurantImage,
    dialogue: [
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "Hi! Can I order food?",
        textRu: "Привет! Могу я заказать еду?"
      },
      {
        speaker: "Server",
        speakerRu: "Официант",
        text: "Yes! What would you like?",
        textRu: "Да! Что вы хотите?"
      },
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "A burger and fries, please.",
        textRu: "Бургер и картошку фри, пожалуйста."
      },
      {
        speaker: "Server",
        speakerRu: "Официант",
        text: "To go or eat here?",
        textRu: "С собой или здесь?"
      },
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "To go, thanks!",
        textRu: "С собой, спасибо!"
      }
    ],
    correctAnswer: "Ordering food to go",
    correctAnswerRu: "Заказ еды с собой",
    wrongOption1: "Asking for directions",
    wrongOption1Ru: "Спрашивает дорогу",
    wrongOption2: "Using the bathroom",
    wrongOption2Ru: "Пользуется туалетом",
    scenario: "restaurant",
    duration: "0:25"
  },
  {
    id: "lex-beg-3",
    title: "Hotel Check-in",
    titleRu: "Регистрация в отеле",
    difficulty: "beginner",
    imageUrl: hotelImage,
    dialogue: [
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "Hi. I need a room.",
        textRu: "Привет. Мне нужен номер."
      },
      {
        speaker: "Receptionist",
        speakerRu: "Администратор",
        text: "For one night?",
        textRu: "На одну ночь?"
      },
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "Yes. Do you have truck parking?",
        textRu: "Да. У вас есть парковка для грузовиков?"
      },
      {
        speaker: "Receptionist",
        speakerRu: "Администратор",
        text: "Yes, behind the building.",
        textRu: "Да, за зданием."
      }
    ],
    correctAnswer: "Checking into a hotel",
    correctAnswerRu: "Регистрация в отеле",
    wrongOption1: "Asking for directions",
    wrongOption1Ru: "Спрашивает дорогу",
    wrongOption2: "Buying gas",
    wrongOption2Ru: "Покупает бензин",
    scenario: "hotel",
    duration: "0:20"
  },
  {
    id: "lex-beg-4",
    title: "Asking Directions",
    titleRu: "Как спросить дорогу",
    difficulty: "beginner",
    imageUrl: facilitiesImage,
    dialogue: [
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "Excuse me. Where is I-95?",
        textRu: "Извините. Где I-95?"
      },
      {
        speaker: "Local",
        speakerRu: "Местный житель",
        text: "Go straight. Turn left at the light.",
        textRu: "Идите прямо. Поверните налево на светофоре."
      },
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "How far is it?",
        textRu: "Как далеко это?"
      },
      {
        speaker: "Local",
        speakerRu: "Местный житель",
        text: "About two miles.",
        textRu: "Около двух миль."
      }
    ],
    correctAnswer: "Asking for directions to I-95",
    correctAnswerRu: "Спрашивает дорогу на I-95",
    wrongOption1: "Looking for a mechanic",
    wrongOption1Ru: "Ищет механика",
    wrongOption2: "Ordering food",
    wrongOption2Ru: "Заказывает еду",
    scenario: "directions",
    duration: "0:20"
  },

  // Intermediate Level
  {
    id: "lex-int-1",
    title: "Dispatcher Call",
    titleRu: "Звонок диспетчеру",
    difficulty: "intermediate",
    imageUrl: dispatcherImage,
    characterImage: dispatcherChar,
    dialogue: [
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "Hi dispatch, this is John. I'm running 45 minutes late.",
        textRu: "Привет, диспетчер, это Джон. Я опаздываю на 45 минут."
      },
      {
        speaker: "Dispatcher",
        speakerRu: "Диспетчер",
        text: "What's the reason for the delay?",
        textRu: "Какая причина задержки?"
      },
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "Heavy traffic on I-95. There was an accident.",
        textRu: "Плотное движение на I-95. Там было ДТП."
      },
      {
        speaker: "Dispatcher",
        speakerRu: "Диспетчер",
        text: "Okay. Take Route 301 instead. It's faster now.",
        textRu: "Хорошо. Возьмите маршрут 301 вместо этого. Сейчас он быстрее."
      },
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "Got it. Should I call the customer?",
        textRu: "Понял. Мне позвонить клиенту?"
      },
      {
        speaker: "Dispatcher",
        speakerRu: "Диспетчер",
        text: "No, I'll notify them. Drive safe.",
        textRu: "Нет, я уведомлю их. Езжай осторожно."
      }
    ],
    correctAnswer: "Reporting delay and getting alternate route",
    correctAnswerRu: "Сообщает о задержке и получает другой маршрут",
    wrongOption1: "Asking for time off",
    wrongOption1Ru: "Просит выходной",
    wrongOption2: "Requesting a new load",
    wrongOption2Ru: "Запрашивает новый груз",
    scenario: "dispatcher",
    duration: "0:35"
  },
  {
    id: "lex-int-2",
    title: "Warehouse Delivery",
    titleRu: "Доставка на склад",
    difficulty: "intermediate",
    imageUrl: deliveryImage,
    characterImage: warehouseWorkerChar,
    dialogue: [
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "Good morning. I have a delivery for dock 7.",
        textRu: "Доброе утро. У меня доставка для дока 7."
      },
      {
        speaker: "Warehouse Worker",
        speakerRu: "Работник склада",
        text: "Can I see your bill of lading?",
        textRu: "Могу я увидеть вашу накладную?"
      },
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "Sure, here it is.",
        textRu: "Конечно, вот она."
      },
      {
        speaker: "Warehouse Worker",
        speakerRu: "Работник склада",
        text: "Everything looks good. Back up to door 7.",
        textRu: "Всё выглядит хорошо. Сдайте назад к двери 7."
      },
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "How long will unloading take?",
        textRu: "Сколько займёт разгрузка?"
      },
      {
        speaker: "Warehouse Worker",
        speakerRu: "Работник склада",
        text: "About 30 minutes. You can wait in the break room.",
        textRu: "Около 30 минут. Можете подождать в комнате отдыха."
      }
    ],
    correctAnswer: "Making a warehouse delivery",
    correctAnswerRu: "Доставка на склад",
    wrongOption1: "Picking up a new load",
    wrongOption1Ru: "Забирает новый груз",
    wrongOption2: "Looking for parking",
    wrongOption2Ru: "Ищет парковку",
    scenario: "delivery",
    duration: "0:35"
  },
  {
    id: "lex-int-3",
    title: "Police Traffic Stop",
    titleRu: "Остановка полицией",
    difficulty: "intermediate",
    imageUrl: policeImage,
    characterImage: policeOfficerChar,
    dialogue: [
      {
        speaker: "Officer",
        speakerRu: "Офицер",
        text: "Good afternoon. License and registration, please.",
        textRu: "Добрый день. Права и регистрацию, пожалуйста."
      },
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "Sure. Here you go. Is there a problem?",
        textRu: "Конечно. Вот, пожалуйста. Есть проблема?"
      },
      {
        speaker: "Officer",
        speakerRu: "Офицер",
        text: "You were going 70 in a 55 zone.",
        textRu: "Вы ехали 70 в зоне 55."
      },
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "I'm sorry, officer. I didn't realize.",
        textRu: "Извините, офицер. Я не заметил."
      },
      {
        speaker: "Officer",
        speakerRu: "Офицер",
        text: "I'll give you a warning this time. Slow down.",
        textRu: "Я дам вам предупреждение в этот раз. Снизьте скорость."
      },
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "Thank you, officer. I will.",
        textRu: "Спасибо, офицер. Я буду."
      }
    ],
    correctAnswer: "Getting stopped for speeding",
    correctAnswerRu: "Остановлен за превышение скорости",
    wrongOption1: "Truck has mechanical problems",
    wrongOption1Ru: "У грузовика механические проблемы",
    wrongOption2: "Asking for directions",
    wrongOption2Ru: "Спрашивает дорогу",
    scenario: "police",
    duration: "0:35"
  },
  {
    id: "lex-int-4",
    title: "Mechanic Shop",
    titleRu: "Ремонтная мастерская",
    difficulty: "intermediate",
    imageUrl: mechanicImage,
    dialogue: [
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "Hi. My check engine light came on.",
        textRu: "Привет. У меня загорелась лампочка проверки двигателя."
      },
      {
        speaker: "Mechanic",
        speakerRu: "Механик",
        text: "Any strange noises or performance issues?",
        textRu: "Какие-нибудь странные звуки или проблемы с производительностью?"
      },
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "Yes, there's a noise from the transmission.",
        textRu: "Да, есть шум из трансмиссии."
      },
      {
        speaker: "Mechanic",
        speakerRu: "Механик",
        text: "Let me run a diagnostic. It'll take about 20 minutes.",
        textRu: "Дайте я проведу диагностику. Это займёт около 20 минут."
      },
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "Okay. How much will it cost?",
        textRu: "Хорошо. Сколько это будет стоить?"
      },
      {
        speaker: "Mechanic",
        speakerRu: "Механик",
        text: "The diagnostic is $75. I'll know more after that.",
        textRu: "Диагностика стоит 75 долларов. Я узнаю больше после этого."
      }
    ],
    correctAnswer: "Getting truck diagnosed at mechanic",
    correctAnswerRu: "Диагностика грузовика у механика",
    wrongOption1: "Buying a new truck",
    wrongOption1Ru: "Покупает новый грузовик",
    wrongOption2: "Getting fuel",
    wrongOption2Ru: "Заправляется",
    scenario: "mechanic",
    duration: "0:35"
  },

  // Advanced Level
  {
    id: "lex-adv-1",
    title: "Border Crossing",
    titleRu: "Пересечение границы",
    difficulty: "advanced",
    imageUrl: borderImage,
    characterImage: borderOfficerChar,
    dialogue: [
      {
        speaker: "Officer",
        speakerRu: "Офицер",
        text: "Good morning. Purpose of your entry into Canada?",
        textRu: "Доброе утро. Цель вашего въезда в Канаду?"
      },
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "Commercial delivery to Toronto. I have all my paperwork.",
        textRu: "Коммерческая доставка в Торонто. У меня есть все документы."
      },
      {
        speaker: "Officer",
        speakerRu: "Офицер",
        text: "May I see your customs declaration and cargo manifest?",
        textRu: "Могу я увидеть вашу таможенную декларацию и манифест груза?"
      },
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "Yes, here they are. The load is sealed refrigerated goods.",
        textRu: "Да, вот они. Груз - опечатанные охлаждённые товары."
      },
      {
        speaker: "Officer",
        speakerRu: "Офицер",
        text: "What's the declared value of the cargo?",
        textRu: "Какова заявленная стоимость груза?"
      },
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "Approximately forty-five thousand US dollars.",
        textRu: "Примерно сорок пять тысяч долларов США."
      },
      {
        speaker: "Officer",
        speakerRu: "Офицер",
        text: "Do you have your FAST card and vehicle inspection?",
        textRu: "У вас есть карта FAST и осмотр транспортного средства?"
      },
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "Yes sir, both are current. Here's my FAST card.",
        textRu: "Да, сэр, оба актуальны. Вот моя карта FAST."
      },
      {
        speaker: "Officer",
        speakerRu: "Офицер",
        text: "Everything looks in order. Proceed to inspection bay 3.",
        textRu: "Всё в порядке. Проезжайте к инспекционному отсеку 3."
      }
    ],
    correctAnswer: "Crossing international border with cargo",
    correctAnswerRu: "Пересечение международной границы с грузом",
    wrongOption1: "Being denied entry",
    wrongOption1Ru: "Отказано во въезде",
    wrongOption2: "Looking for a restaurant",
    wrongOption2Ru: "Ищет ресторан",
    scenario: "border",
    duration: "0:50"
  },
  {
    id: "lex-adv-2",
    title: "Weigh Station Inspection",
    titleRu: "Проверка на весовой станции",
    difficulty: "advanced",
    imageUrl: weighStationImage,
    characterImage: weighInspectorChar,
    dialogue: [
      {
        speaker: "Inspector",
        speakerRu: "Инспектор",
        text: "Good afternoon. Pull onto the scale, please.",
        textRu: "Добрый день. Заезжайте на весы, пожалуйста."
      },
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "Yes sir. Here's my logbook and registration.",
        textRu: "Да, сэр. Вот мой журнал и регистрация."
      },
      {
        speaker: "Inspector",
        speakerRu: "Инспектор",
        text: "Your gross weight is 78,000 pounds. Within limits. How many hours have you driven today?",
        textRu: "Ваш общий вес 78000 фунтов. В пределах нормы. Сколько часов вы вели сегодня?"
      },
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "Seven hours so far. I have three hours left on my 11-hour window.",
        textRu: "Семь часов пока. У меня осталось три часа в моём 11-часовом окне."
      },
      {
        speaker: "Inspector",
        speakerRu: "Инспектор",
        text: "When was your last DOT inspection?",
        textRu: "Когда была ваша последняя проверка DOT?"
      },
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "Two months ago. Everything passed. The paperwork is in the glove box.",
        textRu: "Два месяца назад. Всё прошло. Документы в бардачке."
      },
      {
        speaker: "Inspector",
        speakerRu: "Инспектор",
        text: "Alright. You're good to go. Drive carefully.",
        textRu: "Хорошо. Можете ехать. Езжайте осторожно."
      },
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "Thank you, officer. Have a good day.",
        textRu: "Спасибо, офицер. Хорошего дня."
      }
    ],
    correctAnswer: "Passing weigh station inspection",
    correctAnswerRu: "Прохождение проверки на весовой станции",
    wrongOption1: "Being overweight",
    wrongOption1Ru: "Перегружен",
    wrongOption2: "Having logbook violations",
    wrongOption2Ru: "Нарушения в журнале",
    scenario: "weigh-station",
    duration: "0:50"
  },
  {
    id: "lex-adv-3",
    title: "Accident Report",
    titleRu: "Отчёт о происшествии",
    difficulty: "advanced",
    imageUrl: accidentImage,
    dialogue: [
      {
        speaker: "Officer",
        speakerRu: "Офицер",
        text: "I'm Officer Martinez. Can you tell me what happened?",
        textRu: "Я офицер Мартинес. Можете рассказать, что случилось?"
      },
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "A car merged into my lane without signaling. I tried to brake but couldn't avoid contact.",
        textRu: "Машина перестроилась в мою полосу без сигнала. Я попытался затормозить, но не смог избежать контакта."
      },
      {
        speaker: "Officer",
        speakerRu: "Офицер",
        text: "Were you following at a safe distance?",
        textRu: "Вы соблюдали безопасную дистанцию?"
      },
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "Yes, sir. I was at least four seconds back. I have dash cam footage that shows everything.",
        textRu: "Да, сэр. Я был как минимум в четырёх секундах. У меня есть видео с регистратора, которое показывает всё."
      },
      {
        speaker: "Officer",
        speakerRu: "Офицер",
        text: "Good. I'll need a copy of that. Anyone injured?",
        textRu: "Хорошо. Мне понадобится копия. Кто-нибудь пострадал?"
      },
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "No injuries. Both vehicles have minor damage. Here's my insurance and CDL.",
        textRu: "Нет травм. Оба автомобиля имеют незначительные повреждения. Вот моя страховка и CDL."
      },
      {
        speaker: "Officer",
        speakerRu: "Офицер",
        text: "I'll write up the report. The other driver will receive a citation for unsafe lane change.",
        textRu: "Я составлю отчёт. Другой водитель получит штраф за небезопасную смену полосы."
      },
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "Thank you, officer. Do I need to contact my company?",
        textRu: "Спасибо, офицер. Мне нужно связаться с моей компанией?"
      },
      {
        speaker: "Officer",
        speakerRu: "Офицер",
        text: "Yes, you should notify them immediately. Here's the case number.",
        textRu: "Да, вы должны уведомить их немедленно. Вот номер дела."
      }
    ],
    correctAnswer: "Reporting traffic accident with evidence",
    correctAnswerRu: "Сообщает о ДТП с доказательствами",
    wrongOption1: "Being at fault and leaving",
    wrongOption1Ru: "Виноват и покидает место",
    wrongOption2: "Being injured",
    wrongOption2Ru: "Получил травму",
    scenario: "accident",
    duration: "0:55"
  },
  {
    id: "lex-adv-4",
    title: "Contract Negotiation",
    titleRu: "Переговоры по контракту",
    difficulty: "advanced",
    imageUrl: contractImage,
    dialogue: [
      {
        speaker: "Broker",
        speakerRu: "Брокер",
        text: "We have a load from Dallas to Chicago. 1,200 miles. We're offering $2.20 per mile.",
        textRu: "У нас есть груз из Далласа в Чикаго. 1200 миль. Мы предлагаем 2.20 доллара за милю."
      },
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "Given current fuel prices at $4.50 per gallon, I need at least $2.50 per mile.",
        textRu: "Учитывая текущие цены на топливо в 4.50 доллара за галлон, мне нужно как минимум 2.50 доллара за милю."
      },
      {
        speaker: "Broker",
        speakerRu: "Брокер",
        text: "That's quite high. Best I can do is $2.35.",
        textRu: "Это довольно высоко. Лучшее, что я могу сделать - 2.35 доллара."
      },
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "I'll accept $2.40, but I require detention pay after two hours and layover compensation.",
        textRu: "Я приму 2.40 доллара, но мне нужна плата за простой после двух часов и компенсация за ночёвку."
      },
      {
        speaker: "Broker",
        speakerRu: "Брокер",
        text: "We can do detention at $50 per hour after two hours. What about delivery timeframe?",
        textRu: "Мы можем сделать простой в 50 долларов в час после двух часов. Как насчёт сроков доставки?"
      },
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "I can deliver in 48 hours, assuming no major delays.",
        textRu: "Я могу доставить за 48 часов, если не будет серьёзных задержек."
      },
      {
        speaker: "Broker",
        speakerRu: "Брокер",
        text: "Deal. I'll send the rate confirmation to your email. When can you pick up?",
        textRu: "Договорились. Я отправлю подтверждение ставки на вашу электронную почту. Когда вы можете забрать?"
      },
      {
        speaker: "Driver",
        speakerRu: "Водитель",
        text: "I can be there tomorrow morning at 8 AM.",
        textRu: "Я могу быть там завтра утром в 8 утра."
      }
    ],
    correctAnswer: "Negotiating contract terms and rates",
    correctAnswerRu: "Переговоры по условиям контракта и ставкам",
    wrongOption1: "Accepting first offer",
    wrongOption1Ru: "Принимает первое предложение",
    wrongOption2: "Negotiation fails",
    wrongOption2Ru: "Переговоры не удаются",
    scenario: "contract",
    duration: "0:55"
  },
];

export const getExercisesByDifficulty = (difficulty: ListeningExercise['difficulty']) => {
  return listeningExercises.filter(ex => ex.difficulty === difficulty);
};

export const getExerciseById = (id: string) => {
  return listeningExercises.find(ex => ex.id === id);
};
