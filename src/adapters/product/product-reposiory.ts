import { Product } from "@prisma/client";

export interface ProductRepository {
    create(product: Product): Promise<void>;
    update(product: Product): Promise<Product>;
    delete(product: Product): Promise<boolean>;
    getById(id: string): Promise<Product>;
}