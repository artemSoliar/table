export class User {
    public id: string;
    public first_name: string;
    public last_name: string;
    public patronymic_name: string;
    public discount: number;

    constructor(id, first_name, last_name, patronymic_name, discount) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.patronymic_name = patronymic_name;
        this.discount = discount;
    }
}