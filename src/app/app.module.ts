import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialExampleModule } from '../material.module';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent, SearchPipe } from './dashboard/dashboard.component';
import { ApiProviderService } from './api-provider.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule
  ],
  declarations: [AppComponent,ProfileComponent,DashboardComponent,SearchPipe],
  // schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  providers: [ApiProviderService],
  bootstrap: [AppComponent],
})
export class AppModule {}
