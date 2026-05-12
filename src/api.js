const BASE_URL = 'http://localhost:8000/api/';
const TOKEN = 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzc4NTY3MDAyLCJpYXQiOjE3Nzg1NjY3MDIsImp0aSI6ImVlNjE2ZGU0MjljZTQ2NWRiN2ZjMzljM2M1ODkxY2Q3IiwidXNlcl9pZCI6IjEifQ.nvbXxSxVS5q794_gWjurzKbNYahkRgm1dj_kU4d5ICI'; // Replace with your Postman token

export const recipeFetch = async (endpoint, options = {}) => {
      const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`,
            ...options.headers,
      };

      const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers,
      });

      if (response.status === 204) return null; // Handle successful deletes
      if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(errorBody.detail || 'API Error');
      }
      return response.json();
};