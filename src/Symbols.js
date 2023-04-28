import { Text } from "@mantine/core";
import SymbolListItem from "./SymbolListItem";

export default function Symbols(props) {
    const { data } = props;
    if (data && data.symbols) {
        return (<>
            {
                data.symbols.map((symbol) =>
                    <SymbolListItem symbol={symbol} data={data}/>
                )
            }
            </>);
        
    }
    return (
        <Text>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </Text>
    );
}