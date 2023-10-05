import Image from "next/image";

export default function FigureComponent() {
  return (
    <figure>
      <Image
        src={"/icon.png"}
        alt="Picture of the author"
        width={120}
        height={120}
        loading="lazy"
      />
    </figure>
  );
}
