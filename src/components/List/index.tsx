import { FC } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { productsSelector } from "../../selectors/cartSelector";

import { Product } from "../../interfaces/Product";
import ItemCard from "../ItemCard";



const List: FC = () => {

    const products = useAppSelector(productsSelector);

    return(
    <>
            {products?.length ? products.map((product: Product) => {
                return <ItemCard
                info={ product }                    
                />
            }) : "Cart is Empty"}
    </>)
}

export default List