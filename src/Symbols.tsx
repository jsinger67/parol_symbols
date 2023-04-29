import { Text } from "@mantine/core";
import SymbolListItem from "./SymbolListItem";
import { SymbolTableParams } from "./SymbolTable";

export default function Symbols(props: SymbolTableParams) {
    if (props.symbol_table.symbols.length > 0) {
        const { symbol_table } = props;
        return (<>
            {
                symbol_table.symbols.map((symbol) =>
                    <SymbolListItem symbol={symbol} symbol_table={symbol_table}/>
                )
            }
            </>);
        
    }
    return (
        <Text><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br>
        </br><br></br><br></br><br></br><br></br><br></br><br></br></Text>
    );
}