import VoiceInputButton from "./VoiceInputButton";

interface Props {
  id: string;
  title: string;
  value: string;
  error: string;
  placeholder: string;
  onChange: (value: string) => void;
  language: "ko-KR" | "zh-CN";
}

export default function ExampleInputSection({
  id,
  title,
  value,
  error,
  placeholder,
  language,
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
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="border border-primary/70 h-10 p-1 rounded-md"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-500">
          {error}
        </p>
      )}
      <VoiceInputButton
        language={language}
        onResult={(text) => onChange(text)}
      />
    </div>
  );
}
