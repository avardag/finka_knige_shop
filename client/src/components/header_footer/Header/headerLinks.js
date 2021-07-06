export const navLinks = {
  pageLinks: [
    {
      name: "Home",
      linkTo: "/",
      public: true,
    },
    {
      name: "Knives",
      linkTo: "/shop",
      public: true,
    },
  ],
  userLinks: [
    {
      name: "My cart",
      linkTo: "/user/cart",
      public: false,
    },
    {
      name: "My Account",
      linkTo: "/user/dashboard",
      public: false,
    },
    {
      name: "Log In",
      linkTo: "/register-login",
      public: true,
    },
    {
      name: "Log Out",
      linkTo: "/user/logout",
      public: false,
    },
  ],
};
