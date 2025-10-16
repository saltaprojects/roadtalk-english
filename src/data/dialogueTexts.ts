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
  wordCount?: number;
  estimatedReadingTime?: string;
  tags?: string[];
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
  {
    id: 'dlg-beg-5',
    title: 'Pre-Trip Inspection',
    titleKey: 'dialogue.titles.preTripInspection',
    difficulty: 'beginner',
    category: 'safety',
    dialogueText: "I'm starting my pre-trip inspection now. First, I check all the lights - headlights, tail lights, and turn signals. Everything looks good. Next, I walk around the truck checking the tires for proper inflation and any damage. The mirrors are clean and adjusted correctly. The brakes are working fine. All fluids are at proper levels. The truck is ready to go!",
    translation: 'Я начинаю предрейсовый осмотр. Сначала я проверяю все огни - фары, задние фонари и поворотники. Всё выглядит хорошо. Затем я обхожу вокруг грузовика, проверяя шины на правильное давление и любые повреждения. Зеркала чистые и правильно отрегулированы. Тормоза работают нормально. Все жидкости на нужном уровне. Грузовик готов к работе!',
    transcription: 'Айм стартинг май при-трип инспекшн нау. Фёрст, ай чек ол зэ лайтс - хэдлайтс, тэйл лайтс, энд тёрн сигнэлз. Эврисинг лукс гуд. Некст, ай уок эраунд зэ трак чекинг зэ тайэрз фор пропер инфлейшн энд эни дэмидж. Зэ мирэрз ар клин энд эджастид корректли. Зэ брейкс ар уоркинг файн. Ол флюидз ар эт пропер левэлз. Зэ трак из рэди ту гоу!',
  },
  {
    id: 'dlg-beg-6',
    title: 'Taking a Rest Break',
    titleKey: 'dialogue.titles.restBreak',
    difficulty: 'beginner',
    category: 'rest',
    dialogueText: "I've been driving for four hours, so it's time for my mandatory rest break. I'm pulling into the rest area now. I need to update my logbook and mark this break time. After I rest for thirty minutes, I'll grab some food and check my route for the next leg of the journey. It's important to stay well-rested and alert on the road.",
    translation: 'Я веду уже четыре часа, так что пора сделать обязательный перерыв. Я заезжаю на место отдыха. Мне нужно обновить мою книжку учёта и отметить время перерыва. После того как я отдохну тридцать минут, я возьму еду и проверю свой маршрут на следующий отрезок пути. Важно оставаться отдохнувшим и внимательным на дороге.',
    transcription: 'Айв бин драйвинг фор фор ауэрз, соу итс тайм фор май мэндэтори рест брейк. Айм пулинг инту зэ рест эриэ нау. Ай нид ту апдейт май логбук энд марк зис брейк тайм. Афтер ай рест фор сёрти минитс, айл грэб сам фуд энд чек май раут фор зэ некст лег оф зэ джёрни. Итс импортант ту стэй уэл-рестид энд элёрт он зэ роуд.',
  },
  {
    id: 'dlg-int-6',
    title: 'Weather Delay Communication',
    titleKey: 'dialogue.titles.weatherDelay',
    difficulty: 'intermediate',
    category: 'communication',
    dialogueText: "Dispatch, this is truck forty-seven calling in. I'm currently on Interstate eighty near mile marker one hundred fifty. There's heavy snow falling and visibility is very poor. The roads are getting icy and dangerous. For safety reasons, I'm pulling over at the next truck stop to wait for conditions to improve. I'll update you in two hours with my status. The delivery may be delayed by three to four hours. I apologize for the inconvenience, but safety comes first.",
    translation: 'Диспетчер, это грузовик сорок семь на связи. Я сейчас на Междуштатной трассе восемьдесят около отметки мили сто пятьдесят. Идёт сильный снег и видимость очень плохая. Дороги становятся обледенелыми и опасными. Из соображений безопасности я останавливаюсь на следующей стоянке для грузовиков, чтобы дождаться улучшения условий. Я обновлю вас через два часа о моём статусе. Доставка может задержаться на три-четыре часа. Прошу прощения за неудобство, но безопасность на первом месте.',
    transcription: 'Диспэч, зис из трак форти-севэн колинг ин. Айм карэнтли он Интерстейт эйти ниэр майл маркер ван хандрэд фифти. Зэрз хэви сноу фолинг энд визибилити из вэри пур. Зэ роудз ар геттинг айси энд дэйнджэрэс. Фор сэйфти ризэнз, айм пулинг оувер эт зэ некст трак стоп ту уэйт фор кондишнз ту импрув. Айл апдейт ю ин ту ауэрз уиз май стэйтэс. Зэ дэливэри мэй би дилэйд бай сри ту фор ауэрз. Ай эполэджайз фор зи инконвиниэнс, бат сэйфти камз фёрст.',
  },
  {
    id: 'dlg-int-7',
    title: 'Tire Problem',
    titleKey: 'dialogue.titles.tireProblem',
    difficulty: 'intermediate',
    category: 'maintenance',
    dialogueText: "I need emergency roadside assistance. I'm on Highway sixty-five southbound near exit thirty-two. I have a flat tire on my trailer, driver's side rear. I've pulled over to a safe location on the shoulder with my hazard lights on. I have the tools to change it myself, but I'd like a professional to check the other tires as well to make sure they're safe. Can you send someone within the hour? My truck number is three-five-seven.",
    translation: 'Мне нужна экстренная помощь на дороге. Я на Шоссе шестьдесят пять в южном направлении около съезда тридцать два. У меня спущенная шина на прицепе, задняя со стороны водителя. Я съехал в безопасное место на обочине с включёнными аварийными огнями. У меня есть инструменты, чтобы поменять её самому, но я бы хотел, чтобы профессионал проверил и другие шины, чтобы убедиться, что они безопасны. Можете прислать кого-то в течение часа? Мой номер грузовика три-пять-семь.',
    transcription: 'Ай нид эмёрдженси роудсайд эсистэнс. Айм он Хайуэй сиксти-файв саусбаунд ниэр эксит сёрти-ту. Ай хэв э флэт тайэр он май трэйлер, драйвэрз сайд риэр. Айв пулд оувер ту э сэйф локейшн он зэ шоулдер уиз май хэзэрд лайтс он. Ай хэв зэ тулз ту чэйндж ит майсэлф, бат айд лайк э профэшнэл ту чек зи азэр тайэрз эз уэл ту мейк шур зэйр сэйф. Кэн ю сенд самуан уизин зи ауэр? Май трак намбер из сри-файв-севэн.',
  },
  {
    id: 'dlg-int-8',
    title: 'Parking Lot Search',
    titleKey: 'dialogue.titles.parkingSearch',
    difficulty: 'intermediate',
    category: 'rest',
    dialogueText: "Excuse me, do you know if there are any available parking spots for overnight? I've been looking for the past hour and every truck stop seems to be full. My hours of service are almost up and I need to find a safe place to park soon. Are there any truck-friendly rest areas or parking lots nearby? I really appreciate any help you can give me. Safety regulations require that I stop driving very soon.",
    translation: 'Извините, вы знаете, есть ли какие-нибудь свободные места для ночной парковки? Я ищу уже последний час, и каждая стоянка для грузовиков кажется заполненной. Мои часы работы почти исчерпаны, и мне нужно скоро найти безопасное место для парковки. Есть ли поблизости места отдыха или парковки, приспособленные для грузовиков? Я очень ценю любую помощь, которую вы можете мне оказать. Правила безопасности требуют, чтобы я очень скоро прекратил вождение.',
    transcription: 'Экскьюз ми, ду ю ноу иф зэр ар эни эвэйлэбл паркинг спотс фор оувернайт? Айв бин лукинг фор зэ паст ауэр энд эври трак стоп симз ту би фул. Май ауэрз оф сёрвис ар олмоуст ап энд ай нид ту файнд э сэйф плэйс ту парк сун. Ар зэр эни трак-фрэндли рест эриэз ор паркинг лотс ниэрбай? Ай рили эпришиэйт эни хэлп ю кэн гив ми. Сэйфти регьюлейшнз рикуайэр зэт ай стоп драйвинг вэри сун.',
  },
  {
    id: 'dlg-adv-5',
    title: 'Load Securement Check',
    titleKey: 'dialogue.titles.loadSecurement',
    difficulty: 'advanced',
    category: 'safety',
    dialogueText: "Before I depart, I need to perform a thorough load securement inspection. I'm checking that all straps are properly tensioned and rated for the weight they're securing. The cargo is distributed evenly to maintain proper weight distribution across all axles. I've verified that there are no loose items that could shift during transport. All tie-down points are secure and meet DOT requirements. The cargo doesn't exceed height restrictions for the routes I'll be traveling. I'm documenting this inspection in my records. Everything is properly secured and ready for safe transport.",
    translation: 'Перед отправлением мне нужно провести тщательный осмотр крепления груза. Я проверяю, что все ремни правильно натянуты и рассчитаны на вес, который они крепят. Груз распределён равномерно, чтобы поддерживать правильное распределение веса по всем осям. Я проверил, что нет незакреплённых предметов, которые могут сместиться во время транспортировки. Все точки крепления надёжны и соответствуют требованиям DOT. Груз не превышает ограничений по высоте для маршрутов, по которым я буду ехать. Я документирую этот осмотр в своих записях. Всё правильно закреплено и готово к безопасной транспортировке.',
    transcription: 'Бифор ай дипарт, ай нид ту пёрформ э сороу лоуд сикьюрмент инспекшн. Айм чекинг зэт ол стрэпс ар пропэрли теншнд энд рэйтид фор зэ уэйт зэйр сикьюринг. Зэ карго из дистрибьютид ивэнли ту мэйнтэйн пропер уэйт дистрибьюшн экрос ол эксэлз. Айв верифайд зэт зэр ар ноу лус айтемз зэт куд шифт дьюринг трэнспорт. Ол тай-даун пойнтс ар сикьюр энд мит Ди-Оу-Ти рикуайэрментс. Зэ карго дазнт иксид хайт рестрикшнз фор зэ раутс айл би трэвэлинг. Айм докьюментинг зис инспекшн ин май рекордз. Эврисинг из пропэрли сикьюрд энд рэди фор сэйф трэнспорт.',
  },
  {
    id: 'dlg-adv-6',
    title: 'Route Planning Discussion',
    titleKey: 'dialogue.titles.routePlanning',
    difficulty: 'advanced',
    category: 'navigation',
    dialogueText: "I've reviewed the delivery schedule and I'd like to discuss the optimal route. The direct route via Interstate ninety has construction delays that could add two hours to the trip. I'm proposing an alternate route using Highway twenty and Interstate seventy-six. While it's twenty miles longer, current traffic data shows it's actually faster. Additionally, this route has better truck stops for my mandatory rest breaks and avoids the low clearance bridge on the original route. The fuel costs will be approximately the same. This alternate route ensures on-time delivery while maintaining safety standards. What are your thoughts on this plan?",
    translation: 'Я просмотрел график доставки и хотел бы обсудить оптимальный маршрут. Прямой маршрут через Междуштатную трассу девяносто имеет задержки из-за строительства, которые могут добавить два часа к поездке. Я предлагаю альтернативный маршрут через Шоссе двадцать и Междуштатную трассу семьдесят шесть. Хотя он на двадцать миль длиннее, текущие данные о трафике показывают, что он на самом деле быстрее. Кроме того, на этом маршруте есть лучшие стоянки для грузовиков для моих обязательных перерывов на отдых, и он позволяет избежать моста с низким просветом на оригинальном маршруте. Расходы на топливо будут примерно такими же. Этот альтернативный маршрут обеспечивает доставку вовремя при соблюдении стандартов безопасности. Что вы думаете об этом плане?',
    transcription: 'Айв ревьюд зэ дэливэри скеджул энд айд лайк ту дискас зи оптимал раут. Зэ директ раут вайэ Интерстейт найнти хэз констракшн дилэйз зэт куд эд ту ауэрз ту зэ трип. Айм пропоузинг эн олтёрнэт раут юзинг Хайуэй твэнти энд Интерстейт севэнти-сикс. Уайл итс твэнти майлз лонгер, карэнт трэфик дэйтэ шоуз ит экчуэли фастер. Эдишнэли, зис раут хэз бетер трак стопс фор май мэндэтори рест брейкс энд эвойдз зэ лоу клирэнс бридж он зи ориджинал раут. Зэ фьюэл костс уил би эпроксимэтли зэ сэйм. Зис олтёрнэт раут эншурз он-тайм дэливэри уайл мэйнтэйнинг сэйфти стэндардз. Уот ар юр сотс он зис плэн?',
  },
];

export const getDialoguesByDifficulty = (difficulty: DialogueDifficulty): DialogueText[] => {
  return dialogueTexts.filter(dialogue => dialogue.difficulty === difficulty);
};

export const getDialogueById = (id: string): DialogueText | undefined => {
  return dialogueTexts.find(dialogue => dialogue.id === id);
};