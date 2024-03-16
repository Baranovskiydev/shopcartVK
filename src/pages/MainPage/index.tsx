import { FC } from "react";
import Header from "../../components/Header";
import { CircularProgress, Grid, Paper } from "@mui/material";
import style from "./page.module.scss"
import { useGetCartByIdQuery } from "../../api/cartApi";
import List from "../../components/List";
import TotalCard from "../../components/TotalCard";

const Page: FC = () => {



    const { error, isLoading } = useGetCartByIdQuery(1);


    return(
        <>
            <Header/>
            {isLoading ? 
            <CircularProgress className={style.progress}/> : 
            error ? 
            "some error has occured" :
            <Grid container spacing={2} className={style.grid}>
                <Grid item xs = {9} className={style.grid__cell}>
                        <List/>
                </Grid>
                <Grid item xs = {3} className={style.grid__cell}>
                    <Paper >
                        <TotalCard/>
                    </Paper>
                </Grid>
            </Grid>
    }
        </>
    )
}

export default Page;