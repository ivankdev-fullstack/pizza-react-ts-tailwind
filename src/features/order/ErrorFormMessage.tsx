import { PropsWithChildren } from "react";

const ErrorFormMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;

  return <p className="absolute text-xs text-orange-600 mt-1">{children}</p>;
};

export default ErrorFormMessage;
