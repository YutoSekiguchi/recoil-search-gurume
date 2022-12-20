export const fetcher = async (args: string): Promise<HotpepperResponseType> => {
  const response = await fetch(args);
  return (await response.json()) as HotpepperResponseType;
}