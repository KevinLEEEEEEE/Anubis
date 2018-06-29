
const camelize = (context) => {
  let result = null;
  switch (context.length) {
    case 0:
      result = context;
      break;
    case 1:
      result = context.charAt(0).toUpperCase();
      break;
    default:
      result = context.charAt(0).toUpperCase() + context.substring(1);
      break;
  }
  return result;
};

camelize.prepend = (context, prepend) => {
  const tmp = camelize(context);
  return prepend + tmp;
};

export default camelize;
