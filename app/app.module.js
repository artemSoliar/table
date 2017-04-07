// Класс AppModule - точка входа в данное приложение 
// Angular модуль - класс с декоратором NgModule
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var http_1 = require("@angular/http");
var index_1 = require("./shared/index");
var ng2_table_1 = require("ng2-table/ng2-table");
var ng2_bootstrap_1 = require("ng2-bootstrap/ng2-bootstrap");
var forms_1 = require("@angular/forms");
// @NgModule - декоратор, который определяет данные для создаваемого модуля.
// Для того чтобы приложение могло выполняться в браузере, текущий модуль (корневой модуль)
// должен выполнить импорт модуля BrowserModule взятого из @angular/platform-browser 
// Задача BrowserModule зарегистрировать основные сервис провайдеры приложения, 
// а также добавить общие директивы такие как ngIf и ngFor
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, http_1.HttpModule, ng2_table_1.Ng2TableModule, ng2_bootstrap_1.PaginationModule.forRoot(), forms_1.FormsModule],
        declarations: [app_component_1.AppComponent],
        bootstrap: [app_component_1.AppComponent],
        providers: [index_1.UserService] // компонент с которого начинается отображение приложения
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map