
interface TextInputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function TextInput({
  id = "",
  value  = "",
  onChange,
  placeholder = "",
  className = "",
}: TextInputProps) {

  return (
    <input
      id={id}
      type="text"
      value={value}
      placeholder={placeholder}
      className={`w-full border border-slate-600 rounded px-2 ${className}`}
      onChange={(e) =>
        onChange(e.target.value)
      }
    />
  );
}