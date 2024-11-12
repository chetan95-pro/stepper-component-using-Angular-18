import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private translate: TranslateService) {
    const browserLang = this.translate.getBrowserLang() || 'en'; // Provide a default value
    this.translate.setDefaultLang('en');
    this.translate.use(browserLang.match(/en|fr|es|de/) ? browserLang : 'en');
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
  }
}
