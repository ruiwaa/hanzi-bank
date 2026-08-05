import VoiceInputButton from "./VoiceInputButton";

interface Props {
  id: string;
  title: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export default function ExampleInputSection({
  id,
  title,
  value,
  placeholder,
  onChange,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-semibold">
        {title}
      </label>
      <textarea
        id={id}
        value={value}
        className="border border-primary/70 h-10 p-1 rounded-md"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      <VoiceInputButton />
    </div>
  );
}
