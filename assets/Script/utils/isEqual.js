export default function isEqual(a, b) {
  const aProps = Object.keys(a);
  const bProps = Object.keys(b);
  let result = true;

  if (aProps.length !== bProps.length) {
    return false;
  }

  aProps.forEach((aProp) => {
    if (a[aProp] !== b[aProp]) {
      result = false;
    }
  });

  return result;
}
