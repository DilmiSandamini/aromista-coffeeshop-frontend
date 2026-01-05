import { motion } from "framer-motion";
import { Button } from "../components/mini_components/Button";
import { useCart } from "../context/CartContext";

interface ItemCardProps {
  item: any;
  index: number;
}

export const ItemCard = ({ item, index }: ItemCardProps) => {
  const isEven = index % 2 === 0;
  const isOutOfStock = item.availability === "UNAVAILABLE";

  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } 
            w-full bg-white md:bg-transparent overflow-hidden mb-10 md:mb-24 
            border md:border-none border-stone-100 rounded-[2.5rem] md:rounded-none shadow-sm md:shadow-none`}
    >
      {/* Image Section */}
      <div className="w-full md:w-[42%] h-[300px] md:h-[450px] flex-shrink-0 relative overflow-hidden group rounded-[2.5rem] shadow-md border-4 border-white">        <img
          src={
            item.imageUrl ||
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800"
          }
          alt={item.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            !isOutOfStock && "group-hover:scale-110"
          } ${isOutOfStock ? "grayscale opacity-50" : ""}`}
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center backdrop-blur-[2px]">
            <span className="bg-white/90 text-red-600 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div
        className={`w-full md:w-[58%] p-6 md:p-16 flex flex-col justify-center space-y-5 md:space-y-8 ${
          isEven ? "md:pl-16" : "md:pr-16"
        }`}
      >
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4a6741]">
            Selection No. {index + 1}
          </span>
          <h3
            className={`text-2xl md:text-5xl font-serif font-bold leading-tight ${
              isOutOfStock ? "text-stone-400" : "text-[#3e2723]"
            }`}
          >
            {item.name}
          </h3>
        </div>

        <p className="text-stone-500 text-sm md:text-lg italic font-serif leading-relaxed line-clamp-3">
          "{item.description}"
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-stone-50 md:border-none">
          <div className="flex flex-col">
            <span className="text-[9px] text-stone-400 font-bold uppercase tracking-widest mb-1">
              Price
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-bold text-[#4a6741]">LKR</span>
              <span className="text-xl md:text-3xl font-serif text-[#3e2723]">
                {item.price.toLocaleString()}
              </span>
            </div>
          </div>

          <Button
            disabled={isOutOfStock}
            onClick={() => addToCart(item)}
            className="..."
          >
            {isOutOfStock ? "Sold Out" : "Add to Order"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
