import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
} from "keep-react";

// Product component to display individual product details
const Product = ({ title, description, category, price, images }) => {
  return (
    <Card className="max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
      {/* Card Header with Product Image */}
      <CardHeader className="relative">
        <img
          src={images[0]} // Display the first image from the images array
          alt={title}
          className="w-full h-48 object-cover"
        />
      </CardHeader>

      {/* Card Content with Product Details */}
      <CardContent className="p-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Product Title */}
        <CardTitle className="text-xl font-bold text-gray-800 lg:col-span-4">
          {title}
        </CardTitle>

        {/* Product Description */}
        <CardDescription className="text-gray-600 lg:col-span-4">
          {description}
        </CardDescription>

        {/* Category and Price Section */}
        <div className="flex justify-between items-center text-gray-500 lg:col-span-2">
          <span className="text-sm uppercase tracking-wider">{category}</span>
          <span className="text-lg font-semibold text-gray-900">${price}</span>
        </div>

        {/* Buy Now Button */}
        <Button className="w-full mt-4 bg-blue-600 text-white py-2 px-2 rounded hover:bg-blue-700 transition duration-300 lg:col-span-2">
          Buy Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default Product;
