import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule} from 'ngx-mask';

import { AppComponent } from './app.component';
import { CardUserComponent } from './components/carduser/carduser.component';
import { LoadingComponent } from './components/loading/loading.component';

//USER
import { UserComponent } from './pages/user/user.component';
import { UserRegistryComponent } from './pages/user/userregistry/userregistry.component';

import { ApiService } from './services/api.service';
import { ToastService } from './services/toast.service';

@NgModule({
  declarations: [AppComponent, UserComponent, CardUserComponent, LoadingComponent, UserRegistryComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule, NgxMaskModule.forRoot()],
  providers: [ApiService, ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
