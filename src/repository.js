export class Repository {
  static getPlayers() {
    return fetch("http://localhost:3000/players").then((res) => res.json());
  }
}
