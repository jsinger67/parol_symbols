import { Text } from "@mantine/core";

export default function Scopes(props) {
    const { data } = props;
    if (data && data.scopes) {
        return (<>
            {
                data.scopes.map((scope) =>
                    <Text>Id: {scope.my_id}</Text>
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