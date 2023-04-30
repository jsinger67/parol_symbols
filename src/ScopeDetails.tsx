import { Divider, Space, Text } from "@mantine/core";
import { Scope, SymbolTable } from "./SymbolTable";

export interface ScopeDetailsParams {
    scope: Scope,
    symbolTable: SymbolTable,
    assert: React.Dispatch<React.SetStateAction<[boolean, string]>>
}

const ScopeDetails = (props: ScopeDetailsParams) => {
    const { scope, symbolTable, assert } = props;
    let parent: number | null | string = scope.parent;
    if (parent === null) {
        parent = "Global Scope";
    }
    return (
        <div className="details">
            <Text fw={700} td='underline'>Scope Details</Text>
            <Space h='md'/>
            <Text>Scope ID: {scope.my_id}</Text>
            {typeof parent === "number" && <Text>Parent ID: {parent}</Text>}
            {typeof parent === "string" && <Text>{parent}</Text>}
            <Space h='md'/>
            <Divider />
            <Space h='sm'/>
            <Text fw={700} td='underline'>Member Symbols</Text>
            <Space h='md'/>
            {scope.symbols.map((symbol) => {
                const sym = symbolTable.symbols[symbol];
                assert([scope.my_id === sym.name_id[0], "Scope mismatch in symbol's name id"]);
                const local_name_id = sym.name_id[1];
                return <Text>ID: {sym.my_id} Name: {scope.names[local_name_id] || "<Unnamed>"}</Text>;
            })}
        </div>
    );
}

export default ScopeDetails;