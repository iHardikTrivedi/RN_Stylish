import axios from "axios";

export const getErrorMessage = (e: unknown) => {
  if (axios.isAxiosError(e)) {
    const d: any = e.response?.data;
    return (
      d?.response?.message?.description ||
      d?.response?.message?.title ||
      e.message
    );
  }
  return e instanceof Error ? e.message : "Something went wrong";
};
