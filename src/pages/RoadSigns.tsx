import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, XCircle, ChevronRight, RotateCcw, Trophy, AlertTriangle, Ban, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getQuizQuestions } from "@/data/roadSignsQuestions";

type QuizQuestion = {
  id: number;
  signEmoji: string;
  signName: string;
  signCode: string;
  question: string;
  answers: string[];
  correctAnswer: number;
  category: string;
  color: string;
  shape: "octagon" | "triangle" | "circle" | "rectangle" | "diamond" | "pentagon";
  explanation: string;
};

const _quizQuestions: QuizQuestion[] = [
  // REGULATORY SIGNS (Red/White) - 25 signs
  {
    id: 1,
    signEmoji: "STOP",
    signName: "Stop Sign",
    signCode: "R1-1",
    question: "What must you do at this sign?",
    answers: ["Slow down", "Complete stop before line", "Yield only", "Stop if traffic present"],
    correctAnswer: 1,
    category: "Regulatory",
    color: "bg-red-600",
    shape: "octagon",
    explanation: "Must come to complete stop at stop line, crosswalk, or intersection before proceeding."
  },
  {
    id: 2,
    signEmoji: "YIELD",
    signName: "Yield Sign",
    signCode: "R1-2",
    question: "What does this triangular sign require?",
    answers: ["Complete stop", "Speed up", "Slow down and give right of way", "Honk horn"],
    correctAnswer: 2,
    category: "Regulatory",
    color: "bg-red-500",
    shape: "triangle",
    explanation: "Slow down, be prepared to stop, and give right of way to all traffic and pedestrians."
  },
  {
    id: 3,
    signEmoji: "←",
    signName: "Do Not Enter",
    signCode: "R5-1",
    question: "What does this circular sign mean?",
    answers: ["Wrong way", "Road closed", "No trucks", "No parking"],
    correctAnswer: 0,
    category: "Regulatory",
    color: "bg-red-600",
    shape: "circle",
    explanation: "You are going the wrong way. Stop immediately and turn around."
  },
  {
    id: 4,
    signEmoji: "ONE WAY",
    signName: "One Way",
    signCode: "R6-1",
    question: "What does this sign indicate?",
    answers: ["Two-way traffic", "Traffic flows in indicated direction only", "Divided highway", "Road ends"],
    correctAnswer: 1,
    category: "Regulatory",
    color: "bg-slate-800",
    shape: "rectangle",
    explanation: "All traffic must travel in the direction indicated by the arrow."
  },
  {
    id: 5,
    signEmoji: "↻",
    signName: "No U-Turn",
    signCode: "R3-4",
    question: "What maneuver is prohibited?",
    answers: ["Left turn", "Right turn", "U-turn", "Lane change"],
    correctAnswer: 2,
    category: "Regulatory",
    color: "bg-red-500",
    shape: "circle",
    explanation: "U-turns are not permitted at this location."
  },
  {
    id: 6,
    signEmoji: "NO 🚛",
    signName: "No Trucks",
    signCode: "R5-2",
    question: "What does this mean for commercial vehicles?",
    answers: ["Trucks under 5 tons OK", "All trucks prohibited", "Right lane only", "Parking prohibited"],
    correctAnswer: 1,
    category: "Truck-Specific",
    color: "bg-red-500",
    shape: "circle",
    explanation: "All trucks and commercial vehicles are prohibited on this road."
  },
  {
    id: 7,
    signEmoji: "25",
    signName: "Speed Limit 25",
    signCode: "R2-1",
    question: "What is the maximum legal speed?",
    answers: ["25 mph", "30 mph", "25 mph only in rain", "Suggested speed"],
    correctAnswer: 0,
    category: "Regulatory",
    color: "bg-white",
    shape: "rectangle",
    explanation: "Maximum legal speed is 25 mph unless conditions require slower speed."
  },
  {
    id: 8,
    signEmoji: "NO PASSING",
    signName: "No Passing Zone",
    signCode: "R4-1",
    question: "What is prohibited here?",
    answers: ["Changing lanes", "Passing slower vehicles", "Stopping", "Right turns"],
    correctAnswer: 1,
    category: "Regulatory",
    color: "bg-white",
    shape: "pentagon",
    explanation: "Passing other vehicles is prohibited in this zone."
  },
  {
    id: 9,
    signEmoji: "KEEP RIGHT",
    signName: "Keep Right",
    signCode: "R4-7",
    question: "Which side of obstacle must you pass?",
    answers: ["Either side", "Right side", "Left side", "Stop before obstacle"],
    correctAnswer: 1,
    category: "Regulatory",
    color: "bg-white",
    shape: "rectangle",
    explanation: "Traffic must pass on the right side of the obstruction or divider."
  },
  {
    id: 10,
    signEmoji: "WRONG WAY",
    signName: "Wrong Way",
    signCode: "R5-1a",
    question: "What immediate action is required?",
    answers: ["Continue carefully", "Stop and turn around", "Speed up", "Use hazards"],
    correctAnswer: 1,
    category: "Regulatory",
    color: "bg-red-600",
    shape: "rectangle",
    explanation: "You are traveling the wrong direction. Stop safely and turn around immediately."
  },
  {
    id: 11,
    signEmoji: "NO ↶",
    signName: "No Left Turn",
    signCode: "R3-2",
    question: "Which turn is prohibited?",
    answers: ["Right turn", "Left turn", "U-turn", "All turns"],
    correctAnswer: 1,
    category: "Regulatory",
    color: "bg-red-500",
    shape: "circle",
    explanation: "Left turns are not permitted at this intersection."
  },
  {
    id: 12,
    signEmoji: "NO ↷",
    signName: "No Right Turn",
    signCode: "R3-1",
    question: "What turn is not allowed?",
    answers: ["Right turn", "Left turn", "U-turn", "Straight"],
    correctAnswer: 0,
    category: "Regulatory",
    color: "bg-red-500",
    shape: "circle",
    explanation: "Right turns are prohibited at this location."
  },
  {
    id: 13,
    signEmoji: "→",
    signName: "Turn Right Only",
    signCode: "R3-5",
    question: "What movement is required?",
    answers: ["Straight or right", "Right turn only", "Any direction", "Left or straight"],
    correctAnswer: 1,
    category: "Regulatory",
    color: "bg-white",
    shape: "rectangle",
    explanation: "Vehicles in this lane must turn right."
  },
  {
    id: 14,
    signEmoji: "↑",
    signName: "Straight Only",
    signCode: "R3-5a",
    question: "What direction must traffic proceed?",
    answers: ["Straight ahead only", "Turn only", "Any direction", "U-turn allowed"],
    correctAnswer: 0,
    category: "Regulatory",
    color: "bg-white",
    shape: "rectangle",
    explanation: "Vehicles must continue straight. Turns are not permitted."
  },
  {
    id: 15,
    signEmoji: "LANE USE",
    signName: "HOV Lane",
    signCode: "R3-11",
    question: "Who can use HOV lanes during restricted hours?",
    answers: ["All vehicles", "Vehicles with 2+ occupants", "Motorcycles only", "Buses only"],
    correctAnswer: 1,
    category: "Regulatory",
    color: "bg-white",
    shape: "rectangle",
    explanation: "High Occupancy Vehicle lanes restricted to vehicles with specified number of occupants."
  },
  {
    id: 16,
    signEmoji: "YIELD ⇅",
    signName: "Yield to Oncoming Traffic",
    signCode: "R4-2",
    question: "Who has right of way?",
    answers: ["You do", "Oncoming traffic", "Larger vehicles", "Faster vehicles"],
    correctAnswer: 1,
    category: "Regulatory",
    color: "bg-red-500",
    shape: "triangle",
    explanation: "You must yield to oncoming traffic before proceeding."
  },
  {
    id: 17,
    signEmoji: "4-WAY",
    signName: "All Way Stop",
    signCode: "R1-3",
    question: "Who stops at this intersection?",
    answers: ["Main road only", "Side road only", "All directions", "Trucks only"],
    correctAnswer: 2,
    category: "Regulatory",
    color: "bg-white",
    shape: "rectangle",
    explanation: "All approaches to the intersection must stop."
  },
  {
    id: 18,
    signEmoji: "NO 🚴",
    signName: "No Bicycles",
    signCode: "R5-6",
    question: "What vehicles are prohibited?",
    answers: ["Motorcycles", "Bicycles", "Scooters", "All two-wheelers"],
    correctAnswer: 1,
    category: "Regulatory",
    color: "bg-red-500",
    shape: "circle",
    explanation: "Bicycles are not permitted on this roadway."
  },
  {
    id: 19,
    signEmoji: "NO 🚶",
    signName: "No Pedestrians",
    signCode: "R5-10",
    question: "Who cannot use this road?",
    answers: ["Bicycles", "Pedestrians", "Motorcycles", "Trucks"],
    correctAnswer: 1,
    category: "Regulatory",
    color: "bg-red-500",
    shape: "circle",
    explanation: "Pedestrians are prohibited from using this roadway."
  },
  {
    id: 20,
    signEmoji: "45",
    signName: "Speed Limit 45",
    signCode: "R2-1",
    question: "Maximum speed in ideal conditions?",
    answers: ["40 mph", "45 mph", "50 mph", "As posted +10"],
    correctAnswer: 1,
    category: "Regulatory",
    color: "bg-white",
    shape: "rectangle",
    explanation: "45 mph is the maximum legal speed in ideal conditions."
  },
  {
    id: 21,
    signEmoji: "TRUCKS ↓",
    signName: "Trucks Use Right Lane",
    signCode: "R4-5",
    question: "Where must trucks travel?",
    answers: ["Left lane", "Right lane", "Any lane", "Center lane"],
    correctAnswer: 1,
    category: "Truck-Specific",
    color: "bg-white",
    shape: "rectangle",
    explanation: "Trucks must use the right lane except when passing."
  },
  {
    id: 22,
    signEmoji: "⊘ TRUCKS",
    signName: "Trucks Excluded",
    signCode: "R5-4",
    question: "Can commercial vehicles use this road?",
    answers: ["Yes, all trucks", "No commercial vehicles", "Only delivery trucks", "Trucks under 10,000 lbs"],
    correctAnswer: 1,
    category: "Truck-Specific",
    color: "bg-red-500",
    shape: "circle",
    explanation: "All commercial vehicles are prohibited from this route."
  },
  {
    id: 23,
    signEmoji: "SLOWER →",
    signName: "Slower Traffic Keep Right",
    signCode: "R4-3",
    question: "Which lane for slower vehicles?",
    answers: ["Left lane", "Right lane", "Any lane", "Middle lane"],
    correctAnswer: 1,
    category: "Regulatory",
    color: "bg-white",
    shape: "rectangle",
    explanation: "Slower moving vehicles must use the right lane."
  },
  {
    id: 24,
    signEmoji: "LANE ⊗",
    signName: "Lane Closed",
    signCode: "R4-11",
    question: "What does red X mean?",
    answers: ["Slow down", "Lane closed - do not enter", "Caution", "Turn signal on"],
    correctAnswer: 1,
    category: "Regulatory",
    color: "bg-red-600",
    shape: "rectangle",
    explanation: "Red X means lane is closed. Do not enter or remain in this lane."
  },
  {
    id: 25,
    signEmoji: "TURN ↷",
    signName: "Right Turn Only",
    signCode: "R3-5",
    question: "From this lane, what movement is allowed?",
    answers: ["Straight only", "Right turn only", "Left turn only", "U-turn"],
    correctAnswer: 1,
    category: "Regulatory",
    color: "bg-white",
    shape: "rectangle",
    explanation: "Vehicles in this lane must turn right."
  },

  // WARNING SIGNS (Yellow Diamond) - 40 signs
  {
    id: 26,
    signEmoji: "⬇ 7%",
    signName: "Steep Downgrade",
    signCode: "W7-1",
    question: "How should trucks descend steep grades?",
    answers: ["Use brakes heavily", "Use lower gear", "Speed up", "Coast in neutral"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Shift to lower gear before descent to control speed and avoid brake overheating."
  },
  {
    id: 27,
    signEmoji: "↷",
    signName: "Sharp Right Curve",
    signCode: "W1-2",
    question: "When should you slow down?",
    answers: ["In the curve", "Before the curve", "After the curve", "Never"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Reduce speed before entering curve. Trucks can rollover if curves taken too fast."
  },
  {
    id: 28,
    signEmoji: "S",
    signName: "Winding Road",
    signCode: "W1-5",
    question: "What should truck drivers expect?",
    answers: ["Straight road", "Series of curves ahead", "Steep grade", "Narrow bridge"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Multiple curves ahead. Reduce speed and stay alert."
  },
  {
    id: 29,
    signEmoji: "⊤",
    signName: "T-Intersection",
    signCode: "W2-4",
    question: "What does this warn of?",
    answers: ["Crossroad", "Road ends ahead, must turn", "Railroad", "Bridge"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Road ends ahead. You must turn left or right."
  },
  {
    id: 30,
    signEmoji: "Y",
    signName: "Y-Intersection",
    signCode: "W2-5",
    question: "What type of intersection ahead?",
    answers: ["Four-way", "Three-way Y-shaped", "Roundabout", "T-intersection"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Y-shaped intersection ahead where road splits."
  },
  {
    id: 31,
    signEmoji: "⊕",
    signName: "Cross Road",
    signCode: "W2-1",
    question: "What should you watch for?",
    answers: ["Sharp curve", "Crossing traffic from sides", "Dead end", "One way"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Intersection ahead. Watch for cross traffic."
  },
  {
    id: 32,
    signEmoji: "T ←",
    signName: "Side Road",
    signCode: "W2-2",
    question: "What does this indicate?",
    answers: ["Road ends", "Side road enters from right", "Sharp turn", "Divided highway"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Side road enters from the direction shown."
  },
  {
    id: 33,
    signEmoji: "⟲",
    signName: "Reverse Curve Right Then Left",
    signCode: "W1-4",
    question: "What road condition ahead?",
    answers: ["Single curve", "Two curves in opposite directions", "Straight road", "Hill"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Two curves in opposite directions. First right, then left."
  },
  {
    id: 34,
    signEmoji: "⟳",
    signName: "Reverse Curve Left Then Right",
    signCode: "W1-4",
    question: "Curves in what directions?",
    answers: ["Both right", "Left then right", "Both left", "No curves"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Two curves ahead. First left, then right."
  },
  {
    id: 35,
    signEmoji: "⤒",
    signName: "Hairpin Curve",
    signCode: "W1-11",
    question: "What type of curve is ahead?",
    answers: ["Gentle curve", "Very sharp 180° turn", "S-curve", "Slight bend"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Extremely sharp curve ahead. Reduce speed significantly."
  },
  {
    id: 36,
    signEmoji: "⟲⟲",
    signName: "Winding Road",
    signCode: "W1-5",
    question: "How should large trucks approach?",
    answers: ["Maintain speed", "Reduce speed for multiple curves", "Speed up", "Use hazards"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Series of curves ahead. Reduce speed and proceed carefully."
  },
  {
    id: 37,
    signEmoji: "⤡",
    signName: "Large Arrow",
    signCode: "W1-6",
    question: "What does large arrow indicate?",
    answers: ["Suggested direction", "Sharp change in direction", "Highway number", "Exit"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "rectangle",
    explanation: "Sharp change in direction of roadway ahead."
  },
  {
    id: 38,
    signEmoji: "🏁",
    signName: "Chevron Alignment",
    signCode: "W1-8",
    question: "What do chevrons mark?",
    answers: ["Speed limit", "Sharp curve alignment", "Passing zone", "School zone"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "rectangle",
    explanation: "Marks sharp change in direction of roadway."
  },
  {
    id: 39,
    signEmoji: "⇉",
    signName: "Divided Highway Begins",
    signCode: "W6-1",
    question: "What road change is ahead?",
    answers: ["Road narrows", "Divided highway with median begins", "Road ends", "One way"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Highway ahead is divided by median or barrier."
  },
  {
    id: 40,
    signEmoji: "⇇",
    signName: "Divided Highway Ends",
    signCode: "W6-2",
    question: "What should you expect?",
    answers: ["Median continues", "Two-way traffic ahead", "Road widens", "Highway ends"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Divided highway ends. Two-way traffic ahead on undivided road."
  },
  {
    id: 41,
    signEmoji: "⊳ ⊲",
    signName: "Two-Way Traffic",
    signCode: "W6-3",
    question: "What traffic pattern ahead?",
    answers: ["One way", "Two-way traffic", "Divided highway", "No traffic"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Two-way traffic ahead. Watch for oncoming vehicles."
  },
  {
    id: 42,
    signEmoji: "⟙",
    signName: "Added Lane",
    signCode: "W4-3",
    question: "What is happening to roadway?",
    answers: ["Lane ends", "New lane being added", "Road narrows", "Construction"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Additional lane being added to roadway."
  },
  {
    id: 43,
    signEmoji: "⟙",
    signName: "Right Lane Ends",
    signCode: "W4-2",
    question: "Which lane is ending?",
    answers: ["Left lane", "Right lane", "Center lane", "All lanes"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Right lane ends ahead. Merge left."
  },
  {
    id: 44,
    signEmoji: "⟙",
    signName: "Merge",
    signCode: "W4-1",
    question: "What traffic movement occurs?",
    answers: ["Traffic separates", "Traffic merges from side", "U-turn ahead", "Stop ahead"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Traffic entering from side. Be prepared to adjust speed."
  },
  {
    id: 45,
    signEmoji: "⊗",
    signName: "Road Narrows",
    signCode: "W5-1",
    question: "What change to roadway?",
    answers: ["Road widens", "Road narrows - both sides", "New lane added", "Divided highway"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Road narrows ahead from both sides."
  },
  {
    id: 46,
    signEmoji: "⟨",
    signName: "Narrow Bridge",
    signCode: "W5-2",
    question: "What should trucks watch for?",
    answers: ["Wide bridge", "Bridge narrower than road", "High bridge", "Steep bridge"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Bridge ahead is narrower than roadway. Reduce speed."
  },
  {
    id: 47,
    signEmoji: "⟩",
    signName: "One Lane Bridge",
    signCode: "W5-3",
    question: "How many lanes on bridge?",
    answers: ["Two lanes", "One lane only", "Three lanes", "No lanes"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Bridge ahead accommodates only one lane of traffic."
  },
  {
    id: 48,
    signEmoji: "☌",
    signName: "Bicycle Crossing",
    signCode: "W11-1",
    question: "What should drivers watch for?",
    answers: ["Pedestrians", "Bicycles crossing", "Animals", "Motorcycles"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Bicycle crossing ahead. Watch for cyclists."
  },
  {
    id: 49,
    signEmoji: "🚶",
    signName: "Pedestrian Crossing",
    signCode: "W11-2",
    question: "Who might be crossing?",
    answers: ["Bicycles", "Pedestrians", "Animals", "Vehicles"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Pedestrian crossing ahead. Yield to pedestrians."
  },
  {
    id: 50,
    signEmoji: "🦌",
    signName: "Deer Crossing",
    signCode: "W11-3",
    question: "When are deer most active?",
    answers: ["Midday", "Dawn and dusk", "Only winter", "Never"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Deer crossing area. Most active at dawn and dusk. Reduce speed."
  },
  {
    id: 51,
    signEmoji: "🐄",
    signName: "Cattle Crossing",
    signCode: "W11-4",
    question: "What animals might be present?",
    answers: ["Deer", "Cattle/livestock", "Horses only", "Wild animals"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Cattle or livestock may be on or crossing the roadway."
  },
  {
    id: 52,
    signEmoji: "⚐",
    signName: "School Zone",
    signCode: "S1-1",
    question: "What should drivers do in school zones?",
    answers: ["Speed up", "Reduce speed, watch for children", "Honk horn", "Use high beams"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "pentagon",
    explanation: "School zone ahead. Reduce speed and watch for children."
  },
  {
    id: 53,
    signEmoji: "🚸",
    signName: "School Crossing",
    signCode: "S1-1",
    question: "What must drivers do at school crossing?",
    answers: ["Speed up", "Stop for crossing children", "Honk at children", "Avoid area"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "pentagon",
    explanation: "School crossing. Stop for pedestrians in crosswalk."
  },
  {
    id: 54,
    signEmoji: "✕",
    signName: "Railroad Crossing",
    signCode: "W10-1",
    question: "What must you do at railroad crossing?",
    answers: ["Speed up", "Stop, look, listen before crossing", "Honk horn", "Flash lights"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "circle",
    explanation: "Railroad crossing ahead. Stop if train approaching."
  },
  {
    id: 55,
    signEmoji: "⚠ RR",
    signName: "Railroad Advance Warning",
    signCode: "W10-1",
    question: "What is ahead?",
    answers: ["Bridge", "Railroad crossing", "Intersection", "School"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "circle",
    explanation: "Railroad crossing ahead. Be prepared to stop."
  },
  {
    id: 56,
    signEmoji: "∩",
    signName: "Bump",
    signCode: "W8-1",
    question: "Why reduce speed for bumps?",
    answers: ["No reason", "Can shift cargo and damage truck", "Save fuel", "Avoid tickets"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Reduce speed. Bumps can shift cargo, damage suspension, or cause loss of control."
  },
  {
    id: 57,
    signEmoji: "∪",
    signName: "Dip",
    signCode: "W8-2",
    question: "What road condition ahead?",
    answers: ["Hill", "Low spot in road", "Bridge", "Curve"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Dip or low spot in roadway ahead."
  },
  {
    id: 58,
    signEmoji: "🌊",
    signName: "Slippery When Wet",
    signCode: "W8-5",
    question: "When is road most slippery?",
    answers: ["Always", "When wet or icy", "When dry", "At night"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Road becomes slippery in wet or icy conditions. Reduce speed."
  },
  {
    id: 59,
    signEmoji: "🌉",
    signName: "Bridge Ices Before Road",
    signCode: "W8-13",
    question: "Why do bridges ice first?",
    answers: ["They don't", "Cold air on both sides", "Salt doesn't work", "Higher elevation"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Bridges freeze before road surfaces due to cold air exposure on all sides."
  },
  {
    id: 60,
    signEmoji: "💨",
    signName: "Wind Advisory",
    signCode: "W8-15",
    question: "Why are high winds dangerous for trucks?",
    answers: ["Not dangerous", "Can cause trucks to tip over", "Only affects small vehicles", "Improves fuel economy"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "High winds can cause high-profile vehicles like trucks to tip over."
  },
  {
    id: 61,
    signEmoji: "🚧",
    signName: "Road Work Ahead",
    signCode: "W20-1",
    question: "What should drivers do?",
    answers: ["Speed up", "Reduce speed, watch for workers", "Change radio station", "Honk horn"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-orange-500",
    shape: "diamond",
    explanation: "Construction zone ahead. Reduce speed and watch for workers and equipment."
  },
  {
    id: 62,
    signEmoji: "⊗",
    signName: "Road Closed Ahead",
    signCode: "W20-3",
    question: "What does this mean?",
    answers: ["Lane shift", "Road completely closed ahead", "Detour optional", "Road narrows"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-orange-500",
    shape: "diamond",
    explanation: "Road is closed ahead. Plan alternate route."
  },
  {
    id: 63,
    signEmoji: "⇄",
    signName: "Lane Shift",
    signCode: "W20-4",
    question: "What should drivers expect?",
    answers: ["Road ends", "Traffic shifts to different lanes", "Speed up", "Stop ahead"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-orange-500",
    shape: "diamond",
    explanation: "Traffic lanes shift position ahead. Stay alert."
  },
  {
    id: 64,
    signEmoji: "FLAGGER",
    signName: "Flagger Ahead",
    signCode: "W20-7",
    question: "Who controls traffic?",
    answers: ["Signs only", "Person with flag or paddle", "Traffic light", "Police only"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-orange-500",
    shape: "diamond",
    explanation: "Flagger ahead directing traffic. Obey their signals."
  },
  {
    id: 65,
    signEmoji: "⟨ ⟩",
    signName: "Narrow Road",
    signCode: "W5-1",
    question: "What change to road?",
    answers: ["Road widens", "Road becomes narrower", "New lanes added", "Road closed"],
    correctAnswer: 1,
    category: "Warning",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Road narrows ahead. Reduce speed."
  },

  // TRUCK-SPECIFIC SIGNS - 20 signs
  {
    id: 66,
    signEmoji: "12'6\"",
    signName: "Low Clearance",
    signCode: "W12-2",
    question: "What must truck drivers know?",
    answers: ["Road length", "Vehicle height", "Vehicle weight", "Speed limit"],
    correctAnswer: 1,
    category: "Truck-Specific",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Know your truck's height. If over posted clearance, find alternate route."
  },
  {
    id: 67,
    signEmoji: "WEIGH STATION",
    signName: "Weigh Station Ahead",
    signCode: "W7-1",
    question: "Must commercial trucks stop?",
    answers: ["Only if empty", "Yes, unless station closed", "No, optional", "Only if overweight"],
    correctAnswer: 1,
    category: "Truck-Specific",
    color: "bg-blue-500",
    shape: "rectangle",
    explanation: "All commercial trucks must stop unless signs indicate station is closed."
  },
  {
    id: 68,
    signEmoji: "10 TONS",
    signName: "Weight Limit",
    signCode: "R12-1",
    question: "What does weight limit include?",
    answers: ["Truck only", "Truck plus cargo plus fuel", "Cargo only", "Passengers only"],
    correctAnswer: 1,
    category: "Truck-Specific",
    color: "bg-white",
    shape: "rectangle",
    explanation: "Weight limit includes total weight of truck, cargo, fuel, and passengers."
  },
  {
    id: 69,
    signEmoji: "RUNAWAY TRUCK",
    signName: "Runaway Truck Ramp",
    signCode: "W7-4",
    question: "When should this ramp be used?",
    answers: ["Never", "When brakes fail on downgrade", "To rest", "To pass"],
    correctAnswer: 1,
    category: "Truck-Specific",
    color: "bg-orange-500",
    shape: "rectangle",
    explanation: "Emergency ramp for trucks with brake failure on steep downgrades."
  },
  {
    id: 70,
    signEmoji: "TRUCK ROUTE",
    signName: "Truck Route",
    signCode: "M4-6",
    question: "What does this sign indicate?",
    answers: ["No trucks", "Designated truck route", "Truck parking", "Truck stop"],
    correctAnswer: 1,
    category: "Truck-Specific",
    color: "bg-green-500",
    shape: "rectangle",
    explanation: "Designated route for trucks to avoid restricted roads."
  },
  {
    id: 71,
    signEmoji: "NO TRUCKS LEFT",
    signName: "No Trucks Left Lane",
    signCode: "R4-6",
    question: "Which lanes can trucks use?",
    answers: ["Left lane only", "Right and center lanes", "All lanes", "No lanes"],
    correctAnswer: 1,
    category: "Truck-Specific",
    color: "bg-white",
    shape: "rectangle",
    explanation: "Trucks prohibited from using left lane."
  },
  {
    id: 72,
    signEmoji: "INSPECTION",
    signName: "Truck Inspection Station",
    signCode: "R14-4",
    question: "Must trucks enter?",
    answers: ["Optional", "Mandatory if directed", "Only if problems", "Never"],
    correctAnswer: 1,
    category: "Truck-Specific",
    color: "bg-white",
    shape: "rectangle",
    explanation: "Trucks must enter inspection station if directed."
  },
  {
    id: 73,
    signEmoji: "8% ⬇",
    signName: "Steep Grade Percentage",
    signCode: "W7-1",
    question: "What does percentage indicate?",
    answers: ["Speed reduction", "Steepness of grade", "Distance", "Time"],
    correctAnswer: 1,
    category: "Truck-Specific",
    color: "bg-yellow-500",
    shape: "diamond",
    explanation: "Shows steepness of grade. Use lower gear for steep downgrades."
  },
  {
    id: 74,
    signEmoji: "BRAKE CHECK",
    signName: "Check Brakes",
    signCode: "W7-3",
    question: "When should you check brakes?",
    answers: ["After hill", "Before steep downgrade", "Never", "Every hour"],
    correctAnswer: 1,
    category: "Truck-Specific",
    color: "bg-orange-500",
    shape: "rectangle",
    explanation: "Check brakes before descending steep grade to ensure they work properly."
  },
  {
    id: 75,
    signEmoji: "TRUCKS ⇊",
    signName: "Trucks Use Lower Gear",
    signCode: "W7-2",
    question: "Why use lower gear on downgrades?",
    answers: ["Save fuel", "Control speed without brake overheating", "Go faster", "Make noise"],
    correctAnswer: 1,
    category: "Truck-Specific",
    color: "bg-orange-500",
    shape: "rectangle",
    explanation: "Lower gear uses engine braking to control speed and prevent brake overheating."
  },
  {
    id: 76,
    signEmoji: "50 MPH TRUCKS",
    signName: "Truck Speed Limit",
    signCode: "R2-2",
    question: "Does this apply to cars?",
    answers: ["Yes, all vehicles", "No, trucks only", "Only at night", "Only when loaded"],
    correctAnswer: 1,
    category: "Truck-Specific",
    color: "bg-white",
    shape: "rectangle",
    explanation: "Different speed limit specifically for trucks and heavy vehicles."
  },
  {
    id: 77,
    signEmoji: "AXLE LIMIT",
    signName: "Axle Weight Limit",
    signCode: "R12-2",
    question: "What weight is limited?",
    answers: ["Total vehicle", "Per axle", "Cargo only", "Driver only"],
    correctAnswer: 1,
    category: "Truck-Specific",
    color: "bg-white",
    shape: "rectangle",
    explanation: "Maximum weight allowed per axle."
  },
  {
    id: 78,
    signEmoji: "LENGTH LIMIT",
    signName: "Vehicle Length Limit",
    signCode: "R12-3",
    question: "What does this restrict?",
    answers: ["Width", "Height", "Length of vehicle", "Weight"],
    correctAnswer: 2,
    category: "Truck-Specific",
    color: "bg-white",
    shape: "rectangle",
    explanation: "Maximum length of vehicle allowed on this road."
  },
  {
    id: 79,
    signEmoji: "TIRE CHAINS",
    signName: "Chains Required",
    signCode: "R14-1",
    question: "When are chains required?",
    answers: ["Always", "When sign is posted", "Never", "Summer only"],
    correctAnswer: 1,
    category: "Truck-Specific",
    color: "bg-white",
    shape: "rectangle",
    explanation: "Tire chains must be installed when this sign is displayed."
  },
  {
    id: 80,
    signEmoji: "HAZMAT",
    signName: "Hazardous Materials Prohibited",
    signCode: "R14-2",
    question: "What vehicles cannot use this route?",
    answers: ["All trucks", "Trucks carrying hazardous materials", "Empty trucks", "Diesel trucks"],
    correctAnswer: 1,
    category: "Truck-Specific",
    color: "bg-red-500",
    shape: "circle",
    explanation: "Vehicles transporting hazardous materials prohibited on this route."
  },
  {
    id: 81,
    signEmoji: "TRUCK PARKING",
    signName: "Truck Parking",
    signCode: "D9-11",
    question: "What is available?",
    answers: ["Rest area", "Truck parking area ahead", "Weigh station", "Restaurant"],
    correctAnswer: 1,
    category: "Truck-Specific",
    color: "bg-blue-500",
    shape: "rectangle",
    explanation: "Designated truck parking area ahead."
  },
  {
    id: 82,
    signEmoji: "NO JAKE",
    signName: "Engine Brake Prohibited",
    signCode: "R14-3",
    question: "What is prohibited?",
    answers: ["Regular brakes", "Jake/engine brakes", "Downshifting", "Accelerating"],
    correctAnswer: 1,
    category: "Truck-Specific",
    color: "bg-red-500",
    shape: "circle",
    explanation: "Engine braking (Jake brakes) prohibited due to noise in residential areas."
  },
  {
    id: 83,
    signEmoji: "BRIDGE WEIGHT",
    signName: "Bridge Weight Limit",
    signCode: "R12-5",
    question: "Where does this limit apply?",
    answers: ["Entire road", "Bridge only", "Hills only", "Parking areas"],
    correctAnswer: 1,
    category: "Truck-Specific",
    color: "bg-white",
    shape: "rectangle",
    explanation: "Weight limit specifically for the bridge ahead."
  },
  {
    id: 84,
    signEmoji: "OVERSIZE LOAD",
    signName: "Oversize Load Permit Required",
    signCode: "R14-7",
    question: "What do oversize loads need?",
    answers: ["Nothing special", "Special permit", "Extra insurance", "Police escort always"],
    correctAnswer: 1,
    category: "Truck-Specific",
    color: "bg-white",
    shape: "rectangle",
    explanation: "Oversize loads require special permit to use this route."
  },
  {
    id: 85,
    signEmoji: "DOUBLE TRAILERS",
    signName: "No Double Trailers",
    signCode: "R14-8",
    question: "What type of truck prohibited?",
    answers: ["All trucks", "Trucks pulling two trailers", "Single trailers", "Flatbeds"],
    correctAnswer: 1,
    category: "Truck-Specific",
    color: "bg-red-500",
    shape: "circle",
    explanation: "Trucks pulling double trailers are prohibited on this route."
  },

  // GUIDE SIGNS - 15 signs
  {
    id: 86,
    signEmoji: "EXIT 25",
    signName: "Exit Number",
    signCode: "E1-5",
    question: "What does this indicate?",
    answers: ["Speed limit", "Highway exit number", "Mile marker", "Route number"],
    correctAnswer: 1,
    category: "Guide",
    color: "bg-green-600",
    shape: "rectangle",
    explanation: "Interstate exit number."
  },
  {
    id: 87,
    signEmoji: "I-95",
    signName: "Interstate Route",
    signCode: "M1-1",
    question: "What type of highway?",
    answers: ["State route", "Interstate highway", "County road", "City street"],
    correctAnswer: 1,
    category: "Guide",
    color: "bg-blue-600",
    shape: "rectangle",
    explanation: "Interstate highway route marker."
  },
  {
    id: 88,
    signEmoji: "US 1",
    signName: "US Route",
    signCode: "M1-4",
    question: "What type of highway?",
    answers: ["Interstate", "US highway", "State route", "County road"],
    correctAnswer: 1,
    category: "Guide",
    color: "bg-white",
    shape: "rectangle",
    explanation: "US highway route marker."
  },
  {
    id: 89,
    signEmoji: "REST AREA",
    signName: "Rest Area",
    signCode: "D5-1",
    question: "What is available?",
    answers: ["Gas station", "Rest facilities ahead", "Restaurant", "Hotel"],
    correctAnswer: 1,
    category: "Guide",
    color: "bg-blue-600",
    shape: "rectangle",
    explanation: "Rest area with facilities ahead."
  },
  {
    id: 90,
    signEmoji: "GAS ⛽",
    signName: "Gas Station",
    signCode: "D9-1",
    question: "What service is available?",
    answers: ["Food", "Fuel", "Lodging", "Hospital"],
    correctAnswer: 1,
    category: "Guide",
    color: "bg-blue-600",
    shape: "rectangle",
    explanation: "Gas station ahead or at exit."
  },
  {
    id: 91,
    signEmoji: "FOOD 🍴",
    signName: "Food Services",
    signCode: "D9-2",
    question: "What is available?",
    answers: ["Gas", "Restaurants/food", "Lodging", "Camping"],
    correctAnswer: 1,
    category: "Guide",
    color: "bg-blue-600",
    shape: "rectangle",
    explanation: "Food services available ahead or at exit."
  },
  {
    id: 92,
    signEmoji: "LODGING 🏨",
    signName: "Lodging",
    signCode: "D9-3",
    question: "What service ahead?",
    answers: ["Food", "Gas", "Hotels/motels", "Camping"],
    correctAnswer: 2,
    category: "Guide",
    color: "bg-blue-600",
    shape: "rectangle",
    explanation: "Lodging/hotels available ahead or at exit."
  },
  {
    id: 93,
    signEmoji: "HOSPITAL H",
    signName: "Hospital",
    signCode: "D9-6",
    question: "What facility is near?",
    answers: ["School", "Hospital", "Police", "Fire station"],
    correctAnswer: 1,
    category: "Guide",
    color: "bg-blue-600",
    shape: "rectangle",
    explanation: "Hospital ahead."
  },
  {
    id: 94,
    signEmoji: "MILE 42",
    signName: "Mile Marker",
    signCode: "D10-1",
    question: "What does this show?",
    answers: ["Exit number", "Distance from state line", "Speed limit", "Route number"],
    correctAnswer: 1,
    category: "Guide",
    color: "bg-green-600",
    shape: "rectangle",
    explanation: "Shows distance from start of route (usually state line)."
  },
  {
    id: 95,
    signEmoji: "←",
    signName: "Directional Arrow",
    signCode: "D1-1",
    question: "What does arrow indicate?",
    answers: ["Speed limit", "Direction to destination", "Lane change", "Exit closed"],
    correctAnswer: 1,
    category: "Guide",
    color: "bg-green-600",
    shape: "rectangle",
    explanation: "Shows direction to reach indicated destination."
  },
  {
    id: 96,
    signEmoji: "NORTH",
    signName: "Cardinal Direction",
    signCode: "M3-1",
    question: "What does this show?",
    answers: ["Exit number", "Compass direction of route", "Distance", "Speed"],
    correctAnswer: 1,
    category: "Guide",
    color: "bg-white",
    shape: "rectangle",
    explanation: "Shows compass direction you are traveling on this route."
  },
  {
    id: 97,
    signEmoji: "NEXT EXIT",
    signName: "Next Services",
    signCode: "D9-13",
    question: "When are services available?",
    answers: ["Now", "At next exit", "In 10 miles", "End of road"],
    correctAnswer: 1,
    category: "Guide",
    color: "bg-blue-600",
    shape: "rectangle",
    explanation: "Indicated services available at next exit."
  },
  {
    id: 98,
    signEmoji: "BYPASS",
    signName: "Bypass Route",
    signCode: "M4-2",
    question: "What does bypass route do?",
    answers: ["Go through city", "Go around city", "End route", "Merge routes"],
    correctAnswer: 1,
    category: "Guide",
    color: "bg-green-600",
    shape: "rectangle",
    explanation: "Route goes around city rather than through it."
  },
  {
    id: 99,
    signEmoji: "TOLL",
    signName: "Toll Road",
    signCode: "M6-1",
    question: "What must you pay?",
    answers: ["Nothing", "Toll fee to use road", "Parking fee", "Gas tax"],
    correctAnswer: 1,
    category: "Guide",
    color: "bg-green-600",
    shape: "rectangle",
    explanation: "Road ahead requires payment of toll."
  },
  {
    id: 100,
    signEmoji: "ALTERNATE",
    signName: "Alternate Route",
    signCode: "M4-1",
    question: "What does this indicate?",
    answers: ["Main route", "Alternative route with same number", "Detour", "Road closed"],
    correctAnswer: 1,
    category: "Guide",
    color: "bg-green-600",
    shape: "rectangle",
    explanation: "Alternate route with same route number as main highway."
  }
];

// Helper function to render sign shape
const SignShape = ({ sign }: { sign: QuizQuestion }) => {
  const baseClasses = `${sign.color} text-white flex items-center justify-center font-bold shadow-2xl border-4 border-white`;
  
  const shapeStyles = {
    octagon: "clip-octagon w-48 h-48 text-4xl",
    triangle: "clip-triangle w-48 h-48 text-4xl pt-8",
    circle: "rounded-full w-48 h-48 text-4xl",
    rectangle: "rounded-lg w-56 h-40 text-3xl",
    diamond: "rotate-45 w-44 h-44 text-3xl",
    pentagon: "clip-pentagon w-48 h-48 text-3xl"
  };

  return (
    <div className="flex justify-center items-center py-8">
      <div className={`${baseClasses} ${shapeStyles[sign.shape]}`}>
        <span className={sign.shape === "diamond" ? "-rotate-45" : ""}>
          {sign.signEmoji}
        </span>
      </div>
    </div>
  );
};

const RoadSigns = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const quizQuestions = useMemo(() => getQuizQuestions(i18n.language), [i18n.language]);
  const question = quizQuestions[currentQuestion];
  const progressPercentage = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswerClick = (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === question.correctAnswer) {
      setScore(score + 1);
      toast({
        title: `✓ ${t('roadSigns.correct')}`,
        description: t('roadSigns.correct'),
      });
    } else {
      toast({
        title: t('roadSigns.incorrect'),
        description: t('roadSigns.incorrect'),
        variant: "destructive",
      });
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  if (quizComplete) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 shadow-xl">
          <div className="container mx-auto max-w-4xl">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="text-white hover:bg-white/20 mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('roadSigns.backToDashboard')}
            </Button>
          </div>
        </div>

        <div className="container mx-auto p-6 max-w-4xl">
          <Card className="p-12 text-center bg-white/95 backdrop-blur">
            <Trophy className={`w-24 h-24 mx-auto mb-6 ${passed ? 'text-green-500' : 'text-orange-500'}`} />
            <h1 className="text-4xl font-bold mb-4">
              {passed ? "🎉" : "💪"}
            </h1>
            <p className="text-2xl mb-8 text-muted-foreground">
              {t('roadSigns.score')}: <span className="font-bold text-primary">{score}</span> / <span className="font-bold">{quizQuestions.length}</span>
            </p>
            <div className="mb-8">
              <Progress value={percentage} className="h-4 mb-2" />
              <p className="text-lg font-semibold">{percentage}%</p>
            </div>
            <p className="text-lg mb-8">
              {passed 
                ? t('roadSigns.passMessage') || "Excellent work! You have a strong understanding of US road signs for truck drivers."
                : t('roadSigns.tryAgainMessage') || "Keep practicing! Review the signs and try again to improve your score."}
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={handleRestart}
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                {t('roadSigns.tryAgain') || "Try Again"}
              </Button>
              <Button
                onClick={() => navigate("/dashboard")}
                size="lg"
                variant="outline"
              >
                {t('roadSigns.backToDashboard')}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <style>{`
        .clip-octagon {
          clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
        }
        .clip-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        .clip-pentagon {
          clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
        }
      `}</style>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 shadow-xl">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('roadSigns.backToDashboard')}
            </Button>
            <div className="text-right">
              <p className="text-sm text-white/80">{t('roadSigns.score')}</p>
              <p className="text-2xl font-bold">{score} / {quizQuestions.length}</p>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">🚦 {t('roadSigns.title')}</h1>
          <p className="text-white/90 mb-4">{t('roadSigns.subtitle')}</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{t('roadSigns.questionLabel')} {currentQuestion + 1} / {quizQuestions.length}</span>
              <span>{Math.round(progressPercentage)}% {t('roadSigns.progress')}</span>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-white/20" />
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 max-w-4xl">
        <Card className="overflow-hidden bg-white/95 backdrop-blur">
          {/* Road Sign Display */}
          <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-8">
            <div className="flex justify-between items-center mb-4">
              <Badge className="text-sm" variant="secondary">{question.category}</Badge>
              <Badge className="text-sm font-mono" variant="outline">{question.signCode}</Badge>
            </div>
            
            <SignShape sign={question} />
            
            <h2 className="text-2xl font-bold text-center mt-6 text-slate-800 dark:text-slate-100">
              {question.signName}
            </h2>
          </div>

          {/* Question and Answers */}
          <div className="p-8">
            <h3 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-500" />
              {question.question}
            </h3>

            <div className="space-y-3 mb-6">
              {question.answers.map((answer, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correctAnswer;
                const showCorrect = showResult && isCorrect;
                const showIncorrect = showResult && isSelected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={showResult}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      showCorrect
                        ? "bg-green-100 border-green-500 text-green-800 shadow-lg"
                        : showIncorrect
                        ? "bg-red-100 border-red-500 text-red-800 shadow-lg"
                        : isSelected
                        ? "bg-blue-100 border-blue-500 text-blue-800"
                        : "bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md"
                    } ${showResult ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{answer}</span>
                      {showCorrect && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                      {showIncorrect && <XCircle className="h-5 w-5 text-red-600" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showResult && (
              <div
                className={`p-4 rounded-lg border-l-4 ${
                  selectedAnswer === question.correctAnswer
                    ? "bg-green-50 border-green-500"
                    : "bg-blue-50 border-blue-500"
                }`}
              >
                <p className="font-semibold mb-2 text-slate-800 flex items-center gap-2">
                  {selectedAnswer === question.correctAnswer ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      {t('roadSigns.correct')}
                    </>
                  ) : (
                    <>
                      <Info className="h-5 w-5 text-blue-600" />
                      {t('roadSigns.incorrect')}
                    </>
                  )}
                </p>
                <p className="text-slate-700">{question.explanation}</p>
              </div>
            )}

            {/* Next Button */}
            {showResult && (
              <Button
                onClick={handleNext}
                size="lg"
                className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
              >
                {currentQuestion < quizQuestions.length - 1 ? (
                  <>
                    {t('roadSigns.nextQuestion')}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </>
                ) : (
                  <>
                    {t('roadSigns.finishQuiz')}
                    <Trophy className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RoadSigns;