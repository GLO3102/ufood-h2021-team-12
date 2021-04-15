export default class Api {
  constructor() {
    this.baseURL = "https://ufoodapi.herokuapp.com";
  }

  async createUser(name, email, password) {
    //Post /users
    const response = await fetch(`${this.baseURL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        name,
        email,
        password
      })
    });

    return response.text();
  }

  registerUser(user) {
    this.user = user;
  }

  registerToken(token) {
    this.token = token;
  }

  // async getRandomUser() {
  //   const response = await fetch(`${this.baseURL}/users?limit=20`);
  //   const listUsers = await response.json();
  //   return listUsers.items[10];
  // }

  //this check if user exist and get token
  async connectUser(email, password) {
    const response = await fetch(`${this.baseURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        email,
        password
      })
    });

    return response.json();
  }

  async getUsers() {
    const response = await fetch(`${this.baseURL}/users?limit=600`, {
      headers: {
        authorization: `${this.token}`
      }
    });
    return await response.json();
  }
  async getUser(token) {
    const response = await fetch(`${this.baseURL}/tokenInfo`, {
      headers: {
        authorization: `${token}`
      }
    });
    return await response.json();
  }
  async getRestaurants() {
    const response = await fetch(`${this.baseURL}/restaurants`, {
      headers: {
        authorization: `${this.token}`
      }
    });
    const listRestaurant = await response.json();
    return listRestaurant.items;
  }
  async getRestaurant(restaurantId = this.restaurantId) {
    const response = await fetch(
      `${this.baseURL}/restaurants/${restaurantId}`,
      {
        headers: {
          authorization: `${this.token}`
        }
      }
    );
    return await response.json();
  }
  async getFollowers() {
    const response = await fetch(`${this.baseURL}/users/${this.user.id}`, {
      headers: {
        authorization: `${this.token}`
      }
    });
    const json = await response.json();

    return json.followers;
  }

  async getFollowing() {
    const response = await fetch(`${this.baseURL}/users/${this.user.id}`, {
      headers: {
        authorization: `${this.token}`
      }
    });
    const json = await response.json();

    return json.following;
  }

  async getFavorites(max) {
    const response = await fetch(
      `${this.baseURL}/users/${this.user.id}/favorites?limit=${max}`,
      {
        headers: {
          authorization: `${this.token}`
        }
      }
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
        "Content-Type": "application/json",
        authorization: `${this.token}`
      },
      body: JSON.stringify({
        name: `${name}`,
        owner: `${this.user.email}`
      })
    });

    return response.json();
  }

  async updateFavorite(listId, name) {
    const response = await fetch(`${this.baseURL}/favorites/${listId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `${this.token}`
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
          "Content-Type": "application/json",
          authorization: `${this.token}`
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
      method: "DELETE",
      headers: {
        authorization: `${this.token}`
      }
    });
  }
  async deleteRestaurant(listId, restaurantId) {
    return fetch(
      `${this.baseURL}/favorites/${listId}/restaurants/${restaurantId}`,
      {
        method: "DELETE",
        headers: {
          authorization: `${this.token}`
        }
      }
    );
  }

  async followUser(userId) {
    const response = await fetch(`${this.baseURL}/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${this.token}`
      },
      body: JSON.stringify({
        id: userId
      })
    });

    return response.json();
  }

  async removeUser(userId) {
    return fetch(`${this.baseURL}/follow/${userId}`, {
      method: "DELETE",
      headers: {
        authorization: `${this.token}`
      }
    });
  }

  async logOut(){
    return fetch(`${this.baseURL}/logOut`, {
      method: "POST"
    });
  }
}
