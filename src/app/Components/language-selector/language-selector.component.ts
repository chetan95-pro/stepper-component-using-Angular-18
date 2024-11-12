import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css'],
  imports: [CommonModule, MatSelectModule, CommonModule, TranslateModule]
})
export class LanguageSelectorComponent {
  languages = ['en', 'fr', 'es', 'de', 'it', 'zh', 'ja', 'ru', 'pt', 'ar', 'hi', 'ko'];

  constructor(private languageService: LanguageService) {}

  changeLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }
}
