import { Button, ButtonGroup } from "@chakra-ui/react";

const Login = ({userFunction, ...props}) => {

    const handleUser = () => {
        userFunction("End User");
    }

    const handleAdmin = () => {
        userFunction("Admin");
    }

    return (
        <ButtonGroup {...props}>
            <Button onClick={handleUser}>End User</Button>
            <Button onClick={handleAdmin}>Admin</Button> 
        </ButtonGroup>
    )
}

export default Login