export const navLinks = {
  pageLinks: [
    {
      name: "HOME",
      text: "Home",
      linkTo: "/",
      public: true,
    },
    {
      name: "KNIVES",
      text: "Knives",
      linkTo: "/shop",
      public: true,
    },
  ],
  userLinks: [
    {
      name: "CART",
      text: "My cart",
      linkTo: "/user/cart",
      public: false,
    },
    {
      name: "ACCOUNT",
      text: "My Account",
      linkTo: "/user/dashboard",
      public: false,
    },
    {
      name: "LOGIN",
      text: "Log In",
      linkTo: "/register-login",
      public: true,
    },
    {
      name: "LOGOUT",
      text: "Log Out",
      linkTo: "/user/logout",
      public: false,
    },
  ],
};
