import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, CheckCircle2 } from "lucide-react";
import type { DialogueText } from "@/data/dialogueTexts";

interface ReadingPassagePreviewProps {
  dialogue: DialogueText;
  isCompleted?: boolean;
  onClick: () => void;
}

export const ReadingPassagePreview = ({ 
  dialogue, 
  isCompleted = false,
  onClick 
}: ReadingPassagePreviewProps) => {
  const preview = dialogue.dialogueText.substring(0, 120) + "...";
  
  return (
    <Card 
      className="hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 border-l-amber-600/50 bg-gradient-to-br from-amber-50/30 to-background dark:from-amber-950/10 dark:to-background hover:scale-[1.02]"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Book Icon */}
          <div className="flex-shrink-0 mt-1">
            <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-amber-700 dark:text-amber-500" />
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <h3 className="font-semibold text-lg text-foreground leading-tight">
                {dialogue.title}
              </h3>
              {isCompleted && (
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-500 flex-shrink-0" />
              )}
            </div>
            
            {/* Preview Text */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2 font-serif">
              {preview}
            </p>
            
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge 
                variant={
                  dialogue.difficulty === 'beginner' ? 'default' :
                  dialogue.difficulty === 'intermediate' ? 'secondary' : 'destructive'
                }
                className="text-xs"
              >
                {dialogue.difficulty}
              </Badge>
              
              <Badge variant="outline" className="text-xs">
                {dialogue.category}
              </Badge>
              
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{dialogue.estimatedReadingTime || '5-7'} min</span>
              </div>
              
              {dialogue.wordCount && (
                <span className="text-xs text-muted-foreground">
                  {dialogue.wordCount} words
                </span>
              )}
            </div>
            
            {/* Tags */}
            {dialogue.tags && dialogue.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {dialogue.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};