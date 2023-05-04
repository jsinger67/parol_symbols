import { Text } from "@mantine/core";
import { Symbol, SymbolTable } from "./SymbolTable";

export interface SymbolListItemParams {
  symbol: Symbol;
  symbolTable: SymbolTable;
}

const SymbolDetails = (props: SymbolListItemParams | null) => {
  if (props) {
    const { symbol, symbolTable } = props;
    const enveloping_scope = symbolTable.scopes.find(
      (scope) => scope.my_id === symbol.name_id[0]
    )!;
    const name = enveloping_scope.names[symbol.name_id[1]] || "<Unnamed>";
    return (
      <div className="details">
        <Text key={`symbol_detail_${symbol.my_id}`} className="list_item">
          {symbol.my_id} {name}
        </Text>
      </div>
    );
  }
  return null;
};

export default SymbolDetails;
