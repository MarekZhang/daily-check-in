import Image from "next/image";

export const GoldCrown = () => (
  <Image
    className="absolute -top-4 w-[20%] h-[20%]"
    src="/gold-crown.svg"
    alt="Icon"
    width={32}
    height={32}
  />
);

export const SilverCrown = () => (
  <Image
    className="absolute -top-4 w-[20%] h-[20%]"
    src="/silver-crown.svg"
    alt="Icon"
    width={32}
    height={32}
  />
);

export const BronzeCrown = () => (
  <Image
    className="absolute -top-4 w-[20%] h-[20%]"
    src="/bronze-crown.svg"
    alt="Icon"
    width={32}
    height={32}
  />
);
