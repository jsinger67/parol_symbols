import { Text } from "@mantine/core";
import ScopeListItem from "./ScopeListItem";
import { SymbolTableParams } from "./SymbolTable";

export default function Scopes(props: SymbolTableParams) {
    if (props.symbolTable.symbols.length > 0) {
        const { symbolTable, setActiveElement } = props;
        return (<>
            {
                symbolTable.scopes.map((scope) =>
                    <ScopeListItem
                        key={scope.my_id}
                        scope={scope}
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