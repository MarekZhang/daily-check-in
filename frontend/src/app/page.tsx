import Image from "next/image";
const GoldCrown = () => (
  <Image
    className="absolute -top-4"
    src="/gold-crown.svg"
    alt="Icon"
    width={32}
    height={32}
  />
);

const SilverCrown = () => (
  <Image
    className="absolute -top-4"
    src="/silver-crown.svg"
    alt="Icon"
    width={32}
    height={32}
  />
);

const BronzeCrown = () => (
  <Image
    className="absolute -top-4"
    src="/bronze-crown.svg"
    alt="Icon"
    width={32}
    height={32}
  />
);

export default function Home() {
  return (
    <>
      <div className="max-w-7xl mx-auto flex flex-col justify-center items-center mt-16">
        <p className="text-4xl font-bold">Leaderboard</p>
        {/* First three display */}
        <div className="shadow-md rounded-2xl w-2/3 pb-4 flex flex-col items-center justify-center mt-10 border border-gray-200">
          {/* Ranking Method Button */}
          <div className="mt-10 flex justify-between space-x-4 w-2/3">
            <button className="border p-2 bg-gradient-to-r from-blue-500 to-green-400 rounded-md w-1/4 text-lg font-semibold text-white">
              Today
            </button>
            <button className="border p-2 bg-green-300 rounded-md w-1/4 text-lg font-semibold">
              Week
            </button>
            <button className="border p-2 bg-green-300 rounded-md w-1/4 text-lg font-semibold">
              All Time
            </button>
          </div>
          {/* Avatar Display */}
          <div className="mt-12 mb-4 flex items-center justify-center space-x-12">
            <div className="relative w-[120px] h-[120px] rounded-full border-4 border-gray-200 flex items-start justify-center">
              <SilverCrown />
            </div>
            <div className="relative w-32 h-32 rounded-full border-yellow-300 border-4 flex items-start justify-center">
              <GoldCrown />
            </div>
            <div className="relative w-[110px] h-[110px] rounded-full border-4 border-orange-200 flex items-start justify-center">
              <BronzeCrown />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
