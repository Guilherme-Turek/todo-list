import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CompletedTasks } from '../pages/CompletedTasks';
import { ErasedTasks } from '../pages/ErasedTasks';
import { Home } from '../pages/Home';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />
  },
  {
    path: '/register',
    element: <SignUp />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/trash',
    element: <ErasedTasks />
  },
  {
    path: '/completed-tasks',
    element: <CompletedTasks />
  }
]);

export const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};
