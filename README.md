

# RUN PROJECT -->
https://react-application-w1wi.onrender.com


# Installed Dependencies
The following dependencies are installed in the project as per the package.json file:

Dependencies-->

:-@tailwindcss/vite: Tailwind CSS plugin for Vite.
:-axios: For making HTTP requests.
:-react: Core React library.
:-react-dom: React DOM library for rendering components.
:-react-icons: For using icons in the project.
:-react-router-dom: For routing and navigation.
:-tailwindcss: Utility-first CSS framework.

Assumptions and Considerations-->

1.Token Persistence:

The login token is stored in localStorage for persistence across sessions.
It is assumed that the token is valid and does not expire during the session. If token expiration is required, additional logic (e.g., token refresh) should be implemented.

2.API Endpoints:

The project uses the https://reqres.in API for user data and authentication. This is a mock API and may not support advanced features like token expiration or refresh.
