import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
}

const ProductCard = ({ title, description, image }: ProductCardProps) => {
  return (
    <div className="bg-background rounded-2xl overflow-hidden flex flex-col">
      <img
        className="object-cover w-full"
        src={image}
        width={333}
        height={210}
      />
      <div className="py-6 px-4 flex-grow flex flex-col items-start">
        <h4 className="mb-2 text-lg font-bold">{title}</h4>
        <p className="mb-4 text-base font-normal flex-grow">{description}</p>

        <Button variant="text" className="px-3">
          Khám phá ngay <ArrowRight className="text-xl" />
        </Button>
      </div>
    </div>
  );
};

ProductCard.Skeleton = () => (
  <div className="bg-background rounded-2xl overflow-hidden flex flex-col">
    <Skeleton className="w-[333px] h-[210px]" />

    <div className="py-6 px-4 flex-grow flex flex-col items-start">
      <Skeleton className="w-28 h-5" />
      <div className="flex-grow mt-4 space-y-2">
        <Skeleton className="w-44 h-3" />
        <Skeleton className="w-48 h-3" />
        <Skeleton className="w-52 h-3" />
      </div>
      <Skeleton className="w-32 h-10" />
    </div>
  </div>
);

export default ProductCard;
