import Image from "next/image";

interface MyCardImageProps {
  image: string | null;
  name: string;
}

const MyCardImage = ({ image, name }: MyCardImageProps) => {
  return (
    <div className="relative h-[156px] w-full min-w-[280px] sm:w-[280px]">
      <Image
        src={image || "/images/gathering_default.jpeg"}
        alt={name}
        className="h-full w-full rounded-3xl object-cover"
        fill
        sizes="(max-width: 640px) 100%"
      />
    </div>
  );
};

export default MyCardImage;
