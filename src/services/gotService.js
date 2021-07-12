export default class GotService {

   constructor() {
      this._apiBase = 'https://www.anapioficeandfire.com/api';
   }
   getResoure = async (url) => {
      const res = await fetch(`${this._apiBase}${url}`);

      if (!res.ok) {
         throw new Error(`Coul nod fetch ${url}, status: ${res.status}`)
      }

      return await res.json();
   };

   getAllCharacters = async () => {
      const res = await this.getResoure('/characters?page=5&pageSize=10');
      return res.map(this._transformCharacter);
   }

   getCharacter = async (id) => {
      const character = await this.getResoure(`/characters/${id}`);
      return this._transformCharacter(character);
   }

   getAllBooks = async () => {
      const books = await this.getResoure('/books/');
      return books.map(this._transformBook);
   }

   getBook = async (id) => {
      const book = await this.getResoure(`/books/${id}`);
      return this._transformBook(book);
   }

   getAllHouses = async () => {
      const houses = await this.getResoure('/houses/');
      return houses.map(this._transformHouse);
   }

   getHouse = async (id) => {
      const house = await this.getResoure(`/houses/${id}`);
      return this._transformHouse(house);
   }
//the function compares the data, and if no data is available show ‘no data :(’
   isSet(data) {
      if (data) {
         return data
      } else {
         return 'no data :('
      }
   }

   _extractId = (item) => {
      const idRegExp = /\/([0-9]*)$/;
      return item.url.match(idRegExp)[1];
   }

   _transformCharacter = (char) => {
      return {
         id: this._extractId(char),
         name: this.isSet(char.name),
         gender: this.isSet(char.gender),
         born: this.isSet(char.born),
         died: this.isSet(char.died),
         culture: this.isSet(char.culture),
      }
   }

   _transformBook = (book) => {
      return {
         id: this._extractId(book),
         name: this.isSet(book.name),
         numberOgPages: this.isSet(book.numberOgPages),
         publiser: this.isSet(book.publiser),
         released: this.isSet(book.released),
      }
   }

   _transformHouse = (house) =>  {
      return {
         id: this._extractId(house),
         name: this.isSet(house.name),
         region: this.isSet(house.region),
         words: this.isSet(house.words),
         titles: this.isSet(house.titles),
         overlord: this.isSet(house.overlord),
         ancestralWeapons: this.isSet(house.ancestralWeapons),
      }
   }
}


