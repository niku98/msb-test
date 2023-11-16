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

export default ProductCard;
