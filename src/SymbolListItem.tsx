import { Button } from "@mantine/core";
import { Symbol, SymbolTable } from "./SymbolTable";
import SymbolDetails from "./SymbolDetails";

export interface SymbolListItemParams {
  activeElement: number,
  symbol: Symbol;
  symbolTable: SymbolTable;
  setActiveElement: React.Dispatch<React.SetStateAction<JSX.Element>>,
}

const SymbolListItem = (props: SymbolListItemParams | null) => {
  if (props) {
    const { symbol, symbolTable, setActiveElement, activeElement } = props;
    const enveloping_scope = symbolTable.scopes.find(
      (scope) => scope.my_id === symbol.name_id[0]
    )!;
    const name = enveloping_scope.names[symbol.name_id[1]] || "<Unnamed>";
    return (
      <div>
        <Button
            className={activeElement===symbol.my_id ? 'active_list_item' : 'list_item'}
            onClick={(event) => {
              setActiveElement(
                <SymbolDetails symbol={symbol} symbolTable={symbolTable}/>);
              event.preventDefault();
            }}
        >
          {symbol.my_id} {name}
        </Button>
      </div>
    );
  }
  return null;
};

export default SymbolListItem;
