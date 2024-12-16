export const registerUser = async (username: string, email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register user");
      }
  
      return await response.json(); // Return de succesvolle respons
    } catch (error: any) {
      throw new Error(error.message || "An unexpected error occurred");
    }
  };
  