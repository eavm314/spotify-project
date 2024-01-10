import { TextProps } from "./props";

export const SubTitleText = ({ children }: TextProps) => {
  return (
    <h2 className="text-xl">
      {children}
    </h2>
  )
}