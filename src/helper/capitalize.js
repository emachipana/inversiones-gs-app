function capitalize(str) {
  let data = str ? str.split(" ") : [];
  data = data.map((str) => str.charAt(0).toUpperCase() + str.slice(1));
  return data.join(" ");
}

export default capitalize;
