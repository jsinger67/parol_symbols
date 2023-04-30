import { Button } from "@mantine/core";
import { Scope, SymbolTable } from "./SymbolTable";
import ScopeDetails from "./ScopeDetails";

export interface ScopeListItemParams {
    scope: Scope
    symbolTable: SymbolTable;
    setActiveElement: React.Dispatch<React.SetStateAction<JSX.Element>>,
}

const ScopeListItem = (props: ScopeListItemParams) => {
    const { scope, symbolTable, setActiveElement } = props;
    let parent: number | null | string = scope.parent;
    if (parent === null) {
        parent = "<No parent>";
    }
    return <div>
        <Button
            className="list_item"
            onClick={(event) => {
                setActiveElement(
                  <ScopeDetails scope={scope} symbolTable={symbolTable}/>);
                event.preventDefault();
              }}
          >{scope.my_id} parent: {parent}</Button>
    </div>;
}

export default ScopeListItem;