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
      size="default"
      onClick={toggleLanguage}
      className="gap-2 text-white hover:text-white/80"
    >
      <Languages className="w-5 h-5" />
      {i18n.language === 'en' ? 'RU' : 'EN'}
    </Button>
  );
};

export default LanguageSwitcher;
