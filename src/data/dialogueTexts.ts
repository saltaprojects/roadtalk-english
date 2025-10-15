export type DialogueDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface DialogueText {
  id: string;
  title: string;
  titleKey: string;
  difficulty: DialogueDifficulty;
  category: string;
  dialogueText: string;
  translation: string;
  transcription: string;
}

export const dialogueTexts: DialogueText[] = [
  // Beginner Level Dialogues
  {
    id: 'dlg-beg-1',
    title: 'Ordering at a Truck Stop Diner',
    titleKey: 'dialogue.titles.truckStopDiner',
    difficulty: 'beginner',
    category: 'restaurant',
    dialogueText: "Good morning! I'd like to order breakfast, please. Can I have scrambled eggs with bacon and toast? Also, could I get a large coffee? Thank you very much!",
    translation: 'Доброе утро! Я хотел бы заказать завтрак, пожалуйста. Могу я взять яичницу-болтунью с беконом и тостом? Также, можно мне большой кофе? Большое спасибо!',
    transcription: 'Гуд морнинг! Айд лайк ту ордер брэкфаст, плиз. Кэн ай хэв скрэмблд эгз уиз бейкон энд тоуст? Олсоу, куд ай гет э лардж кофи? Сэнк ю вэри мач!',
  },
  {
    id: 'dlg-beg-2',
    title: 'Asking for Directions',
    titleKey: 'dialogue.titles.askingDirections',
    difficulty: 'beginner',
    category: 'navigation',
    dialogueText: "Excuse me, can you help me? I'm looking for the nearest truck stop. Is it far from here? Which way should I go? Thank you for your help!",
    translation: 'Извините, можете помочь? Я ищу ближайшую стоянку для грузовиков. Это далеко отсюда? Куда мне идти? Спасибо за помощь!',
    transcription: 'Экскьюз ми, кэн ю хэлп ми? Айм лукинг фор зэ ниэрест трак стоп. Из ит фар фром хиэр? Уич уэй шуд ай гоу? Сэнк ю фор юр хэлп!',
  },
  {
    id: 'dlg-beg-3',
    title: 'At the Gas Station',
    titleKey: 'dialogue.titles.gasStation',
    difficulty: 'beginner',
    category: 'fuel',
    dialogueText: "Hi there! I need to fill up my truck with diesel. I'm on pump number five. Do you have a restroom I can use? Where can I pay?",
    translation: 'Привет! Мне нужно заправить мой грузовик дизелем. Я на колонке номер пять. У вас есть туалет, которым я могу воспользоваться? Где я могу оплатить?',
    transcription: 'Хай зэр! Ай нид ту фил ап май трак уиз дизел. Айм он памп намбер файв. Ду ю хэв э реструм ай кэн юз? Уэр кэн ай пэй?',
  },
  {
    id: 'dlg-beg-4',
    title: 'Hotel Check-in',
    titleKey: 'dialogue.titles.hotelCheckIn',
    difficulty: 'beginner',
    category: 'accommodation',
    dialogueText: "Hello! I'd like to check in, please. I have a reservation under my name. Do you have parking for my truck? What time is checkout tomorrow?",
    translation: 'Здравствуйте! Я хотел бы зарегистрироваться, пожалуйста. У меня есть бронирование на моё имя. У вас есть парковка для моего грузовика? Во сколько выезд завтра?',
    transcription: 'Хэлоу! Айд лайк ту чек ин, плиз. Ай хэв э рэзэрвейшн андер май нейм. Ду ю хэв паркинг фор май трак? Уот тайм из чекаут тумороу?',
  },

  // Intermediate Level Dialogues
  {
    id: 'dlg-int-1',
    title: 'Delivery at Warehouse',
    titleKey: 'dialogue.titles.warehouseDelivery',
    difficulty: 'intermediate',
    category: 'delivery',
    dialogueText: "Good afternoon! I'm here to make a delivery. Here's my bill of lading and the paperwork. Where should I back up to unload? Do you need me to open the trailer for inspection? How long will this take?",
    translation: 'Добрый день! Я здесь для доставки. Вот мой коносамент и документы. Куда мне следует подъехать задом для разгрузки? Вам нужно, чтобы я открыл прицеп для проверки? Сколько это займёт времени?',
    transcription: 'Гуд афтернун! Айм хиэр ту мейк э дэливэри. Хиэрз май бил оф лэйдинг энд зэ пейпэруорк. Уэр шуд ай бэк ап ту анлоуд? Ду ю нид ми ту оупэн зэ трэйлер фор инспекшн? Хау лонг уил зис тейк?',
  },
  {
    id: 'dlg-int-2',
    title: 'Calling Dispatcher',
    titleKey: 'dialogue.titles.callingDispatcher',
    difficulty: 'intermediate',
    category: 'communication',
    dialogueText: "Hi, this is driver calling. I'm running about thirty minutes behind schedule due to heavy traffic. My current location is mile marker two hundred on Interstate ninety-five. What's my next assignment? Should I still make the original delivery time?",
    translation: 'Привет, это водитель звонит. Я опаздываю примерно на тридцать минут из-за плотного движения. Моё текущее местоположение — отметка мили двести на Междуштатной трассе девяносто пять. Какое моё следующее задание? Должен ли я всё ещё успеть к первоначальному времени доставки?',
    transcription: 'Хай, зис из драйвер колинг. Айм ранинг эбаут сёрти минитс бихайнд скеджул дью ту хэви трэфик. Май карэнт локейшн из майл маркер ту хандрэд он Интерстейт найнти-файв. Уотс май некст эсайнмент? Шуд ай стил мейк зэ ориджинал дэливэри тайм?',
  },
  {
    id: 'dlg-int-3',
    title: 'Police Traffic Stop',
    titleKey: 'dialogue.titles.policeStop',
    difficulty: 'intermediate',
    category: 'official',
    dialogueText: "Good evening, officer. Yes, here are my driver's license and registration. My logbook is right here. The cargo documents are in the truck. Is there a problem? I understand, I'll be more careful.",
    translation: 'Добрый вечер, офицер. Да, вот мои водительские права и регистрация. Моя книжка учёта прямо здесь. Документы на груз в грузовике. Есть проблема? Я понимаю, я буду осторожнее.',
    transcription: 'Гуд ивнинг, офисер. Йес, хиэр ар май драйверз лайсенс энд реджистрейшн. Май логбук из райт хиэр. Зэ карго докьюментс ар ин зэ трак. Из зэр э проблем? Ай андерстэнд, айл би мор кэрфул.',
  },
  {
    id: 'dlg-int-4',
    title: 'Truck Repair Shop',
    titleKey: 'dialogue.titles.repairShop',
    difficulty: 'intermediate',
    category: 'maintenance',
    dialogueText: "Hello, I'm having problems with my truck. The engine is making a strange noise and the check engine light is on. Can you take a look at it today? How long will the inspection take? Do you think it's something serious?",
    translation: 'Здравствуйте, у меня проблемы с грузовиком. Двигатель издаёт странный шум, и горит лампа проверки двигателя. Можете посмотреть на него сегодня? Сколько займёт проверка? Как вы думаете, это что-то серьёзное?',
    transcription: 'Хэлоу, айм хэвинг проблемз уиз май трак. Зэ энджин из мейкинг э стрэйндж нойз энд зэ чек энджин лайт из он. Кэн ю тейк э лук эт ит тудэй? Хау лонг уил зэ инспекшн тейк? Ду ю синк итс самсинг сириэс?',
  },
  {
    id: 'dlg-int-5',
    title: 'Loading Dock Issue',
    titleKey: 'dialogue.titles.loadingDockIssue',
    difficulty: 'intermediate',
    category: 'delivery',
    dialogueText: "Excuse me, I have a concern about the cargo. Some of the boxes appear to be damaged. Should I note this on the paperwork? Who should I speak with about this? I need to make sure everything is documented properly.",
    translation: 'Извините, у меня есть вопрос насчёт груза. Некоторые коробки, похоже, повреждены. Должен ли я отметить это в документах? С кем мне следует поговорить об этом? Мне нужно убедиться, что всё правильно задокументировано.',
    transcription: 'Экскьюз ми, ай хэв э консёрн эбаут зэ карго. Сам оф зэ боксиз эпиэр ту би дэмэджд. Шуд ай ноут зис он зэ пейпэруорк? Ху шуд ай спик уиз эбаут зис? Ай нид ту мейк шур эврисинг из докьюментид пропэрли.',
  },

  // Advanced Level Dialogues
  {
    id: 'dlg-adv-1',
    title: 'Border Crossing Documentation',
    titleKey: 'dialogue.titles.borderCrossing',
    difficulty: 'advanced',
    category: 'border',
    dialogueText: "Good morning, officer. Here are all my documents: commercial driver's license, passport, customs declaration, and bill of lading. I'm transporting electronics from Chicago to Toronto. The cargo is sealed and matches the manifest exactly. The estimated value is listed on the customs form. Do you need any additional documentation?",
    translation: 'Доброе утро, офицер. Вот все мои документы: коммерческие водительские права, паспорт, таможенная декларация и коносамент. Я везу электронику из Чикаго в Торонто. Груз опечатан и точно соответствует манифесту. Оценочная стоимость указана в таможенной форме. Вам нужны какие-то дополнительные документы?',
    transcription: 'Гуд морнинг, офисер. Хиэр ар ол май докьюментс: коммёршл драйверз лайсенс, паспорт, кастомс дэклэрейшн, энд бил оф лэйдинг. Айм трэнспортинг илектроникс фром Шикаго ту Торонто. Зэ карго из силд энд мэчиз зэ мэнифест экзэктли. Зи эстимейтид вэлью из листид он зэ кастомс форм. Ду ю нид эни эдишнл докьюментейшн?',
  },
  {
    id: 'dlg-adv-2',
    title: 'Weigh Station Inspection',
    titleKey: 'dialogue.titles.weighStation',
    difficulty: 'advanced',
    category: 'inspection',
    dialogueText: "Yes, officer, I understand. My logbook is completely up to date with all required rest periods documented. The truck's gross vehicle weight is within legal limits. All safety equipment has been inspected and is functioning properly. My last DOT inspection was three months ago with no violations. Here's the inspection report if you'd like to review it.",
    translation: 'Да, офицер, я понимаю. Моя книжка учёта полностью актуальна со всеми требуемыми периодами отдыха, задокументированными. Полная масса транспортного средства находится в пределах законных лимитов. Всё оборудование безопасности было проверено и работает правильно. Моя последняя проверка DOT была три месяца назад без нарушений. Вот отчёт о проверке, если вы хотите его просмотреть.',
    transcription: 'Йес, офисер, ай андерстэнд. Май логбук из комплитли ап ту дейт уиз ол рикуайэрд рест пириэдз докьюментид. Зэ тракс гросс вихикл уэйт из уизин лигал лимитс. Ол сэйфти икуипмент хэз бин инспектид энд из фанкшнинг пропэрли. Май ласт Ди-Оу-Ти инспекшн уоз сри мансс эгоу уиз ноу вайолейшнз. Хиэрз зи инспекшн рипорт иф юд лайк ту ревью ит.',
  },
  {
    id: 'dlg-adv-3',
    title: 'Accident Report',
    titleKey: 'dialogue.titles.accidentReport',
    difficulty: 'advanced',
    category: 'emergency',
    dialogueText: "Officer, I need to file an accident report. I was traveling eastbound on Highway forty when another vehicle merged into my lane without signaling. I attempted to brake but couldn't avoid contact. There are no injuries, but there's damage to both vehicles. I have dash cam footage of the incident. My insurance information is available. What's the next step in the reporting process?",
    translation: 'Офицер, мне нужно подать отчёт о происшествии. Я ехал на восток по Шоссе сорок, когда другой автомобиль перестроился в мою полосу без сигнала. Я попытался затормозить, но не смог избежать контакта. Травм нет, но есть повреждения обоих транспортных средств. У меня есть запись с видеорегистратора инцидента. Моя страховая информация доступна. Какой следующий шаг в процессе подачи отчёта?',
    transcription: 'Офисер, ай нид ту файл эн эксидент рипорт. Ай уоз трэвэлинг истбаунд он Хайуэй форти уэн эназер вихикл мёрджд инту май лэйн уизаут сигнэлинг. Ай этемптид ту брейк бат куднт эвойд контэкт. Зэр ар ноу инджэриз, бат зэрз дэмидж ту боус вихиклз. Ай хэв дэш кэм футидж оф зи инсидент. Май иншурэнс инфомейшн из эвэйлэбл. Уотс зэ некст степ ин зэ рипортинг процес?',
  },
  {
    id: 'dlg-adv-4',
    title: 'Contract Negotiation',
    titleKey: 'dialogue.titles.contractNegotiation',
    difficulty: 'advanced',
    category: 'business',
    dialogueText: "I appreciate the offer, but I need to discuss the rate. Given the distance, current fuel prices, and the fact that this is a time-sensitive delivery, I believe a higher rate would be more appropriate. My usual rate for this type of haul is significantly more. Additionally, I'd need confirmation about detention pay and any potential layover compensation. Can we negotiate these terms?",
    translation: 'Я ценю предложение, но мне нужно обсудить ставку. Учитывая расстояние, текущие цены на топливо и тот факт, что это срочная доставка, я считаю, что более высокая ставка была бы более подходящей. Моя обычная ставка для такого типа перевозки значительно выше. Кроме того, мне нужно подтверждение об оплате за простой и любую потенциальную компенсацию за задержку. Можем ли мы обсудить эти условия?',
    transcription: 'Ай эпришиэйт зи офер, бат ай нид ту дискас зэ рэйт. Гивен зэ дистэнс, карэнт фьюэл прайсиз, энд зэ фэкт зэт зис из э тайм-сенситив дэливэри, ай билив э хайэр рэйт вуд би мор эпроприэйт. Май южуал рэйт фор зис тайп оф хол из сигнификэнтли мор. Эдишнэли, айд нид конфёрмейшн эбаут дитеншн пэй энд эни потеншл лэйоувер компенсейшн. Кэн уи нигоушиэйт зиз тёрмз?',
  },
];

export const getDialoguesByDifficulty = (difficulty: DialogueDifficulty): DialogueText[] => {
  return dialogueTexts.filter(dialogue => dialogue.difficulty === difficulty);
};

export const getDialogueById = (id: string): DialogueText | undefined => {
  return dialogueTexts.find(dialogue => dialogue.id === id);
};