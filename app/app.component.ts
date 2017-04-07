
import { Component, OnInit } from '@angular/core';
import { UserService, User } from "./shared/index";
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  moduleId: module.id,
  selector: "my-app",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.css"]
})
export class AppComponent implements OnInit {
  private data: User[];
  private errorMessage: string;
  public rows: Array<any> = [];
  public columns: Array<any> = [{
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

  public config: any = {
    paging: true,
    sorting: {
      columns: this.columns
    },
    filtering: {
      filterString: ''
    },
    className: ['table-sm']
  };

  public page: number = 1;
  public itemsPerPage: number = 10;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  constructor(private service: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  public refresh() {
    this.getUsers();
  }

  public changePage(page: any, data: User[] = this.data): User[] {
    let start: number;
    let end: number;
    let currPage: number;
    let nextPage: number = Math.floor(data.length / page.itemsPerPage);
   
    if (nextPage < page.page) {
      currPage = ((data.length % page.itemsPerPage) === 0) ? nextPage : (nextPage + 1);
    } else {
      currPage = page.page
    }
   
    start = (currPage - 1) * page.itemsPerPage;
    end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
   
    return data.slice(start, end);
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data: User[], config: any): any {
    let filteredData: User[] = data;

    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    let tempArray: User[] = [];

    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (item[column.name].toString().toLowerCase().match(this.config.filtering.filterString.toLowerCase())) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });

    filteredData = tempArray;
    return filteredData;
  }

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    console.log(config);
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);

    this.length = sortedData.length;
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
  }

  public onCellClick(data: any): any {
    console.log(data);
  }

  private getUsers() {
    this.service.getUsers().subscribe(
      users => {
        this.data = users;
        this.length = this.data.length;
        this.onChangeTable(this.config);
      },
      error => this.errorMessage = error
    );
  }
}
