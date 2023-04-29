import { Button } from "@mantine/core";
import { Scope } from "./SymbolTable";

export interface ScopeListItemParams {
    scope: Scope
}

const ScopeListItem = (props: ScopeListItemParams) => {
    const { scope } = props;
    const parent = scope.parent || "<no parent>"
    return <div><Button className="list_item">{scope.my_id} parent: {parent}</Button></div>;
}

export default ScopeListItem;