import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  specs?: string[];
}

const ProductCard = ({ 
  id, 
  name, 
  price, 
  originalPrice, 
  image, 
  category, 
  inStock,
  specs = []
}: ProductCardProps) => {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  
  // Encode image URL to handle spaces and special characters
  const encodedImage = image ? encodeURI(image) : '';

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-border">
      <div className="relative overflow-hidden bg-muted aspect-square">
        <img 
          src={encodedImage} 
          alt={name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23f0f0f0" width="400" height="400"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="24" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
          }}
        />
        {discount > 0 && (
          <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
            -{discount}%
          </Badge>
        )}
        {!inStock && (
          <Badge className="absolute top-3 left-3 bg-muted text-muted-foreground">
            Out of Stock
          </Badge>
        )}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Link to={`/product/${id}`}>
            <Button variant="secondary" size="sm" className="gap-2">
              <Eye className="h-4 w-4" />
              Quick View
            </Button>
          </Link>
        </div>
      </div>

      <CardContent className="p-4">
        <Badge variant="outline" className="mb-2 text-xs">{category}</Badge>
        <Link to={`/product/${id}`}>
          <h3 className="font-semibold text-lg line-clamp-2 hover:text-primary transition-colors min-h-[3.5rem]">
            {name}
          </h3>
        </Link>
        
        {specs.length > 0 && (
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            {specs.slice(0, 2).map((spec, index) => (
              <li key={index} className="line-clamp-1">• {spec}</li>
            ))}
          </ul>
        )}

        <div className="mt-3 flex items-baseline gap-2">
          {price > 0 ? (
            <>
              <span className="text-2xl font-bold text-primary">AED {price.toLocaleString()}</span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  AED {originalPrice.toLocaleString()}
                </span>
              )}
            </>
          ) : (
            <span className="text-sm text-muted-foreground">Contact for price</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full gap-2" 
          disabled={!inStock}
          variant={inStock ? "default" : "secondary"}
        >
          <ShoppingCart className="h-4 w-4" />
          {inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
