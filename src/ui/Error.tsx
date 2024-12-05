import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Error() {
  const error = useRouteError() as { statusText: string };

  return (
    <div className="flex flex-col justify-center items-center py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
        404
      </h1>
      <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl dark:text-primary-100">
        {error.statusText}
      </p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
