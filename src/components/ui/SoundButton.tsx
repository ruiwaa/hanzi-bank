import { Volume2Icon } from "lucide-react";
interface Props {
  size?: number;
}
export default function SoundButton({ size }: Props) {
  return (
    <>
      <Volume2Icon
        size={size}
        className="text-primary bg-blue-100 rounded-full p-1.5 hover:text-green-500 hover:bg-green-200"
      />
    </>
  );
}
