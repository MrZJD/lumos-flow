
export const ESBUILD = 'esbuild';

export const logger = (str: string) => {
  console.time(`${ESBUILD}: ${str}`);
}
