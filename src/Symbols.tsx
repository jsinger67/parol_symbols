import { Text } from "@mantine/core";
import SymbolListItem from "./SymbolListItem";
import { SymbolTableParams } from "./SymbolTable";

export default function Symbols(props: SymbolTableParams) {
    if (props.symbolTable.symbols.length > 0) {
        const { symbolTable, setActiveElement } = props;
        return (<>
            {
                symbolTable.symbols.map((symbol) =>
                    <SymbolListItem
                        key={symbol.my_id}
                        symbol={symbol}
                        symbolTable={symbolTable}
                        setActiveElement={setActiveElement}/>
                )
            }
            </>);
        
    }
    return (
        <Text><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br>
        </br><br></br><br></br><br></br><br></br><br></br><br></br></Text>
    );
}