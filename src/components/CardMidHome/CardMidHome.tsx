import Image from "next/image";

const CardMidHome: React.FC = () => {
  return (
    <>
      <div className="border-t-4 border-b-4 border-blue-300 py-8 px-2">
        <Image
          src={"/card-home/card-mid-home.jpg"}
          alt="Card mid home"
          width={500}
          height={300}
          className="mx-auto"
        />
      </div>
    </>
  );
};
export default CardMidHome;
