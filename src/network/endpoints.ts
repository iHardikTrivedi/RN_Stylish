export const Endpoints = {
  auth: {
    login: () => "/login",
    register: () => "/register",
  },
  users: {
    list: (page: number) => `/users?page=${page}`,
    detail: (id: number) => `/users/${id}`,
  },
} as const;
