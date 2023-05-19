import { Divider, Grid, Space, Text } from "@mantine/core";
import { SymbolTable } from "./bindings/SymbolTable";
import { Scope } from "./bindings/Scope";
import { ScopeId } from "./bindings/ScopeId";
import { Type } from "./bindings/Type";
import { Symbol } from "./bindings/Symbol";
import { getSymbolName } from "./SymbolDetails";

export interface ScopeDetailsParams {
  scope: Scope;
  symbolTable: SymbolTable;
  // assert: React.Dispatch<React.SetStateAction<[boolean, string]>>;
}

const getScopeCreatingSymbol = (scope_id: ScopeId, symbolTable: SymbolTable): Symbol | undefined => {
  const symbol = symbolTable.symbols.find(
    (symbol) => {
      if ("Type" in symbol.kind) {
        let type_symbol: Type = symbol.kind.Type;
        return type_symbol.member_scope === scope_id;
      } else {
        return false;
      }
    }
  )!;
  return symbol;
}


const ScopeDetails = (props: ScopeDetailsParams) => {
  const { scope, symbolTable } = props;
  let parent: number | null = scope.parent;
  let parent_name = "<Undefined>";
  if (parent === null) {
    parent_name = "Global Scope";
  }
  let name = "<Undefined>";
  let scope_creating_symbol = getScopeCreatingSymbol(scope.my_id, symbolTable);
  if (scope_creating_symbol !== undefined) {
    name = `#${scope_creating_symbol.my_id} ` +
      `"${getSymbolName(scope_creating_symbol, symbolTable)}"`;
  }
  if (parent !== null) {
    let parent_scope_creating_symbol = getScopeCreatingSymbol(parent, symbolTable);
    if (parent_scope_creating_symbol !== undefined) {
      parent_name =
        `#${parent_scope_creating_symbol.my_id} ` +
        `"${getSymbolName(parent_scope_creating_symbol, symbolTable)}"`;
    }
  }
  return (
    <div className="details">
      <Text fw={700} td="underline">
        Scope Details
      </Text>
      <Space h="md" />
      <Text>Scope ID: {scope.my_id} ({name})</Text>
      {typeof parent === "number" && <Text>Parent ID: {parent} ({parent_name})</Text>}
      {typeof parent === "string" && <Text>{parent}</Text>}
      <Space h="md" />
      <Divider />
      <Space h="sm" />
      <Text fw={700} td="underline">
        Member Symbols
      </Text>
      <Space h="md" />
      <Grid
        className="boxed"
        columns={2}
        justify="left"
        sx={{ overflow: "auto" }}
      >
        {scope.symbols.map((symbol) => {
          const sym = symbolTable.symbols[symbol];
          if (scope.my_id !== sym.name_id[0]) {
            // Set state of outer component in child's render is bad.
            // But this should not occur at all here.
            // assert([false, "Scope mismatch in symbol's name id"]);
          }
          const local_name_id = sym.name_id[1];
          return (
            <>
              <Grid.Col className="boxed" span={1}>
                ID: {sym.my_id}
              </Grid.Col>
              <Grid.Col className="boxed" span={1}>
                '{scope.names[local_name_id] || "<Unnamed>"}'
              </Grid.Col>
            </>
          );
        })}
      </Grid>
    </div>
  );
};

export default ScopeDetails;
