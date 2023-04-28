import { Text } from "@mantine/core";

export default function Symbols(props) {
    const { data } = props;
    if (data && data.symbols) {
        return (<>
            {
                data.symbols.map((symbol) =>
                    <Text>Id: {symbol.my_id}, Name: {symbol.name_id[0]}, {symbol.name_id[1]}</Text>
                )
            }
            </>);
        
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