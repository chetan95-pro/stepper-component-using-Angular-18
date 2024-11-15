import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css'],
  imports: [
    CommonModule,
    MatSelectModule,
    MatButtonModule, // Added this for button functionality
    MatMenuModule, // Added this for the dropdown menu functionality
    TranslateModule,
  ],
})
export class LanguageSelectorComponent {
  languages = [
    'en',
    'fr',
    'es',
    'de',
    'it',
    'zh',
    'ja',
    'ru',
    'pt',
    'ar',
    'hi',
    'ko',
  ];

  constructor(private languageService: LanguageService) {}

  changeLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }
}
