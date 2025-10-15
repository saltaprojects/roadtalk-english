import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mic } from "lucide-react";
import { ConversationChat } from "@/components/ConversationChat";
import { DialogueReading } from "@/components/DialogueReading";
import type { DialogueDifficulty } from "@/data/dialogueTexts";
import policeImage from "@/assets/scenarios/police-conversation.jpg";
import gasStationImage from "@/assets/scenarios/gas-station-conversation.jpg";
import dispatcherImage from "@/assets/scenarios/dispatcher-conversation.jpg";
import borderImage from "@/assets/scenarios/border-conversation.jpg";
import weighStationImage from "@/assets/scenarios/weigh-station-conversation.jpg";
import deliveryImage from "@/assets/scenarios/delivery-conversation.jpg";
import restaurantImage from "@/assets/scenarios/restaurant-conversation.jpg";
import facilitiesImage from "@/assets/scenarios/facilities-conversation.jpg";
import hotelImage from "@/assets/scenarios/hotel-conversation.jpg";
import mechanicImage from "@/assets/scenarios/mechanic-conversation.jpg";
import loadingProblemImage from "@/assets/scenarios/loading-problem-conversation.jpg";
import parkingImage from "@/assets/scenarios/parking-conversation.jpg";
import accidentImage from "@/assets/scenarios/accident-conversation.jpg";
import cbRadioImage from "@/assets/scenarios/cb-radio-conversation.jpg";
import contractImage from "@/assets/scenarios/contract-conversation.jpg";

type Scenario = {
  id: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
  difficultyKey: string;
  image: string;
};

const scenarios: Scenario[] = [
  // Beginner
  { id: "gasStation", icon: "⛽", titleKey: "practice.scenarios.gasStation.title", descriptionKey: "practice.scenarios.gasStation.description", difficultyKey: "practice.scenarios.gasStation.difficulty", image: gasStationImage },
  { id: "restaurant", icon: "🍽️", titleKey: "practice.scenarios.restaurant.title", descriptionKey: "practice.scenarios.restaurant.description", difficultyKey: "practice.scenarios.restaurant.difficulty", image: restaurantImage },
  { id: "facilities", icon: "🚿", titleKey: "practice.scenarios.facilities.title", descriptionKey: "practice.scenarios.facilities.description", difficultyKey: "practice.scenarios.facilities.difficulty", image: facilitiesImage },
  { id: "hotel", icon: "🏨", titleKey: "practice.scenarios.hotel.title", descriptionKey: "practice.scenarios.hotel.description", difficultyKey: "practice.scenarios.hotel.difficulty", image: hotelImage },
  
  // Intermediate
  { id: "dispatcher", icon: "📞", titleKey: "practice.scenarios.dispatcher.title", descriptionKey: "practice.scenarios.dispatcher.description", difficultyKey: "practice.scenarios.dispatcher.difficulty", image: dispatcherImage },
  { id: "delivery", icon: "📦", titleKey: "practice.scenarios.delivery.title", descriptionKey: "practice.scenarios.delivery.description", difficultyKey: "practice.scenarios.delivery.difficulty", image: deliveryImage },
  { id: "police", icon: "🚔", titleKey: "practice.scenarios.police.title", descriptionKey: "practice.scenarios.police.description", difficultyKey: "practice.scenarios.police.difficulty", image: policeImage },
  { id: "mechanic", icon: "🔧", titleKey: "practice.scenarios.mechanic.title", descriptionKey: "practice.scenarios.mechanic.description", difficultyKey: "practice.scenarios.mechanic.difficulty", image: mechanicImage },
  { id: "loadingProblem", icon: "⚠️", titleKey: "practice.scenarios.loadingProblem.title", descriptionKey: "practice.scenarios.loadingProblem.description", difficultyKey: "practice.scenarios.loadingProblem.difficulty", image: loadingProblemImage },
  { id: "parking", icon: "🅿️", titleKey: "practice.scenarios.parking.title", descriptionKey: "practice.scenarios.parking.description", difficultyKey: "practice.scenarios.parking.difficulty", image: parkingImage },
  
  // Professional
  { id: "weighStation", icon: "⚖️", titleKey: "practice.scenarios.weighStation.title", descriptionKey: "practice.scenarios.weighStation.description", difficultyKey: "practice.scenarios.weighStation.difficulty", image: weighStationImage },
  { id: "border", icon: "🛂", titleKey: "practice.scenarios.border.title", descriptionKey: "practice.scenarios.border.description", difficultyKey: "practice.scenarios.border.difficulty", image: borderImage },
  { id: "accident", icon: "🚨", titleKey: "practice.scenarios.accident.title", descriptionKey: "practice.scenarios.accident.description", difficultyKey: "practice.scenarios.accident.difficulty", image: accidentImage },
  { id: "cbRadio", icon: "📻", titleKey: "practice.scenarios.cbRadio.title", descriptionKey: "practice.scenarios.cbRadio.description", difficultyKey: "practice.scenarios.cbRadio.difficulty", image: cbRadioImage },
  { id: "contract", icon: "📋", titleKey: "practice.scenarios.contract.title", descriptionKey: "practice.scenarios.contract.description", difficultyKey: "practice.scenarios.contract.difficulty", image: contractImage },
  { id: "iceOfficer", icon: "🛂", titleKey: "practice.scenarios.iceOfficer.title", descriptionKey: "practice.scenarios.iceOfficer.description", difficultyKey: "practice.scenarios.iceOfficer.difficulty", image: borderImage },
];

const Practice = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [selectedReadingDifficulty, setSelectedReadingDifficulty] = useState<DialogueDifficulty | null>(null);

  // Group scenarios by difficulty
  const beginnerScenarios = scenarios.filter(s => t(s.difficultyKey) === t("practice.scenarios.gasStation.difficulty"));
  const intermediateScenarios = scenarios.filter(s => t(s.difficultyKey) === t("practice.scenarios.police.difficulty"));
  const professionalScenarios = scenarios.filter(s => t(s.difficultyKey) === t("practice.scenarios.border.difficulty"));

  if (selectedReadingDifficulty) {
    return (
      <DialogueReading
        difficulty={selectedReadingDifficulty}
        onBack={() => setSelectedReadingDifficulty(null)}
      />
    );
  }

  if (selectedScenario) {
    return (
      <ConversationChat
        scenario={selectedScenario.id}
        scenarioTitle={t(selectedScenario.titleKey)}
        scenarioDescription={t(selectedScenario.descriptionKey)}
        difficulty={t(selectedScenario.difficultyKey)}
        onEnd={() => setSelectedScenario(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-6">
      <div className="container mx-auto max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("contact.back")}
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{t("practice.title")}</h1>
          <p className="text-muted-foreground text-lg">{t("practice.subtitle")}</p>
        </div>

        {/* Dialogue Reading Practice */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2">{t("dialogue.title")}</h2>
            <p className="text-muted-foreground">{t("dialogue.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card 
              className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer" 
              onClick={() => setSelectedReadingDifficulty('beginner')}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="default" className="text-lg px-3 py-1">
                    {t('dialogue.difficulty.beginner')}
                  </Badge>
                </CardTitle>
                <CardDescription>{t('dialogue.beginnerDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{t('dialogue.readFullTexts')}</p>
              </CardContent>
            </Card>

            <Card 
              className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer" 
              onClick={() => setSelectedReadingDifficulty('intermediate')}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {t('dialogue.difficulty.intermediate')}
                  </Badge>
                </CardTitle>
                <CardDescription>{t('dialogue.intermediateDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{t('dialogue.readFullTexts')}</p>
              </CardContent>
            </Card>

            <Card 
              className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer" 
              onClick={() => setSelectedReadingDifficulty('advanced')}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="destructive" className="text-lg px-3 py-1">
                    {t('dialogue.difficulty.advanced')}
                  </Badge>
                </CardTitle>
                <CardDescription>{t('dialogue.advancedDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{t('dialogue.readFullTexts')}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Beginner Level */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2">{t("practice.levels.beginner.title")}</h2>
            <p className="text-muted-foreground">{t("practice.levels.beginner.description")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beginnerScenarios.map((scenario) => (
              <Card key={scenario.id} className="hover:shadow-lg transition-all hover:scale-105 overflow-hidden cursor-pointer" onClick={() => setSelectedScenario(scenario)}>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={scenario.image} 
                    alt={t(scenario.titleKey)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-4xl">{scenario.icon}</div>
                </div>
                <CardHeader>
                  <CardTitle>{t(scenario.titleKey)}</CardTitle>
                  <CardDescription>{t(scenario.descriptionKey)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{t(scenario.difficultyKey)}</Badge>
                    <Button>
                      {t("practice.chat.startConversation")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Intermediate Level */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2">{t("practice.levels.intermediate.title")}</h2>
            <p className="text-muted-foreground">{t("practice.levels.intermediate.description")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {intermediateScenarios.map((scenario) => (
              <Card key={scenario.id} className="hover:shadow-lg transition-all hover:scale-105 overflow-hidden cursor-pointer" onClick={() => setSelectedScenario(scenario)}>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={scenario.image} 
                    alt={t(scenario.titleKey)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-4xl">{scenario.icon}</div>
                </div>
                <CardHeader>
                  <CardTitle>{t(scenario.titleKey)}</CardTitle>
                  <CardDescription>{t(scenario.descriptionKey)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{t(scenario.difficultyKey)}</Badge>
                    <Button>
                      {t("practice.chat.startConversation")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Professional Level */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2">{t("practice.levels.professional.title")}</h2>
            <p className="text-muted-foreground">{t("practice.levels.professional.description")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionalScenarios.map((scenario) => (
              <Card key={scenario.id} className="hover:shadow-lg transition-all hover:scale-105 overflow-hidden cursor-pointer" onClick={() => setSelectedScenario(scenario)}>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={scenario.image} 
                    alt={t(scenario.titleKey)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-4xl">{scenario.icon}</div>
                </div>
                <CardHeader>
                  <CardTitle>{t(scenario.titleKey)}</CardTitle>
                  <CardDescription>{t(scenario.descriptionKey)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{t(scenario.difficultyKey)}</Badge>
                    <Button>
                      {t("practice.chat.startConversation")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;
