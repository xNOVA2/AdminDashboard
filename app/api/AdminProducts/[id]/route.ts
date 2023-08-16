import productAdminService from "@/Schema/product/productModel";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { id: any } }) {
    const { id } = params;
    const numericId = parseInt(id, 10);

    console.log(typeof numericId); 

    const result = await productAdminService.DeleteProduct(numericId); // Use numericId here
    return NextResponse.json({ message: result });
}
