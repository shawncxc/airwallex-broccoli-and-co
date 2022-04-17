export default function inputIsInvalid(data, setErr) {
  const { name, email, emailconfirm } = data;

  // check if empty
  if (!name) {
    setErr("Name can not be empty");
    return true;
  }
  if (!email) {
    setErr("Email can not be empty");
    return true;
  }
  if (!emailconfirm) {
    setErr("Please confirm your email");
    return true;
  }

  // check if name is valid
  if (name.length < 3) {
    setErr("Your name is too short");
    return true;
  }

  // check email syntax
  if (!email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )) {
    setErr("Your email is not valid");
    return true;
  }

  // check email vs email confirmation
  if (email !== emailconfirm) {
    setErr("Your email is not matching your email confirmation");
    return true;
  }

  return false;
};