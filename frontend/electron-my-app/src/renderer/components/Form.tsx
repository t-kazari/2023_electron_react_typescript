import { Container } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form"
import MuiButton from "./atom/MuiButton";
import MuiTextField from "./atom/MuiTextField";
import axios from "axios";

export default function Form() {

    const methods = useForm({});

    const submit = async (data: unknown) => {
        console.info(data);

        const url = 'http://localhost:8000/fastapi/api/v1/formdata';
        const param = {
            param1: "aaa",
            param2: "bbb",
            param3: "ccc"
        }
        const response = await axios.post(url, param, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.info(response.data);
    }

    return (
        <>
            <Container maxWidth="xs" sx={{ mt: 6 }}>
                <FormProvider {...methods}>
                    <MuiTextField />
                    <MuiButton sendData={submit} />
                </FormProvider>
            </Container>
        </>
    )
}