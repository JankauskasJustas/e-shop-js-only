export class Repository {
  static getPlayers() {
    return fetch("http://localhost:3000/players").then((res) => res.json());
  }

  static insertPlayer(player) {
    return fetch("http://localhost:3000/players", {
      method: "POST",
      body: JSON.stringify({
        name: player.name,
        surname: player.surname,
        fullName: `${player.name} ${player.surname}`,
        img: player.img,
        jerseys: player.jerseys,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) => res.json());
  }

  static updatePlayer(player, id) {
    return fetch(`http://localhost:3000/players/${id}`, {
      method: "POST",
      body: JSON.stringify({
        name: player.name,
        surname: player.surname,
        fullName: `${player.name} ${player.surname}`,
        img: player.img,
        jerseys: player.jerseys,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) => res.json());
  }

  static deletePlayer(id) {
    return fetch(`http://localhost:3000/players/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) => res.json());
  }
}
