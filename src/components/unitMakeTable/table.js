import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./table.scss";
import Image from "next/image";
function UnitTable({ data }) {
  return data.length == 0 ? (
    <div className="loadingWrap">
      <Image src="/images/loading.png" width={100} height={100} />
      <p>Loadin...</p>
    </div>
  ) : (
    <TableContainer className="table-con" component={Paper}>
      <Table
        className="unitMake-t"
        sx={{ minWidth: 650 }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={`${item.name}${index}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UnitTable;
