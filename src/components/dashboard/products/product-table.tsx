"use client";

import Image from "next/image";


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  MoreHorizontal,
  Star,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";
import { Product } from "@/types/product-types";

interface ProductTableProps {
  products: Product[];
}

export function ProductTable({
  products,
}: ProductTableProps) {
  return (
    <div className="rounded-xl border bg-background overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-[60px]" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              {/* Thumbnail */}

              <TableCell>
                <div className="relative h-14 w-14 overflow-hidden rounded-lg border">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </TableCell>

              {/* Product Info */}

              <TableCell>
                <div className="space-y-1">
                  <h4 className="font-medium leading-none">
                    {product.title}
                  </h4>

                  <p className="text-xs text-muted-foreground">
                    {product.sku}
                  </p>

                  <div className="flex gap-2">
                    <Badge variant="secondary">
                      {product.brand}
                    </Badge>

                    <Badge variant="outline">
                      {product.category}
                    </Badge>
                  </div>
                </div>
              </TableCell>

              {/* Category */}

              <TableCell>
                {product.category}
              </TableCell>

              {/* Price */}

              <TableCell>
                <div className="space-y-1">
                  <p className="font-medium">
                    ${product.price}
                  </p>

                  {product.discountPercentage > 0 && (
                    <Badge
                      variant="secondary"
                      className="text-green-600"
                    >
                      {product.discountPercentage}% OFF
                    </Badge>
                  )}
                </div>
              </TableCell>

              {/* Stock */}

              <TableCell>
                <Badge
                  variant={
                    product.stock > 20
                      ? "default"
                      : "secondary"
                  }
                >
                  {product.stock} pcs
                </Badge>
              </TableCell>

              {/* Rating */}

              <TableCell>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

                  <span>{product.rating}</span>

                  <span className="text-muted-foreground text-xs">
                    ({product.reviews.length})
                  </span>
                </div>
              </TableCell>

              {/* Status */}

              <TableCell>
                <Badge
                  className={
                    product.availabilityStatus ===
                      "In Stock"
                      ? ""
                      : "bg-red-500"
                  }
                >
                  {product.availabilityStatus}
                </Badge>
              </TableCell>

              {/* Created */}

              <TableCell>
                {new Date(
                  product.meta.createdAt
                ).toLocaleDateString()}
              </TableCell>

              {/* Actions */}

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button
                      size="icon"
                      variant="ghost"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem className="text-red-500">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}