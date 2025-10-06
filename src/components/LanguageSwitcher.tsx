import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant="ghost"
      size="lg"
      onClick={toggleLanguage}
      className="gap-2 text-lg"
    >
      <Languages className="w-6 h-6" />
      {i18n.language === 'en' ? 'RU' : 'EN'}
    </Button>
  );
};

export default LanguageSwitcher;
