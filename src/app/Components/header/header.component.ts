import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'; // Import TranslateService
import { TranslateModule } from '@ngx-translate/core'; // Import TranslateModule
import { LanguageSelectorComponent } from '../language-selector/language-selector.component'; // Import LanguageSelectorComponent
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, LanguageSelectorComponent, RouterModule], // Add TranslateModule here
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private translate: TranslateService) {}
}
