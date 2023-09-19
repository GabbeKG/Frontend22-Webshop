import { Product } from "./App";

interface Props{
    products: Product[];

}

export default function GetProducts(props:Props){
return(
    <div>
        <h2>Products!</h2>
        <ul>
            {props.products.map((p)=>(
                <li >{p.name}<br/> {p.price} SEK</li>
            ))}
        </ul>

    </div>
)
}