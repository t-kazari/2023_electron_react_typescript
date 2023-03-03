import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import Papa from 'papaparse';

interface CsvData {
    column1: string;
    column2: string;
    column3: string;
    column4: string;
    column5: string;
    column6: number;
    column7: number;
}

export default function UploadDialog() {

    const [open, setOpen] = useState<boolean>(false);
    const [uploadFile, setUploadFile] = useState<File>();
    const [csvData, setCsvData] = useState<CsvData[]>([]);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const csvFile: File = e.target.files[0];
        setUploadFile(csvFile);
    }

    useEffect(()=>{
        csvData.forEach((e)=>{console.log(e)});
    }, [csvData])

    const handleUpload = () => {
        if (!uploadFile) {
            alert("CSVファイルが選択されていません");
            return;
        }

        Papa.parse(uploadFile, {
            header: true,
            complete: (results) => {
                const { data } = results;
                const parsedData: CsvData[] = data.map((row: any) => {
                    return({
                    column1: row.column1,
                    column2: row.column2,
                    column3: row.column3,
                    column4: row.column4,
                    column5: row.column5,
                    column6: parseFloat(row.column6),
                    column7: parseFloat(row.column7),
                })});
                const eliminatedData = parsedData.filter((e)=>{
                    return e.column1;
                })
                setCsvData(eliminatedData);
            },
            error: (error) => {
                console.error(error);
            },
        });

        handleClose();

    }

    return (
        <>
            <Button
                onClick={handleClickOpen}
            >
                CSVアップロード
            </Button>
            <Dialog
                open={open} onClose={handleClose}
            >
                <DialogTitle>CSVアップロード</DialogTitle>
                <DialogContent>
                    <input
                        name="uploadFile"
                        type="file"
                        onChange={handleFiles}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>閉じる</Button>
                    <Button onClick={handleUpload}>アップロード</Button>
                </DialogActions>

            </Dialog>
        </>
    )
}