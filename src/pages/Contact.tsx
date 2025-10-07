import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

const Contact = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      const validatedData = contactSchema.parse(data);
      
      // Save to database
      const { error } = await supabase
        .from('contacts')
        .insert([{
          name: validatedData.name,
          email: validatedData.email,
          subject: validatedData.subject,
          message: validatedData.message,
        }]);
      
      if (error) {
        console.error('Error saving contact:', error);
        throw error;
      }
      
      toast({
        title: t('contact.success.title'),
        description: t('contact.success.description'),
      });
      
      e.currentTarget.reset();
    } catch (error) {
      console.error('Contact form error:', error);
      if (error instanceof z.ZodError) {
        toast({
          title: t('contact.error.title'),
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: t('contact.error.title'),
          description: 'Failed to send message. Please try again.',
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-hero opacity-10 dark:opacity-20" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>

      {/* Back Button */}
      <div className="absolute top-4 left-4 z-20">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="gap-2 hover:bg-primary/10"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('contact.back')}
        </Button>
      </div>

      {/* Contact Section */}
      <div className="container max-w-3xl mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-[var(--shadow-button)] mb-6 animate-in fade-in zoom-in duration-500">
            <Mail className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent animate-in slide-in-from-bottom-4 duration-700">
            {t('contact.title')}
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto animate-in slide-in-from-bottom-5 duration-700 delay-100">
            {t('contact.subtitle')}
          </p>
        </div>

        <Card className="card-elevated border-2 border-border/50 backdrop-blur-sm bg-card/95 p-8 md:p-10 animate-in slide-in-from-bottom-6 duration-700 delay-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold text-foreground">
                  {t('contact.form.name')}
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={t('contact.form.namePlaceholder')}
                  required
                  maxLength={100}
                  className="h-12 border-2 focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                  {t('contact.form.email')}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t('contact.form.emailPlaceholder')}
                  required
                  maxLength={255}
                  className="h-12 border-2 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-semibold text-foreground">
                {t('contact.form.subject')}
              </Label>
              <Input
                id="subject"
                name="subject"
                type="text"
                placeholder={t('contact.form.subjectPlaceholder')}
                required
                maxLength={200}
                className="h-12 border-2 focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-semibold text-foreground">
                {t('contact.form.message')}
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder={t('contact.form.messagePlaceholder')}
                required
                maxLength={1000}
                rows={6}
                className="border-2 focus:border-primary transition-colors resize-none"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 text-lg font-bold btn-hero"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
