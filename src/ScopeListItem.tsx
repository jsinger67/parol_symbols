import { Button } from "@mantine/core";
import { Scope } from "./SymbolTable";

export interface ScopeListItemParams {
    scope: Scope
}

const ScopeListItem = (props: ScopeListItemParams) => {
    const { scope } = props;
    let parent: number | null | string = scope.parent;
    if (parent === null) {
        parent = "<No parent>";
    }
    return <div><Button className="list_item">{scope.my_id} parent: {parent}</Button></div>;
}

export default ScopeListItem;