import { Text } from "@mantine/core";
import ScopeListItem from "./ScopeListItem";
import { SymbolTableParams } from "./SymbolTable";

export default function Scopes(props: SymbolTableParams) {
    if (props.symbol_table.symbols.length > 0) {
        const { symbol_table } = props;
        return (<>
            {
                symbol_table.scopes.map((scope) =>
                    <ScopeListItem key={scope.my_id} scope={scope}/>
                )
            }
            </>);
        
    }
    return (
        <Text><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br>
        </br><br></br><br></br><br></br><br></br><br></br><br></br></Text>
    );
}