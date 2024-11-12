type User = { username: string; password: string };

const mockUser: User = { username: "admin", password: "password123" };

export const authService = {
  login: (username: string, password: string) => {
    return username === mockUser.username && password === mockUser.password;
  },
  register: (username: string, password: string) => {
    // @TODO: implement a registration logic, e.g., saving to localStorage or a backend API.
    console.log("User registered:", username);
    return true;
  },
};
