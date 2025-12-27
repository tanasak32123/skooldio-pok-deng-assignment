export function parseNumber(input: string): number {
  const value = Number(input);

  if (Number.isNaN(value)) {
    throw new Error(`${input} is not a valid number`);
  }

  return value;
}
