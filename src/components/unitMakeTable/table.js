import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./table.scss";
import Image from "next/image";
import { Poppins } from "next/font/google";
import React, { useState } from "react";
import EditUnitModal from "../modal/editModal";
import axios from "axios";
import Swal from "sweetalert2";
import apiRouth from "@/utils/routes";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
function UnitTable({ data, refreshUnitData }) {
  const [dropdown, setDropdown] = useState(false);
  const [currentId, setCurrentId] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleToggleDrop = (id) => {
    setCurrentId(id);
    setDropdown(!dropdown);
  };
  const handleEdit = (item) => {
    setCurrentItem(item);
    handleOpen();
  };
  const handleDel = (id) => {
    Swal.fire({
      title: "Delete Unit Make",
      text: "Are you sure you want to delete unit make.",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiRouth.prodPath}/api/unitMake/${id}`)
          .then((res) => {
            console.log(res);
            refreshUnitData();
          })
          .catch((error) => console.log(error));
      }
    });
  };
  const handleEditUnit = async (itemObj) => {
    try {
      const res = await axios.patch(
        `${apiRouth.prodPath}/api/unitMake/${currentId}`,
        itemObj
      );
      console.log(res);
      handleClose();
      refreshUnitData();
    } catch (error) {
      console.log(error);
    }
  };
  return data.length == 0 ? (
    <div className="loadingWrap">
      <Image src="/images/loading.png" width={100} height={100} />
      <p>Loading...</p>
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
            <TableCell className={poppins.className} align="left">
              Name
            </TableCell>
            <TableCell className={poppins.className} align="left">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={`${item.name}${index}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell className={poppins.className}>{item.name}</TableCell>
              <TableCell className={poppins.className}>
                <Image
                  onClick={() => handleToggleDrop(item.id)}
                  src={"/images/edit.png"}
                  width={24}
                  height={24}
                  alt="Edit"
                />
                {dropdown && currentId == item.id ? (
                  <div className="dropdown">
                    <ul className={poppins.className}>
                      <li onClick={() => handleEdit(item)}>edit</li>
                      <li onClick={() => handleDel(item.id)}>delete</li>
                    </ul>
                  </div>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditUnitModal
        open={open}
        handleClose={handleClose}
        handleEditUnit={handleEditUnit}
        item={currentItem}
      />
    </TableContainer>
  );
}

export default UnitTable;
