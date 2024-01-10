import { TextProps } from "./props";

export const Text = ({ children }: TextProps) => {
  return (
    <p className="text-base">
      {children}
    </p>
  )
}