import { Button } from "@mantine/core";
import { Symbol, SymbolTable } from "./SymbolTable";

export interface SymbolListItemParams {
  symbol: Symbol;
  symbol_table: SymbolTable;
}

const SymbolListItem = (props: SymbolListItemParams | null) => {
  if (props) {
    const { symbol, symbol_table } = props;
    const enveloping_scope = symbol_table.scopes.find(
      (scope) => scope.my_id === symbol.name_id[0]
    )!;
    const name = enveloping_scope.names[symbol.name_id[1]] || "<Global Scope>";
    return (
      <div>
        <Button className="list_item">
          {symbol.my_id} {name}
        </Button>
      </div>
    );
  }
  return null;
};

export default SymbolListItem;
