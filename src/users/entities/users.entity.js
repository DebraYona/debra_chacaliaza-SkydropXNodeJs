// El entity de user se debe usar para crear las instancias de user, para el CREATE por ej
// Tambien faltan los valores por defecto

module.exports = class User {
  constructor({
    id = 0,
    email = '',
    first_name = '',
    last_name = '',
    company = '',
    url = '',
    text = '',
  }) {
    this.id = id;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.company = company;
    this.url = url;
    this.text = text;
  }
};
