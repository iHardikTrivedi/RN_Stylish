export const Endpoints = {
  auth: {
    login: () => "/auth/login",
    register: () => "/auth/register",
    forgotPassword: () => "/auth/reset-password",
  },
  users: {
    // list: (page: number) => `/users?page=${page}`,
    // detail: (id: number) => `/users/${id}`,
  },
} as const;
