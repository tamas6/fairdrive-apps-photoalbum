type InputTypes = 'text' | 'password';

type Props = {
  type?: InputTypes;
  label?: string;
  placeholder?: string;
};

const TextInput = ({ type = 'text', label, placeholder }: Props) => {
  return (
    <div className="mb-8">
      {!!label && <label className="block mb-3">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        className="text-purple border-blue border-2 rounded-lg py-2.5 px-4 w-full md:w-1/3"
      />
    </div>
  );
};

export default TextInput;
