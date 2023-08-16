import productAdminService from "@/Schema/product/productModel";
import { NextResponse } from "next/server";

export async function GET(request:Request,{params}:{params:{brand:string}}) {
    try {
        const {brand} = params;

        const List = await productAdminService.SearchProduct(brand);
        return NextResponse.json(List);
    } catch (error:any) {
        return NextResponse.json({error:error.message})
    }
  

}