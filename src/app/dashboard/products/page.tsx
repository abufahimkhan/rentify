
import { ProductTable } from "@/components/dashboard/products/product-table"

export default async function Page() {
  const res = await fetch("http://localhost:3000/api/products");
  const data = await res.json();

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

          <div className="px-4 lg:px-6">
            <ProductTable products={data.products} />
          </div>
        </div>
      </div>
    </div>
  )
}
