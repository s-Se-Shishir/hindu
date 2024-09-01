import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  // Rows object with fields you provided
  const rows = [
    {
      id: 101,
      user: "Shishir",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      email: "",
      address: "1 March",
      state: 785,
      category: "Approved",
      business: "Cash on Delivery",
      status: ""
    }
    // Add more rows as needed
  ];

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">User</TableCell>
            <TableCell className="tableCell">Image</TableCell>
            <TableCell className="tableCell">Email</TableCell>
            <TableCell className="tableCell">Address</TableCell>
            <TableCell className="tableCell">State</TableCell>
            <TableCell className="tableCell">Category</TableCell>
            <TableCell className="tableCell">Business</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">{row.user}</TableCell>
              <TableCell className="tableCell">
                <img src={row.img} alt="User" className="image" />
              </TableCell>
              <TableCell className="tableCell">{row.email}</TableCell>
              <TableCell className="tableCell">{row.address}</TableCell>
              <TableCell className="tableCell">{row.state}</TableCell>
              <TableCell className="tableCell">{row.category}</TableCell>
              <TableCell className="tableCell">{row.business}</TableCell>
              <TableCell className="tableCell">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
