import { TextProps } from "./props";

export const TitleText = ({ children }: TextProps) => {
  return (
    <h1 className="text-2xl">
      {children}
    </h1>
  )
}

export const SubTitleText = ({ children }: TextProps) => {
  return (
    <h2 className="text-xl">
      {children}
    </h2>
  )
}

export const Text = ({ children }: TextProps) => {
  return (
    <p className="text-base">
      {children}
    </p>
  )
}