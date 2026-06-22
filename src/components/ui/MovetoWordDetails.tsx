export default function MovetoWordDetails() {
  return (
    <button
      type="button"
      className="group
  relative
  overflow-hidden
  bg-primary
  text-white
  rounded-xl
  px-4 py-2
  font-semibold
  whitespace-nowrap
  w-30
  transition-colors
  hover:bg-blue-500/80
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-primary
  focus-visible:ring-offset-2"
    >
      <span>학습하기</span>
      <span aria-hidden="true">
        <span
          className="
      absolute
      top-2
      left-5
      size-2
      rounded-full
      bg-pink-100

      opacity-0
      scale-0
      transition-all
      duration-300

      group-hover:opacity-100
      group-hover:scale-100

      group-focus-visible:opacity-100
      group-focus-visible:scale-100
    "
        />

        <span
          className="
      absolute
      top-2/3
      left-2
      size-2.5
      -translate-y-1/2
      rounded-full
      bg-pink-100

      opacity-0
      scale-0
      transition-all
      duration-300
      delay-75

      group-hover:opacity-100
      group-hover:scale-100

      group-focus-visible:opacity-100
      group-focus-visible:scale-100
    "
        />

        <span
          className="
      absolute
      bottom-1
      right-2
      size-3
      rounded-full
      bg-pink-100

      opacity-0
      scale-0
      transition-all
      duration-300
      delay-150

      group-hover:opacity-100
      group-hover:scale-100

      group-focus-visible:opacity-100
      group-focus-visible:scale-100
    "
        />
      </span>
    </button>
  );
}
