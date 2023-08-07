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
import EditClientModal from "../modal/editClientModal";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
function ListTable({ data, refresh, title }) {
  console.log(data);
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
      title: `Delete ${title}`,
      text: `Are you sure you want to delete ${title}.`,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiRouth.prodPath}/api/${title}/${id}`)
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
    <TableContainer className="table-con" component={Paper}>
      <Table
        className="unitMake-t"
        sx={{ minWidth: 650 }}
        aria-label="simple table"
        stickyHeader={true}
      >
        <TableHead>
          <TableRow>
            <TableCell className={poppins.className} align="left">
              {title == "client" ? "Client Name" : "Vendor Name"}
            </TableCell>
            <TableCell className={poppins.className} align="left">
              {title == "client" ? "Client Type" : "Vendor Type"}
            </TableCell>
            <TableCell className={poppins.className} align="left">
              Email
            </TableCell>
            <TableCell className={poppins.className} align="left">
              Contact
            </TableCell>
            <TableCell className={poppins.className} align="left">
              Address
            </TableCell>
            <TableCell className={poppins.className} align="left">
              City
            </TableCell>
            <TableCell className={poppins.className} align="left">
              State
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
                  {title == "vendor" ? item.vendorName : item.clientName}
                </TableCell>
                <TableCell className={poppins.className}>
                  {title == "client" ? item.clientType : item.vendorType}
                </TableCell>
                <TableCell className={poppins.className}>
                  {item.mainEmail}
                </TableCell>
                <TableCell className={poppins.className}>
                  {item.mainContact}
                </TableCell>
                <TableCell className={poppins.className}>
                  {item.addressMain}
                </TableCell>
                <TableCell className={poppins.className}>{item.city}</TableCell>
                <TableCell className={poppins.className}>
                  {item.state}
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
      <EditClientModal
        open={open}
        handleClose={handleClose}
        handleEditClient={handleEditClient}
        item={currentItem}
        title={title}
      />
    </TableContainer>
  );
}

export default ListTable;
