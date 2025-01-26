import { ChangeEventHandler, FC } from "react";

type Props = {
  labelName: string;
  placeholder?: string;
  marginTop?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>
};

export const Input: FC<Props> = ({
  labelName,
  placeholder,
  marginTop,
  onChange,
}) => {
  const mt = marginTop && "mt-3";
  return (
    <label className={`block ${mt}`}>
      {labelName}
      <input
        type="text"
        placeholder={placeholder}
        className="border-black border-2 block bg-origin-padding hover:bg-red-50 rounded"
        onChange={onChange}
      />
    </label>
  );
};
