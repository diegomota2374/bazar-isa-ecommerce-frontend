import Image from "next/image";

const CardMidHome: React.FC = () => {
  return (
    <>
      <div className="border-t-2 border-b-2 border-blue-300 py-8 px-2">
        <Image
          src={"/card-home/bazar-isa-bannerfull-1.jpg"}
          alt="Card mid home"
          width={1920}
          height={300}
          className="mx-auto w-full h-auto max-w-[500px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1200px]"
        />
      </div>
    </>
  );
};
export default CardMidHome;
