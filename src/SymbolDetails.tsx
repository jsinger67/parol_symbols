import { Text } from "@mantine/core";
import { Symbol, SymbolTable } from "./SymbolTable";

export interface SymbolListItemParams {
  symbol: Symbol;
  symbol_table: SymbolTable;
}

const SymbolDetails = (props: SymbolListItemParams | null) => {
  if (props) {
    const { symbol, symbol_table } = props;
    const enveloping_scope = symbol_table.scopes.find(
      (scope) => scope.my_id === symbol.name_id[0]
    )!;
    const name = enveloping_scope.names[symbol.name_id[1]] || "<Unnamed>";
    return (
      <div>
        <Text className="list_item">
          {symbol.my_id} {name}
        </Text>
      </div>
    );
  }
  return null;
};

export default SymbolDetails;
