interface Props {
  text: string;
}

export const ComboBox = ({ text }: Props) => {
  return (
    <div className="bg-white text-black 
      rounded-full px-3 py-1
      flex justify-between"
    >
      <p className="text-lg font-semibold">
        {text}
      </p>
      <div className="">
        {/* TODO: Insert Expand Icon */}
        v
      </div>
    </div>
  )
}
