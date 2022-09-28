
export function getStack() {
  const stackError = new Error();

  // @ts-ignore
  console.log(stackError.stack);
}
