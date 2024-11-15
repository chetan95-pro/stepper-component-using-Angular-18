import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageSelectorComponent } from './language-selector.component';
import { LanguageService } from '../../services/language.service';
import { of } from 'rxjs';

class MockLanguageService {
  setLanguage = jasmine.createSpy('setLanguage');
}

describe('LanguageSelectorComponent', () => {
  let component: LanguageSelectorComponent;
  let fixture: ComponentFixture<LanguageSelectorComponent>;
  let languageService: MockLanguageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSelectorComponent],
      providers: [{ provide: LanguageService, useClass: MockLanguageService }],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSelectorComponent);
    component = fixture.componentInstance;
    languageService = TestBed.inject(
      LanguageService
    ) as unknown as MockLanguageService;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of languages', () => {
    const expectedLanguages = [
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
    expect(component.languages).toEqual(expectedLanguages);
  });

  it('should call setLanguage with the selected language', () => {
    const lang = 'fr';
    component.changeLanguage(lang);
    expect(languageService.setLanguage).toHaveBeenCalledWith(lang);
    expect(languageService.setLanguage).toHaveBeenCalledTimes(1);
  });

  it('should render the language options', () => {
    fixture.detectChanges();
    const selectElement = fixture.nativeElement.querySelector('mat-select');
    expect(selectElement).toBeTruthy();
    const options = selectElement.querySelectorAll('mat-option');
    expect(options.length).toBe(component.languages.length);
  });
});
