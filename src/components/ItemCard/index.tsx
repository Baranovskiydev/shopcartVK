import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { FC } from "react";
import { Product } from "../../interfaces/Product";
import { Add, Remove, RemoveShoppingCart } from "@mui/icons-material";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { decrementAmount, deleteItem, incrementAmount } from "../../slices/cartSlice";

interface CardProps{
    info: Product;
}

const ItemCard: FC<CardProps> = ({info}) => {

    const dispath = useAppDispatch();

     const onClickHandler = (action: 'delete' | 'increment' | 'decrement', id: number) => {
            switch (action) {
                case 'delete':
                    dispath(deleteItem(id))
                    break;
                case 'increment':
                    dispath(incrementAmount(id))
                    break;
                case 'decrement':
                    dispath(decrementAmount(id))
                    break;
                default:
                    throw new Error('Unpredicted behaviour')
            }
            
        }

    if(info){
        const DefaulPrice = (
            <Box sx={{textDecoration: "line-through"}} component='span'>
                {info.total}$
            </Box>
            )
        return (
            <Card sx={{margin: "25px"}}>
                <CardContent sx={{display:"flex"}}>
                    <CardMedia
                        component="img"
                        sx={{ width: 200 , borderRadius: "20px", border: "5px solid #e9b900"}}
                        src={info.thumbnail}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent>
                            <Typography variant="h5" component='h1'>
                                {info.title}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="h2">
                                {`Discount: ${info.discountPercentage}%`}
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Amount: {info.quantity} 
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Price per item: {info.price} 
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Price without discount: {DefaulPrice} 
                            </Typography>
                            <Typography variant="h5" sx={{textDecoration: "underline"}}>
                                Total price with discount:  {info.discountedPrice}$
                            </Typography>
                        </CardContent>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: "column",
                        marginLeft: 'auto',
                        marginTop: 'auto',
                        gap: "20px",
                    }}>
                    <Box sx={{ 
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: "center", 
                        gap: "5px" 
                        }}>
                        {info.quantity > 1 ?
                        <Button 
                            disableElevation 
                            variant="outlined"
                            onClick={() => onClickHandler('decrement', info.id)}>
                                <Remove/>
                        </Button>: 
                        <Button 
                            disabled
                            disableElevation 
                            variant="outlined"
                            onClick={() => onClickHandler('decrement', info.id)}>
                                <Remove/>
                        </Button>}
                        
                        <Typography>
                            {info.quantity}
                        </Typography>
                        { info.quantity < 10 ?
                        <Button 
                            disableElevation 
                            variant="outlined"
                            onClick={() => onClickHandler('increment', info.id)}>
                                <Add/>
                        </Button> : 
                        <Button
                            disabled
                            disableElevation 
                            variant="outlined"
                            onClick={() => onClickHandler('increment', info.id)}>
                                <Add/>
                        </Button>}
                    </Box>
                    <Button 
                        variant="contained" 
                        color="error"
                        onClick={() => onClickHandler('delete', info.id)}
                    >
                        <RemoveShoppingCart/>
                        Delete Item
                    </Button>
                    </Box>
                    
                </CardContent>
            </Card>
        )
    }else{
        return (
            <div>"Choose the item to show more info</div>
        )
    }
} 

export default ItemCard;