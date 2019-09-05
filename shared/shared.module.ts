import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpModule
    ],
    exports: [
        ReactiveFormsModule,
        FormsModule,
        HttpModule,
        LoaderComponent
    ],
    declarations: [LoaderComponent]

})


export class SharedModule {}