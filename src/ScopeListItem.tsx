import { Button } from "@mantine/core";
import { Scope, SymbolTable } from "./SymbolTable";
import ScopeDetails from "./ScopeDetails";

export interface ScopeListItemParams {
    activeElement: number,
    scope: Scope
    symbolTable: SymbolTable;
    setActiveElement: React.Dispatch<React.SetStateAction<JSX.Element>>,
    assert: React.Dispatch<React.SetStateAction<[boolean, string]>>
}

const ScopeListItem = (props: ScopeListItemParams) => {
    const { activeElement, scope, symbolTable, setActiveElement, assert } = props;
    if (activeElement !== -1) {
        console.log(`ScopeListItem: active element is ${activeElement}`);
    }
    let parent: number | null | string = scope.parent;
    if (parent === null) {
        parent = "<No parent>";
    }
    return <div>
        <Button
            className={activeElement===scope.my_id ? 'active_list_item' : 'list_item'}
            onClick={(event) => {
                setActiveElement(
                  <ScopeDetails scope={scope} symbolTable={symbolTable} assert={assert}/>);
                event.preventDefault();
              }}
          >{scope.my_id} parent: {parent}</Button>
    </div>;
}

export default ScopeListItem;