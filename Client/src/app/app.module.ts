import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { EmailSubscribeFormComponent } from './email-subscribe-form/email-subscribe-form.component';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SubscriptionServiceService } from './subscription-service.service';

@NgModule({
  declarations: [
    AppComponent,
    EmailSubscribeFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [SubscriptionServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
