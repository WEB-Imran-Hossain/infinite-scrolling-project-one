import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
} from "keep-react";

const Product = ({ title, description, category, price, images }) => {
  return (
    <Card>
    <CardHeader>
      <img src={images} className="rounded-t-xl" alt="image" width={600} height={300} />
    </CardHeader>
    <CardContent className="space-y-3">
      <CardTitle>{title}</CardTitle>
      <CardDescription>
        {description}
      </CardDescription>
      
    </CardContent>
  </Card>
  );
};

export default Product;
