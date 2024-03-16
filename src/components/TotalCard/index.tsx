import { FC } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { Card, CardContent, Typography } from "@mui/material";
import { Cart } from "../../interfaces/Cart";



const TotalCard: FC = () => {

    const cart: Cart | undefined  = useAppSelector(state => state.cart.cart);

    if (cart){
        return(
            <Card sx={{marginTop: "25px"}}>
                <CardContent>
                    <Typography variant="h5" component={"h1"}>
                        Ваша корзина
                    </Typography>
                    <Typography variant="h6" sx={{display:"flex", justifyContent: "space-between"}}>
                        <span>
                            {`Items (${cart.totalProducts})`}
                        </span>
                        <span>
                            {`${cart.discountedTotal} $`}
                        </span>
                    </Typography>
                    <Typography variant="h6" color="red"  sx={{display:"flex", justifyContent: "space-between"}}>
                        <span>
                            Your discount:
                        </span>
                        <span>
                            {`${cart.total - cart.discountedTotal} $`}
                        </span>
                    </Typography>
                </CardContent>
            </Card>
        )
    }else{
        return (
        <Card>
            <Typography variant="h5" component={'span'}>
                Something wrong with your cart
            </Typography>
        </Card>)
    }
}

export default TotalCard;