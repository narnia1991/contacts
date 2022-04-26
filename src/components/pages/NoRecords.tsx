import { Paper } from "@mui/material";
import { FC } from "react";

const NoRecords: FC = () => (
  <Paper variant="outlined" className="my-4 mx-auto p-4 max-w-xl self-center">
    No Record/s Found
  </Paper>
);

export default NoRecords;
