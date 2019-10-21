import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CommonDataService } from './services/common-data.service';
import {
  MatButtonModule, MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReadmeViewerComponent } from './components/readme-viewer/readme-viewer.component';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MarkdownModule.forChild()
  ],
  declarations: [ReadmeViewerComponent],
  providers: [
    { provide: CommonDataService, useClass: CommonDataService }
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatRadioModule,
    MatCardModule,
    ReadmeViewerComponent
  ]
})
export class ApplicationCoreModule {
}
