await new Promise((resolve) => setTimeout(resolve, 1000));
console.log("finished async work");

export const double = async (value) => {
  return value * 2;
};
