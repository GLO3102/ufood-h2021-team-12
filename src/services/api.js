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
  async getTokenInfo(token) {
    return await fetch(`${this.baseURL}/tokenInfo`, {
      headers: {
        authorization: `${token}`
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Couldn't get token info");
        return null;
      }
    });
  }
  async getRestaurants() {
    const response = await fetch(`${this.baseURL}/restaurants?limit=200`, {
      headers: {
        authorization: `${this.token}`
      }
    });
    return await response.json();
  }

  async getRestaurantsFromLocation(lat, lng, zoom) {
    //Why do I feel I'm using the Google Map's api trough proxy?
    const response = await fetch(
      `${this.baseURL}/restaurants?limit=50?lon=${lng}?lat=${lat}?z=${zoom}`,
      {
        headers: {
          authorization: `${this.token}`
        }
      }
    );
    return await response.json();
  }

  async getRestaurant(restaurantId) {
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

  async createRestaurant(listId, restaurantId) {
    const response = await fetch(
      `${this.baseURL}/favorites/${listId}/restaurants`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${this.token}`
        },
        body: JSON.stringify({
          id: `${restaurantId}`
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

  async logOut() {
    return fetch(`${this.baseURL}/logOut`, {
      method: "POST"
    });
  }

  async leaveReview(token, userId, restaurantId, review, rating, date) {
    const response = await fetch(
      `${this.baseURL}/users/${userId}/restaurants/visits`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token
        },
        body: JSON.stringify({
          restaurant_id: restaurantId,
          comment: review,
          rating: rating,
          date: date
        })
      }
    );
    return response.json();
  }
  async getReviews(restaurantID, reviewPerPage, page) {
    const response = await fetch(
      `${this.baseURL}/restaurants/${restaurantID}/visits?limit=${reviewPerPage}&page=${page}`,
      {
        method: "GET",
        headers: {
          authorization: this.token
        }
      }
    );
    const json = await response.json();
    return json;
  }
  async getUser(id) {
    const response = await fetch(`${this.baseURL}/users/${id}`, {
      method: "GET",
      headers: {
        authorization: `${this.token}`
      }
    });
    const json = await response.json();
    return json;
  }
}
