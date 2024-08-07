import { message } from "antd";
import { AxiosError } from "axios";

export const ErrHandling = async (err: unknown, customMsg: string) => {
  if (err instanceof AxiosError) {
    const errMsg = err?.response?.data?.message || customMsg;
    message.error(errMsg);
  } else {
    message.error(customMsg);
  }
};
