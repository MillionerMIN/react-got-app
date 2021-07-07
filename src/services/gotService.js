export default class GotService {

   constructor(){
      this._apiBase = 'https://www.anapioficeandfire.com/api';
   }
   async getResoure(url) {
      const res = await fetch(`${this._apiBase}${url}`);

      if (!res.ok) {
         throw new Error(`Coul nod fetch ${url}, status: ${res.status}`)
      }

      return await res.json();
   };

   getAllCharacters() {
      return this.getResoure('/characters?page=8&pageSize=10')
   }

   getCharacter(id) {
      return this.getResoure(`/characters/${id}`)
   }

   getAllBooks() {
      return this.getResoure('/books?page=8&pageSize=10')
   }

   getBook(id) {
      return this.getResoure(`/books/${id}`)
   }

   getAllHouses() {
      return this.getResoure('/houses?page=8&pageSize=10')
   }

   getHouse(id) {
      return this.getResoure(`/houses/${id}`)
   }
}


