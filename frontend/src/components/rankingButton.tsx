export const RankingButton = ({
  text,
  selected,
  onClick,
}: {
  text: String;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className={`${
        selected
          ? "bg-gradient-to-r from-blue-500 to-green-400 hover:from-green-400 hover:to-emerald-500 text-white"
          : "bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-400 hover:text-white"
      } border-2 border-green-300 p-2 rounded-md w-1/4 text-lg font-semibold`}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
};
