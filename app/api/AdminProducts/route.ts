
import { NextResponse } from "next/server";
import productAdminService from "@/Schema/product/productModel";
import { productType } from "@/Schema/product/types/productType";

export  async function GET(request:Request){
    const data  = await productAdminService.getProducts()
    return NextResponse.json(data);
}

export async function POST(request:Request) {
    try {
    const payload:productType = await request.json();
    const data = await productAdminService.AddProduct(payload);
        return NextResponse.json(data,{status:201});
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}

