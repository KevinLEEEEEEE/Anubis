export default function isEqual(a, b) {
  let result = true;

  if (Object.keys(a).length !== Object.keys(b).length) {
    result = false;
  }

  Object.keys(a).forEach((key) => {
    if (!(Reflect.has(b, key) && a[key] === b[key])) {
      result = false;
    }
  });

  return result;
}
