import { Promotions } from "./promotions";

export class Product {
    id: string;
    name: string;
    price: number;
    promotions: Array<Promotions>;
    quantity?: number;
    promoPrice?: number;
}
