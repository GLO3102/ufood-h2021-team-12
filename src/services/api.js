export default class Api {
  constructor() {
    this.baseURL = "https://ufoodapi.herokuapp.com/unsecure";
  }

  // async createUser(){
  //   //Post /users
  //   const response = await fetch(`${this.baseURL}/users`, {
  //     method: 'POST',
  //   });
  //
  //   return response.json();
  // }

  registerUser(user) {
    this.user = user;
  }

  async getRandomUser() {
    const response = await fetch(`${this.baseURL}/users?limit=20`);
    const listUsers = await response.json();
    return listUsers.items[10];
  }

  async getUser() {
    const response = await fetch(`${this.baseURL}/users/${this.user.id}`);
    return await response.json();
  }
  async getRestaurants() {
    const response = await fetch(`${this.baseURL}/restaurants`);
    const listRestaurant = await response.json();
    return listRestaurant.items;
  }
  async getRestaurant(restaurantId = this.restaurantId) {
    const response = await fetch(`${this.baseURL}/restaurants/${restaurantId}`);
    return await response.json();
  }
  async getFollowers() {
    const response = await fetch(`${this.baseURL}/users/${this.user.id}`);
    const json = await response.json();

    return json.followers;
  }

  async getFollowing() {
    const response = await fetch(`${this.baseURL}/users/${this.user.id}`);
    const json = await response.json();

    return json.following;
  }

  async getFavorites(max) {
    const response = await fetch(
      `${this.baseURL}/users/${this.user.id}/favorites?limit=${max}`
    );
    const json = await response.json();

    return json;
  }

  // async getTask() {
  //   const response = await fetch(`${this.baseURL}/${this.user.id}/tasks`);
  //   const json = await response.json();
  //
  //   return json.tasks;
  // }
  //
  async createFavorite(name) {
    const response = await fetch(`${this.baseURL}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: `${name}`,
        owner: `${this.user.email}`
      })
    });

    return response.json();
  }

  async updateFavorite(listId,name) {
    const response = await fetch(`${this.baseURL}/favorites/${listId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: `${name}`,
        owner: `${this.user.email}`
      })
    });

    return response.json();
  }

  async createRestaurant(listId) {
    const items = await this.getRestaurants();
    this.restaurantId = items[Math.floor(Math.random() * items.length)].id;
    const response = await fetch(
      `${this.baseURL}/favorites/${listId}/restaurants`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: `${this.restaurantId}`
        })
      }
    );

    return response.json();
  }

  async deleteFavorite(listId) {
    return fetch(`${this.baseURL}/favorites/${listId}`, {
      method: "DELETE"
    });
  }
  async deleteRestaurant(listId, restaurantId) {
    return fetch(`${this.baseURL}/favorites/${listId}/restaurants/${restaurantId}`, {
      method: "DELETE"
    });
  }
}
