// src/services/authService.ts
export interface LoginResponse {
    username: string;
    token: string;
  }
  
  export const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error("Invalid email or password");
      }
  
      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error("Login failed. Please check your credentials and try again.");
    }
  };
  