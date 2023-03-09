import React from "react";

const LoginButton = () => {
  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a
      className={"p-2 w-16 bg-green text-white rounded-sm text-center"}
      href="/api/auth/login"
    >
      Login
    </a>
  );
};

export default LoginButton;
