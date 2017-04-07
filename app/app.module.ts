// Класс AppModule - точка входа в данное приложение 
// Angular модуль - класс с декоратором NgModule

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { HttpModule } from "@angular/http";
import { UserService } from "./shared/index";
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';
import { FormsModule } from "@angular/forms"
// @NgModule - декоратор, который определяет данные для создаваемого модуля.
// Для того чтобы приложение могло выполняться в браузере, текущий модуль (корневой модуль)
// должен выполнить импорт модуля BrowserModule взятого из @angular/platform-browser 
// Задача BrowserModule зарегистрировать основные сервис провайдеры приложения, 
// а также добавить общие директивы такие как ngIf и ngFor
@NgModule({
  imports:      [ BrowserModule, HttpModule, Ng2TableModule, PaginationModule.forRoot(), FormsModule ],
  declarations: [ AppComponent ], // корневой компонент данного приложения
  bootstrap:    [ AppComponent ],
  providers:    [UserService]  // компонент с которого начинается отображение приложения
})

export class AppModule { } 
