import { Fuel, Scale, ShieldAlert, MapPin, Wrench, Coffee, CreditCard, CheckCircle, Clock, AlertTriangle, XCircle, ThumbsUp } from "lucide-react";
import gasStationImage from "@/assets/scenarios/gas-station-conversation.jpg";
import weighStationImage from "@/assets/scenarios/weigh-station-conversation.jpg";
import policeImage from "@/assets/scenarios/police-conversation.jpg";
import borderImage from "@/assets/scenarios/border-conversation.jpg";

export interface Word {
  text: string;
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
          { text: "Fill", icon: Fuel },
          { text: "up", icon: Fuel },
          { text: "diesel", icon: Fuel },
          { text: "please", icon: ThumbsUp }
        ],
        distractorWords: [
          { text: "gasoline", icon: Fuel },
          { text: "empty", icon: XCircle }
        ]
      },
      {
        id: "restroom-location",
        targetPhrase: [
          { text: "Where", icon: MapPin },
          { text: "is", icon: MapPin },
          { text: "the", icon: MapPin },
          { text: "restroom", icon: Coffee }
        ],
        distractorWords: [
          { text: "truck", icon: Wrench },
          { text: "parking", icon: MapPin }
        ]
      },
      {
        id: "credit-card-payment",
        targetPhrase: [
          { text: "Can", icon: CheckCircle },
          { text: "I", icon: CheckCircle },
          { text: "pay", icon: CreditCard },
          { text: "by", icon: CreditCard },
          { text: "card", icon: CreditCard }
        ],
        distractorWords: [
          { text: "cash", icon: CreditCard },
          { text: "receipt", icon: CheckCircle }
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
          { text: "My", icon: CheckCircle },
          { text: "paperwork", icon: CheckCircle },
          { text: "is", icon: CheckCircle },
          { text: "ready", icon: CheckCircle }
        ],
        distractorWords: [
          { text: "missing", icon: XCircle },
          { text: "weight", icon: Scale }
        ]
      },
      {
        id: "weight-limit",
        targetPhrase: [
          { text: "What", icon: Scale },
          { text: "is", icon: Scale },
          { text: "the", icon: Scale },
          { text: "weight", icon: Scale },
          { text: "limit", icon: AlertTriangle }
        ],
        distractorWords: [
          { text: "height", icon: AlertTriangle },
          { text: "speed", icon: Clock }
        ]
      },
      {
        id: "inspection-time",
        targetPhrase: [
          { text: "How", icon: Clock },
          { text: "long", icon: Clock },
          { text: "will", icon: Clock },
          { text: "this", icon: Clock },
          { text: "take", icon: Clock }
        ],
        distractorWords: [
          { text: "much", icon: CreditCard },
          { text: "cost", icon: CreditCard }
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
          { text: "Here", icon: CheckCircle },
          { text: "is", icon: CheckCircle },
          { text: "my", icon: CheckCircle },
          { text: "license", icon: CheckCircle }
        ],
        distractorWords: [
          { text: "passport", icon: CheckCircle },
          { text: "ticket", icon: XCircle }
        ]
      },
      {
        id: "problem-question",
        targetPhrase: [
          { text: "Is", icon: AlertTriangle },
          { text: "there", icon: AlertTriangle },
          { text: "a", icon: AlertTriangle },
          { text: "problem", icon: AlertTriangle }
        ],
        distractorWords: [
          { text: "fine", icon: CreditCard },
          { text: "speeding", icon: Clock }
        ]
      },
      {
        id: "understand",
        targetPhrase: [
          { text: "I", icon: CheckCircle },
          { text: "understand", icon: CheckCircle }
        ],
        distractorWords: [
          { text: "sorry", icon: ThumbsUp },
          { text: "explain", icon: AlertTriangle },
          { text: "slowly", icon: Clock }
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
          { text: "I", icon: CheckCircle },
          { text: "am", icon: CheckCircle },
          { text: "carrying", icon: CheckCircle },
          { text: "electronics", icon: CheckCircle }
        ],
        distractorWords: [
          { text: "food", icon: Coffee },
          { text: "weapons", icon: XCircle }
        ]
      },
      {
        id: "destination",
        targetPhrase: [
          { text: "My", icon: MapPin },
          { text: "destination", icon: MapPin },
          { text: "is", icon: MapPin },
          { text: "Chicago", icon: MapPin }
        ],
        distractorWords: [
          { text: "origin", icon: MapPin },
          { text: "route", icon: MapPin }
        ]
      },
      {
        id: "documents-complete",
        targetPhrase: [
          { text: "All", icon: CheckCircle },
          { text: "my", icon: CheckCircle },
          { text: "documents", icon: CheckCircle },
          { text: "are", icon: CheckCircle },
          { text: "complete", icon: CheckCircle }
        ],
        distractorWords: [
          { text: "missing", icon: XCircle },
          { text: "expired", icon: AlertTriangle }
        ]
      }
    ]
  }
];
