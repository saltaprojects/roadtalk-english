import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, Target } from "lucide-react";
import { DialogueText } from "@/data/dialogueTexts";
import { useTranslation } from "react-i18next";

interface ReadingPassageViewerProps {
  dialogue: DialogueText;
  highlightedSentenceIndex?: number;
  showTranslation: boolean;
}

export const ReadingPassageViewer = ({ 
  dialogue, 
  highlightedSentenceIndex,
  showTranslation 
}: ReadingPassageViewerProps) => {
  const { i18n } = useTranslation();
  const isRussian = i18n.language === 'ru';
  const sentences = dialogue.sentences || [dialogue.dialogueText];
  
  return (
    <Card className="p-8 bg-gradient-to-br from-amber-50/50 to-orange-50/50 border-amber-200/50 shadow-lg">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6 pb-4 border-b border-amber-200">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-2xl font-serif font-bold text-amber-900 mb-2">
                {dialogue.title}
              </h2>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-300">
                  <BookOpen className="w-3 h-3 mr-1" />
                  {dialogue.difficulty}
                </Badge>
                {dialogue.category && (
                  <Badge variant="outline" className="border-amber-300 text-amber-700">
                    {dialogue.category}
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-sm text-amber-700">
                <Clock className="w-4 h-4" />
                <span>{dialogue.estimatedReadingTime || "5-7 min"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-amber-700 mt-1">
                <Target className="w-4 h-4" />
                <span>{dialogue.wordCount || "~200"} words</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reading Tips */}
        {dialogue.readingTips && (
          <div className="mb-6 p-4 bg-amber-100/50 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-800 italic">💡 {dialogue.readingTips}</p>
          </div>
        )}

        {/* Main Text */}
        <div className="prose prose-lg max-w-none">
          {dialogue.paragraphs ? (
            dialogue.paragraphs.map((paragraph, pIndex) => (
              <p 
                key={pIndex} 
                className="mb-4 leading-relaxed text-gray-800 font-serif text-lg"
              >
                {paragraph}
              </p>
            ))
          ) : (
            <div className="space-y-2">
              {sentences.map((sentence, index) => (
                <span
                  key={index}
                  className={`inline ${
                    highlightedSentenceIndex === index
                      ? "bg-amber-200 text-amber-900 px-1 rounded transition-all duration-300"
                      : "text-gray-800"
                  } font-serif text-lg leading-relaxed`}
                >
                  {sentence}{" "}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Transcription */}
        {dialogue.transcription && (
          <div className="mt-6 pt-6 border-t border-amber-200">
            <h3 className="text-sm font-semibold text-amber-800 mb-2">
              Pronunciation Guide:
            </h3>
            <p className="text-sm text-amber-700 italic font-mono">
              {dialogue.transcription}
            </p>
          </div>
        )}

        {/* Translation - Only show in Russian mode */}
        {showTranslation && isRussian && dialogue.translation && (
          <div className="mt-6 pt-6 border-t border-amber-200">
            <h3 className="text-sm font-semibold text-amber-800 mb-2">
              Translation (Перевод):
            </h3>
            <p className="text-sm text-amber-700 italic">
              {dialogue.translation}
            </p>
          </div>
        )}

        {/* Key Vocabulary */}
        {dialogue.keyVocabulary && dialogue.keyVocabulary.length > 0 && (
          <div className="mt-6 pt-6 border-t border-amber-200">
            <h3 className="text-sm font-semibold text-amber-800 mb-3">
              Key Vocabulary:
            </h3>
            <div className="flex flex-wrap gap-2">
              {dialogue.keyVocabulary.map((word, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="bg-white border-amber-300 text-amber-800 hover:bg-amber-50"
                >
                  {word}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};