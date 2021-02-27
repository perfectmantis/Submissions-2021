import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistercomplaintComponent } from './registercomplaint.component';
import { Routes, RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../../demo-material-module';
import { SpeechRecognizerService } from '../../shared/services/speech-recognizer.service';
import { SpeechSynthesizerService } from '../../shared/services/speech-synthesizer.service';


const routes: Routes = [{
  path: "", component: RegistercomplaintComponent
}]
@NgModule({
  declarations: [RegistercomplaintComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DemoMaterialModule
  ], providers:[SpeechRecognizerService, SpeechSynthesizerService,] ,schemas: [NO_ERRORS_SCHEMA],
})
export class RegistercomplaintModule { }
