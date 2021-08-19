let token = 'effb97f202e1c57d6b1c37c50b76dde1b7859a5e4566281c';
let url = 'https://scholarlee.herokuapp.com/api/students';

export const server_calls = {
  get: async () => {
    const response = await fetch('https://scholarlee.herokuapp.com/api/students', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('failed to fetch data from server');
    }
    return await response.json();
  },
  create: async (data: any = {}) => {
    const response = await fetch('https://scholarlee.herokuapp.com/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to Create new data on server');
    }

    return await response.json();
  },
  update: async (id: string, data: any = {}) => {
    const response = await fetch(`https://scholarlee.herokuapp.com/api/students/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
  },
  delete: async (id: string) => {
    const response = await fetch(`https://scholarlee.herokuapp.com/api/students/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      }
    });
  }
};
