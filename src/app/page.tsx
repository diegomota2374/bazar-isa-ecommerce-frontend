import CardMidHome from "../components/CardMidHome/CardMidHome";
import Carousel from "../components/Carousel/Carousel";

export default function Home() {
  return (
    <>
      <div className="flex-grow pb-10">
        <Carousel />
      </div>
      <div>
        <CardMidHome />
      </div>
    </>
  );
}
