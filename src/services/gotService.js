export default class GotService {

   constructor() {
      this._apiBase = 'https://www.anapioficeandfire.com/api';
   }
   async getResoure(url) {
      const res = await fetch(`${this._apiBase}${url}`);

      if (!res.ok) {
         throw new Error(`Coul nod fetch ${url}, status: ${res.status}`)
      }

      return await res.json();
   };

   async getAllCharacters() {
      const res = await this.getResoure('/characters?page=5&pageSize=10');
      return res.map(this._transformCharacter);
   }

   async getCharacter(id) {
      const character = await  this.getResoure(`/characters/${id}`);
      return this._transformCharacter(character);
   }

   async getAllBooks() {
      const books = await this.getResoure('/books?page=5&pageSize=10');
      return books.map(this._transformBook);
   }

   async getBook(id) {
      const book = await this.getResoure(`/books/${id}`);
      return this._transformBook(book);
   }

   getAllHouses() {
      return this.getResoure('/houses?page=5&pageSize=10')
   }

   getHouse(id) {
      return this.getResoure(`/houses/${id}`)
   }

   _transformCharacter(char) {
      return {
         name: char.name,
         gender: char.gender,
         born: char.born,
         died: char.died,
         culture: char.culture,
      }
   }

   _transformBook(book) {
      return {
         name: book.name,
         numberOgPages: book.numberOgPages,
         publiser: book.publiser,
         released: book.released,
      }
   }

   _transformHouse(house) {
      return {
         name: house.name,
         region: house.region,
         words: house.words,
         titles: house.titles,
         overlord: house.overlord,
         ancestralWeapons: house.ancestralWeapons,
      }
   }
}


