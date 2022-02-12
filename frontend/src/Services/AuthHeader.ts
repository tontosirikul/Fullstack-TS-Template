export default function AuthHeader() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user && user.userwithtoken) {
    return { Authorization: "Bearer " + user.userwithtoken };
  } else {
    return {};
  }
}
