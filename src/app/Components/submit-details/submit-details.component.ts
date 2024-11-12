import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicDetails } from '../../Model/model';
import { AdvancedDetails } from '../../Model/model';

@Component({
  selector: 'app-submit-details',
  templateUrl: './submit-details.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class SubmitDetailsComponent {
  @Input() basicDetails: BasicDetails | undefined;
  @Input() advancedDetails: AdvancedDetails | undefined;
}
