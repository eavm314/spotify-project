import { TextProps } from "./props";

export const TitleText = ({ children }: TextProps) => {
  return (
    <h1 className="text-2xl">
      {children}
    </h1>
  )
}