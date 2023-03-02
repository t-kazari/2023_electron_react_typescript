import { Container } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form"
import MuiButton from "./atom/MuiButton";
import MuiTextField from "./atom/MuiTextField";

export default function Form() {

    const methods = useForm({});

    const submit = (data: unknown) => {
        console.info(data);
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