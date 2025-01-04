import { Component } from '@angular/core';
import { ApisListSectionComponent } from '../../sections/apis-list-section/apis-list-section.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-apis',
  imports: [ApisListSectionComponent],
  templateUrl: './apis.component.html',
  styleUrl: './apis.component.css',
})
export class ApisComponent {}
