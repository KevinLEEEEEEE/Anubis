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

camelize.insertBefore = (context, before) => before + camelize(context);

camelize.insertAfter = (context, after) => camelize(context) + after;

camelize.insertBoth = (before, context, after) => before + camelize(context) + after;

export default camelize;
