import { AlertCircle, Lightbulb, Target, AlertTriangle } from "lucide-react";

interface QuickTipBoxProps {
  type: 'tip' | 'warning' | 'mistake' | 'example';
  text: string;
}

const iconMap = {
  tip: Lightbulb,
  warning: AlertTriangle,
  mistake: AlertCircle,
  example: Target,
};

const styleMap = {
  tip: 'bg-blue-50 border-blue-200 text-blue-900',
  warning: 'bg-amber-50 border-amber-200 text-amber-900',
  mistake: 'bg-red-50 border-red-200 text-red-900',
  example: 'bg-green-50 border-green-200 text-green-900',
};

export const QuickTipBox = ({ type, text }: QuickTipBoxProps) => {
  const Icon = iconMap[type];
  
  return (
    <div className={`flex gap-3 p-4 rounded-lg border-2 ${styleMap[type]}`}>
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
};
