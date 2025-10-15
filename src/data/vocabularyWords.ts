import { Fuel, Scale, ShieldAlert, MapPin, Wrench, Coffee, CreditCard, CheckCircle, Clock, AlertTriangle, XCircle, ThumbsUp } from "lucide-react";
import gasStationImage from "@/assets/scenarios/gas-station-conversation.jpg";
import weighStationImage from "@/assets/scenarios/weigh-station-conversation.jpg";
import policeImage from "@/assets/scenarios/police-conversation.jpg";
import borderImage from "@/assets/scenarios/border-conversation.jpg";

export interface Word {
  text: string;
  russian: string;
  icon: any;
}

export interface Phrase {
  id: string;
  targetPhrase: Word[];
  distractorWords: Word[];
  image?: string;
}

export interface Scenario {
  id: string;
  title: string;
  titleKey: string;
  image: string;
  phrases: Phrase[];
}

export const vocabularyScenarios: Scenario[] = [
  {
    id: "gas-station",
    title: "Gas Station",
    titleKey: "vocabulary.scenarios.gasStation",
    image: gasStationImage,
    phrases: [
      {
        id: "fill-up-diesel",
        targetPhrase: [
          { text: "Fill", russian: "Заполнить", icon: Fuel },
          { text: "up", russian: "до конца", icon: Fuel },
          { text: "diesel", russian: "дизель", icon: Fuel },
          { text: "please", russian: "пожалуйста", icon: ThumbsUp }
        ],
        distractorWords: [
          { text: "gasoline", russian: "бензин", icon: Fuel },
          { text: "empty", russian: "пусто", icon: XCircle }
        ]
      },
      {
        id: "restroom-location",
        targetPhrase: [
          { text: "Where", russian: "Где", icon: MapPin },
          { text: "is", russian: "есть", icon: MapPin },
          { text: "the", russian: "", icon: MapPin },
          { text: "restroom", russian: "туалет", icon: Coffee }
        ],
        distractorWords: [
          { text: "truck", russian: "грузовик", icon: Wrench },
          { text: "parking", russian: "парковка", icon: MapPin }
        ]
      },
      {
        id: "credit-card-payment",
        targetPhrase: [
          { text: "Can", russian: "Могу", icon: CheckCircle },
          { text: "I", russian: "я", icon: CheckCircle },
          { text: "pay", russian: "оплатить", icon: CreditCard },
          { text: "by", russian: "", icon: CreditCard },
          { text: "card", russian: "картой", icon: CreditCard }
        ],
        distractorWords: [
          { text: "cash", russian: "наличные", icon: CreditCard },
          { text: "receipt", russian: "чек", icon: CheckCircle }
        ]
      }
    ]
  },
  {
    id: "weigh-station",
    title: "Weigh Station",
    titleKey: "vocabulary.scenarios.weighStation",
    image: weighStationImage,
    phrases: [
      {
        id: "paperwork-ready",
        targetPhrase: [
          { text: "My", russian: "Мои", icon: CheckCircle },
          { text: "paperwork", russian: "документы", icon: CheckCircle },
          { text: "is", russian: "", icon: CheckCircle },
          { text: "ready", russian: "готовы", icon: CheckCircle }
        ],
        distractorWords: [
          { text: "missing", russian: "отсутствуют", icon: XCircle },
          { text: "weight", russian: "вес", icon: Scale }
        ]
      },
      {
        id: "weight-limit",
        targetPhrase: [
          { text: "What", russian: "Какой", icon: Scale },
          { text: "is", russian: "", icon: Scale },
          { text: "the", russian: "", icon: Scale },
          { text: "weight", russian: "весовой", icon: Scale },
          { text: "limit", russian: "лимит", icon: AlertTriangle }
        ],
        distractorWords: [
          { text: "height", russian: "высота", icon: AlertTriangle },
          { text: "speed", russian: "скорость", icon: Clock }
        ]
      },
      {
        id: "inspection-time",
        targetPhrase: [
          { text: "How", russian: "Как", icon: Clock },
          { text: "long", russian: "долго", icon: Clock },
          { text: "will", russian: "", icon: Clock },
          { text: "this", russian: "это", icon: Clock },
          { text: "take", russian: "займет", icon: Clock }
        ],
        distractorWords: [
          { text: "much", russian: "много", icon: CreditCard },
          { text: "cost", russian: "стоит", icon: CreditCard }
        ]
      }
    ]
  },
  {
    id: "police-stop",
    title: "Police Stop",
    titleKey: "vocabulary.scenarios.policeStop",
    image: policeImage,
    phrases: [
      {
        id: "license-registration",
        targetPhrase: [
          { text: "Here", russian: "Вот", icon: CheckCircle },
          { text: "is", russian: "", icon: CheckCircle },
          { text: "my", russian: "моя", icon: CheckCircle },
          { text: "license", russian: "лицензия", icon: CheckCircle }
        ],
        distractorWords: [
          { text: "passport", russian: "паспорт", icon: CheckCircle },
          { text: "ticket", russian: "штраф", icon: XCircle }
        ]
      },
      {
        id: "problem-question",
        targetPhrase: [
          { text: "Is", russian: "", icon: AlertTriangle },
          { text: "there", russian: "Есть", icon: AlertTriangle },
          { text: "a", russian: "", icon: AlertTriangle },
          { text: "problem", russian: "проблема", icon: AlertTriangle }
        ],
        distractorWords: [
          { text: "fine", russian: "штраф", icon: CreditCard },
          { text: "speeding", russian: "превышение", icon: Clock }
        ]
      },
      {
        id: "understand",
        targetPhrase: [
          { text: "I", russian: "Я", icon: CheckCircle },
          { text: "understand", russian: "понимаю", icon: CheckCircle }
        ],
        distractorWords: [
          { text: "sorry", russian: "извините", icon: ThumbsUp },
          { text: "explain", russian: "объясните", icon: AlertTriangle },
          { text: "slowly", russian: "медленно", icon: Clock }
        ]
      }
    ]
  },
  {
    id: "border-crossing",
    title: "Border Crossing",
    titleKey: "vocabulary.scenarios.borderCrossing",
    image: borderImage,
    phrases: [
      {
        id: "cargo-declaration",
        targetPhrase: [
          { text: "I", russian: "Я", icon: CheckCircle },
          { text: "am", russian: "", icon: CheckCircle },
          { text: "carrying", russian: "везу", icon: CheckCircle },
          { text: "electronics", russian: "электронику", icon: CheckCircle }
        ],
        distractorWords: [
          { text: "food", russian: "еду", icon: Coffee },
          { text: "weapons", russian: "оружие", icon: XCircle }
        ]
      },
      {
        id: "destination",
        targetPhrase: [
          { text: "My", russian: "Мой", icon: MapPin },
          { text: "destination", russian: "пункт назначения", icon: MapPin },
          { text: "is", russian: "", icon: MapPin },
          { text: "Chicago", russian: "Чикаго", icon: MapPin }
        ],
        distractorWords: [
          { text: "origin", russian: "происхождение", icon: MapPin },
          { text: "route", russian: "маршрут", icon: MapPin }
        ]
      },
      {
        id: "documents-complete",
        targetPhrase: [
          { text: "All", russian: "Все", icon: CheckCircle },
          { text: "my", russian: "мои", icon: CheckCircle },
          { text: "documents", russian: "документы", icon: CheckCircle },
          { text: "are", russian: "", icon: CheckCircle },
          { text: "complete", russian: "в порядке", icon: CheckCircle }
        ],
        distractorWords: [
          { text: "missing", russian: "отсутствуют", icon: XCircle },
          { text: "expired", russian: "просрочены", icon: AlertTriangle }
        ]
      }
    ]
  }
];
