import { Button } from "@mui/material";
import { useFormContext, } from "react-hook-form";

type Props = {
    sendData: (data: unknown) => void
}

export default function MuiButton(props: Props) {

    const { handleSubmit } = useFormContext();

    return (
        <>
            <Button
                variant="contained"
                type="submit"
                sx={{
                    margin: "1.5rem",
                    color: "white",
                    backgroundColor: "#222d32"
                }}
                onClick={handleSubmit(props.sendData)}
            >送信</Button>
        </>
    )
}
