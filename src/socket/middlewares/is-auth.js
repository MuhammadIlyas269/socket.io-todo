function isAuth(socket, next) {
  console.log("middleware");
  const err = new Error("middleware");
  // err.data = { content: "inside middleware error" };
  next();
}

module.exports = isAuth;
