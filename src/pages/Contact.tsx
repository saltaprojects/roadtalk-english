import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, MapPin, Clock } from "lucide-react";
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

    const form = e.currentTarget;
    const formData = new FormData(form);
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

      // Send email notification
      try {
        await supabase.functions.invoke('send-contact-email', {
          body: validatedData,
        });
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Don't fail the form submission if email fails
      }
      
      toast({
        title: t('contact.success.title'),
        description: t('contact.success.description'),
      });
      
      form.reset();
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

      {/* Split Screen Layout */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Panel - Contact Information */}
        <div className="lg:w-2/5 relative bg-gradient-to-br from-primary via-primary to-accent p-8 lg:p-12 flex flex-col justify-center text-primary-foreground">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 space-y-8 animate-in slide-in-from-left duration-700">
            {/* Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold">
                {t('contact.info.title')}
              </h1>
              <p className="text-lg text-primary-foreground/90">
                {t('contact.info.description')}
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {/* Email */}
              <div className="group p-4 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/80 mb-1">{t('contact.info.email')}</p>
                    <p className="font-semibold">sakuwka@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="group p-4 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/80 mb-1">{t('contact.info.location')}</p>
                    <p className="font-semibold">{t('contact.info.locationValue')}</p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="group p-4 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/80 mb-1">{t('contact.info.hours')}</p>
                    <p className="font-semibold">{t('contact.info.hoursValue')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Contact Form */}
        <div className="lg:w-3/5 flex items-center justify-center p-8 lg:p-12 relative z-10">
          <div className="w-full max-w-2xl">
            <div className="mb-8 animate-in slide-in-from-right duration-700">
              <h2 className="text-3xl font-bold mb-2">{t('contact.title')}</h2>
              <p className="text-muted-foreground">{t('contact.subtitle')}</p>
            </div>

            <Card className="card-elevated border-2 border-border/50 backdrop-blur-sm bg-card/95 p-8 animate-in slide-in-from-right duration-700 delay-100">
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
                  <p className="text-xs text-muted-foreground text-right">Max 1000 characters</p>
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
      </div>
    </div>
  );
};

export default Contact;
