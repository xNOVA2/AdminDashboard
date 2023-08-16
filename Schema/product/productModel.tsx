import prisma from "@/prisma/connection/connection";
import { productType } from "./types/productType";

class productAdminService {

    public static async AddProduct(payload: productType) {
        const { title, content, Category, Brand, imageURL, discountPrice, price } = payload

        if (!title || !content || !Category || !imageURL || !discountPrice || !price) {
            throw new Error("Form is empty");
        }

        const product = await prisma.product.create({
            data: { title, content, Category, Brand, imageURL, discountPrice, price }
        })

        return product;
    }

    public static async getProducts(){
        const data = await  prisma.product.findMany();
        return data;
    }


    public static async DeleteProduct(id:number){
        const product = await prisma.product.delete({where:{id:id}});
        return product;
    }

    public static async SearchProduct(brand:string){
        try {
            const product  = await prisma.product.findMany({
                where:{
                    Brand: {
                        
                        contains: brand,
                      },
            }});
            return product
        } catch (error:any) {
            console.log(error.message);
            
        }
    
    }


}

export default productAdminService;