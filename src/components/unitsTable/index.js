import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./unitsTable.scss";
import Image from "next/image";
import { Poppins } from "next/font/google";
import React, { useState } from "react";
import EditUnitModal from "../modal/editModal";
import axios from "axios";
import Swal from "sweetalert2";
import apiRouth from "@/utils/routes";
import EditClientModal from "../modal/editClientModal";
import EditUnitsModal from "../modal/editUnitsModal";
import UnitsInfoModal from "../modal/unitsInfoModal";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
function UnitsTable({ data, refresh, title }) {
  console.log(data);
  const [dropdown, setDropdown] = useState(false);
  const [currentId, setCurrentId] = useState(false);
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [currentItem, setCurrentItem] = useState("");
  const handleOpen = () => setOpen(true);
  const handleOpenInfo = (item) => {
    setCurrentItem(item);
    setOpenInfo(true);
  };
  const handleClose = () => setOpen(false);
  const handleCloseInfo = () => setOpenInfo(false);
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
      title: `Delete ${title}`,
      text: `Are you sure you want to delete ${title}.`,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiRouth.prodPath}/api/units/${id}`)
          .then((res) => {
            console.log(res);
            refresh();
          })
          .catch((error) => console.log(error));
      }
    });
  };
  const handleEditClient = async (itemObj) => {
    console.log(itemObj);
    try {
      const res = await axios.patch(
        `${apiRouth.prodPath}/api/${title}/${currentId}`,
        itemObj
      );
      console.log(res);
      handleClose();
      refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TableContainer className="table-con table-unit" component={Paper}>
      <Table
        className="unitMake-t"
        sx={{ minWidth: 650 }}
        aria-label="simple table"
        stickyHeader={true}
      >
        <TableHead>
          <TableRow>
            <TableCell className={poppins.className} align="left">
              Unit#
            </TableCell>
            <TableCell className={poppins.className} align="left">
              Unit Client
            </TableCell>
            <TableCell className={poppins.className} align="left">
              Unit Location
            </TableCell>
            <TableCell className={poppins.className} align="left">
              Unit Year
            </TableCell>
            <TableCell className={poppins.className} align="left">
              Unit Make
            </TableCell>
            <TableCell className={poppins.className} align="left">
              Unit Model
            </TableCell>
            <TableCell className={poppins.className} align="left">
              Branch
            </TableCell>
            <TableCell className={poppins.className} align="left">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .sort((a, b) => (a.clientName < b.clientName ? -1 : 1))
            .map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell className={poppins.className}>
                  {item.unitNumber}
                </TableCell>
                <TableCell className={poppins.className}>
                  {item.unitClient}
                </TableCell>
                <TableCell className={poppins.className}>
                  {item.unitLocation}
                </TableCell>
                <TableCell className={poppins.className}>
                  {item.unitYear}
                </TableCell>
                <TableCell className={poppins.className}>
                  {item.unitMake}
                </TableCell>
                <TableCell className={poppins.className}>
                  {item.unitModel}
                </TableCell>
                <TableCell className={poppins.className}>
                  {item.branch}
                </TableCell>
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
                        <li onClick={() => handleOpenInfo(item)}>Open Info</li>
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
      <EditUnitsModal
        open={open}
        handleClose={handleClose}
        handleEditClient={handleEditClient}
        item={currentItem}
        title={title}
      />
      <UnitsInfoModal
        open={openInfo}
        handleClose={handleCloseInfo}
        item={currentItem}
        refreshMain={refresh}
      />
    </TableContainer>
  );
}

export default UnitsTable;
