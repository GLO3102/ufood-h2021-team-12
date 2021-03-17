export default class Api {
  constructor() {
    this.baseURL = "https://ufoodapi.herokuapp.com/unsecure/users";
  }

  // async createUser(){
  //   //Post /users
  //   const response = await fetch(`${this.baseURL}/users`, {
  //     method: 'POST',
  //   });
  //
  //   return response.json();
  // }

  registerUser(user){
    this.user = user
  }
  async getRandomUser(){
    const response = await fetch(`${this.baseURL}?limit=20`);
    const listUsers = await response.json();
    return listUsers.items[1];
  }
  async getUser(){
    const response = await fetch(`${this.baseURL}/${this.user.id}`);
    return await response.json();
  }
  async getFollowers() {
    const response = await fetch(`${this.baseURL}/${this.user.id}`);
    const json = await response.json();

    return json.followers;
  }
  async getFollowing() {
    const response = await fetch(`${this.baseURL}/${this.user.id}`);
    const json = await response.json();

    return json.following;
  }
  async getFavorites(max) {
    const response = await fetch(
      `${this.baseURL}/${this.user.id}/favorites?limit=${max}`
    );
    const json = await response.json();

    return json.items;
  }
  // async getTask() {
  //   const response = await fetch(`${this.baseURL}/${this.user.id}/tasks`);
  //   const json = await response.json();
  //
  //   return json.tasks;
  // }
  //
  // async createTask(name) {
  //   const response = await fetch(`${this.baseURL}/${this.user.id}/tasks`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       name
  //     })
  //   });
  //
  //   return response.json();
  // }
  //
  // async updateTask(taskId, name) {
  //   const response = await fetch(
  //     `${this.baseURL}/${this.user.id}/tasks/${taskId}`,
  //     {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         name
  //       })
  //     }
  //   );
  //
  //   return response.json();
  // }
  //
  // async deleteTask(taskId) {
  //   return fetch(`${this.baseURL}/${this.user.id}/tasks/${taskId}`, {
  //     method: "DELETE"
  //   });
  // }
}
