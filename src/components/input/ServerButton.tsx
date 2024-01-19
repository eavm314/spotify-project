// Not used
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  action?: (formData: FormData) => void;
}

export const ServerButton = ({ children, action }: Props) => {
  return (
    <form action={action}>
      <button
        className="bg-green-600 px-4 py-2 rounded-md md"
        type="submit"
      >
        {children}
      </button>
    </form>
  )
}
