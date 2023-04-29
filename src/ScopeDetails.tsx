import { Text } from "@mantine/core";
import { Scope, SymbolTable } from "./SymbolTable";

export interface ScopeDetailsParams {
    scope: Scope,
    symbol_table: SymbolTable,
}

const ScopeDetails = (props: ScopeDetailsParams) => {
    const { scope } = props;
    let parent: number | null | string = scope.parent;
    if (parent === null) {
        parent = "<No parent>";
    }
    return <div><Text className="list_item">{scope.my_id} parent: {parent}</Text></div>;
}

export default ScopeDetails;