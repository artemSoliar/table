"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("./shared/index");
var AppComponent = (function () {
    function AppComponent(service) {
        this.service = service;
        this.rows = [];
        this.columns = [{
                title: 'Имя',
                name: 'first_name',
                filtering: {
                    filterString: '',
                    placeholder: 'Фильтр по имени'
                }
            }, {
                title: 'Фамилия',
                name: 'last_name',
                filtering: {
                    filterString: '',
                    placeholder: 'Фильтр по фамилии'
                }
            }, {
                title: 'Отчество',
                name: 'patronymic_name',
                filtering: {
                    filterString: '',
                    placeholder: 'Фильтр по отчеству'
                }
            }, {
                title: 'Скидка',
                name: 'discount',
                filtering: {
                    filterString: '',
                    placeholder: 'Фильтр по скидке'
                }
            },];
        this.config = {
            paging: true,
            sorting: {
                columns: this.columns
            },
            filtering: {
                filterString: ''
            },
            className: ['table-sm']
        };
        this.page = 1;
        this.itemsPerPage = 10;
        this.maxSize = 5;
        this.numPages = 1;
        this.length = 0;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    AppComponent.prototype.refresh = function () {
        this.getUsers();
    };
    AppComponent.prototype.changePage = function (page, data) {
        if (data === void 0) { data = this.data; }
        var start;
        var end;
        var currPage;
        var nextPage = Math.floor(data.length / page.itemsPerPage);
        if (nextPage < page.page) {
            currPage = ((data.length % page.itemsPerPage) === 0) ? nextPage : (nextPage + 1);
        }
        else {
            currPage = page.page;
        }
        start = (currPage - 1) * page.itemsPerPage;
        end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    };
    AppComponent.prototype.changeSort = function (data, config) {
        if (!config.sorting) {
            return data;
        }
        var columns = this.config.sorting.columns || [];
        var columnName = void 0;
        var sort = void 0;
        for (var i = 0; i < columns.length; i++) {
            if (columns[i].sort !== '' && columns[i].sort !== false) {
                columnName = columns[i].name;
                sort = columns[i].sort;
            }
        }
        if (!columnName) {
            return data;
        }
        return data.sort(function (previous, current) {
            if (previous[columnName] > current[columnName]) {
                return sort === 'desc' ? -1 : 1;
            }
            else if (previous[columnName] < current[columnName]) {
                return sort === 'asc' ? -1 : 1;
            }
            return 0;
        });
    };
    AppComponent.prototype.changeFilter = function (data, config) {
        var _this = this;
        var filteredData = data;
        this.columns.forEach(function (column) {
            if (column.filtering) {
                filteredData = filteredData.filter(function (item) {
                    return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
                });
            }
        });
        if (!config.filtering) {
            return filteredData;
        }
        var tempArray = [];
        filteredData.forEach(function (item) {
            var flag = false;
            _this.columns.forEach(function (column) {
                if (item[column.name].toString().toLowerCase().match(_this.config.filtering.filterString.toLowerCase())) {
                    flag = true;
                }
            });
            if (flag) {
                tempArray.push(item);
            }
        });
        filteredData = tempArray;
        return filteredData;
    };
    AppComponent.prototype.onChangeTable = function (config, page) {
        if (page === void 0) { page = { page: this.page, itemsPerPage: this.itemsPerPage }; }
        console.log(config);
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }
        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }
        var filteredData = this.changeFilter(this.data, this.config);
        var sortedData = this.changeSort(filteredData, this.config);
        this.length = sortedData.length;
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    };
    AppComponent.prototype.onCellClick = function (data) {
        console.log(data);
    };
    AppComponent.prototype.getUsers = function () {
        var _this = this;
        this.service.getUsers().subscribe(function (users) {
            _this.data = users;
            _this.length = _this.data.length;
            _this.onChangeTable(_this.config);
        }, function (error) { return _this.errorMessage = error; });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "my-app",
        templateUrl: "app.component.html",
        styleUrls: ["app.component.css"]
    }),
    __metadata("design:paramtypes", [index_1.UserService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map