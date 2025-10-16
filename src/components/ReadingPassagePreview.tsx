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
      className="hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden group bg-[hsl(var(--reading-paper))] border-[hsl(var(--reading-muted))]"
      onClick={onClick}
    >
      {/* Book spine effect */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[hsl(var(--reading-accent))] to-[hsl(var(--reading-accent)/0.5)]" />
      
      <CardContent className="p-6 pl-8">
        <div className="flex items-start gap-4">
          {/* Book Icon */}
          <div className="flex-shrink-0 mt-1">
            <div className="w-12 h-12 rounded-lg bg-[hsl(var(--reading-bg))] flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-[hsl(var(--reading-accent))]" />
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <h3 className="font-serif font-bold text-lg text-[hsl(var(--reading-text))] leading-tight group-hover:text-[hsl(var(--reading-accent))] transition-colors">
                {dialogue.title}
              </h3>
              {isCompleted && (
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-500 flex-shrink-0" />
              )}
            </div>
            
            {/* Preview Text */}
            <p className="text-sm text-[hsl(var(--reading-muted))] leading-relaxed mb-4 line-clamp-2 font-serif">
              {preview}
            </p>
            
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge 
                variant={
                  dialogue.difficulty === 'beginner' ? 'default' :
                  dialogue.difficulty === 'intermediate' ? 'secondary' : 'destructive'
                }
                className="text-xs bg-[hsl(var(--reading-bg))] border-[hsl(var(--reading-accent))] text-[hsl(var(--reading-text))]"
              >
                {dialogue.difficulty}
              </Badge>
              
              <Badge variant="outline" className="text-xs bg-[hsl(var(--reading-bg))] border-[hsl(var(--reading-muted))] text-[hsl(var(--reading-text))]">
                {dialogue.category}
              </Badge>
              
              <div className="flex items-center gap-1 text-xs text-[hsl(var(--reading-muted))]">
                <Clock className="w-3 h-3" />
                <span>{dialogue.estimatedReadingTime || '5-7'} min</span>
              </div>
              
              {dialogue.wordCount && (
                <span className="text-xs text-[hsl(var(--reading-muted))]">
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
                    className="text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--reading-bg))] text-[hsl(var(--reading-text))]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Page corner fold effect */}
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-[hsl(var(--reading-bg))] opacity-0 group-hover:opacity-100 transition-opacity" 
             style={{ clipPath: "polygon(100% 0, 0% 100%, 100% 100%)" }} />
      </CardContent>
    </Card>
  );
};