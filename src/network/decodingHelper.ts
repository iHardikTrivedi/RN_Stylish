export const ensureObject = (data: unknown) => {
  if (!data || typeof data !== "object") throw new Error("Response is not an object");
  return data as Record<string, any>;
};
