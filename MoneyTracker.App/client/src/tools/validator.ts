export const validateUsername = (username:string) => {
    return username ? undefined : "Username is required";
  };
  
  export const validateEmail = (email:string) => {
    if (!email) {
      return "Email is required";
    }
  
    
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email) ? undefined : "Invalid email";
  };
  
  export const validatePassword = (password:string) => {
    return password && password.length >= 8 ? undefined : "Password must be at least 8 characters";
  };
  