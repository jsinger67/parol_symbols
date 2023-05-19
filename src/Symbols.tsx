import { Text } from "@mantine/core";
import SymbolListItem from "./SymbolListItem";
import { SymbolTableParams } from "./SymbolTableParams";

export default function Symbols(props: SymbolTableParams) {
  if (props.symbolTable.symbols.length > 0) {
    const {
      symbolTable,
      setActiveElement,
      setActiveListElement,
      activeListElement,
    } = props;
    console.log(`Symbols: active element is ${activeListElement}`);
    return (
      <>
        {symbolTable.symbols.map((symbol) => {
          const setThisElementActive = (element: any) => {
            const {
              props: {
                symbol: { my_id },
              },
            } = element;
            // Set state in this component
            console.log(`setActiveListElement ${my_id}`);
            setActiveListElement(my_id);
            // Set state in outer component
            console.log(`setActiveElement ${element}`);
            setActiveElement(element);
          };
          return (
            <SymbolListItem
              key={symbol.my_id}
              symbol={symbol}
              symbolTable={symbolTable}
              setActiveElement={setThisElementActive}
              activeElement={activeListElement}
            />
          );
        })}
      </>
    );
  }
  return (
    <Text>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </Text>
  );
}
