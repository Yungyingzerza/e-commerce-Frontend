import { API } from "../constants/API";
const getCsrfToken = async () => {
    try {
      // First, get the CSRF cookie from Laravel's sanctum endpoint
      await fetch(API.csrf, {
        credentials: 'include', // Important for cookies to be set
      });
  
      // Get the XSRF-TOKEN from cookies
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];
  
      if (!token) {
        throw new Error('CSRF token not found');
      }
  
      // Decode the token since Laravel encodes it
      return decodeURIComponent(token);
    } catch (error) {
      console.error('Error getting CSRF token:', error);
      throw error;
    }
  };
  
  // Example API function using the CSRF token
  const apiRequest = async (url, options = {}) => {
    try {
      const token = await getCsrfToken();
      const tokenAuth = localStorage.getItem('token')
  
      const defaultOptions = {
        credentials: 'include', // Important for cookies
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-XSRF-TOKEN': token,
          'Authorization': `Bearer ${tokenAuth}`
        },
      };
  
      const response = await fetch(url, {
        ...defaultOptions,
        ...options,
        headers: {
          ...defaultOptions.headers,
          ...options.headers,
        },
      });
  

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  };

export default apiRequest;