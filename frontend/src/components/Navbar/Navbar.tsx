import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
} from "@mui/material";
import classes from "./Navbar.module.css";

interface NavbarProps {
  priorityFilter: number;
  setPriorityFilter: React.Dispatch<React.SetStateAction<number>>;
  titleSearch: string;
  setTitleSearch: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string | undefined;
  setSortBy: React.Dispatch<React.SetStateAction<string |undefined>>;
  order: string | undefined;
  setOrder: React.Dispatch<React.SetStateAction<string|undefined>>;
}

const Navbar: React.FC<NavbarProps> = ({
  priorityFilter,
  setPriorityFilter,
  titleSearch,
  setTitleSearch,
  sortBy,
  setSortBy,
  order,
  setOrder,
}) => {
  return (
    <div className={classes.navbar}>
      <TextField
        label="Search by Title"
        variant="standard"
        value={titleSearch}
        onChange={(event) => setTitleSearch(event.target.value)}
        style={{ marginRight: "10px" }}
      />

      <FormControl style={{ marginRight: "10px", width: "20%" }}>
        <InputLabel id="priority-label">Priority</InputLabel>
        <Select
          variant="standard"
          labelId="priority-label"
          value={priorityFilter}
          onChange={(event) => setPriorityFilter(event.target.value as number)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'low'}>Low</MenuItem>
          <MenuItem value={'high'}>High</MenuItem>
        </Select>
      </FormControl>

      <FormControl style={{ marginRight: "10px", width: "20%" }}>
        <InputLabel id="sort-by-label">Sort By</InputLabel>
        <Select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value as string)}
          displayEmpty
          label="Sort by"
          variant="standard"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="createdAt">Created At</MenuItem>
          <MenuItem value="priority">Priority</MenuItem>
          <MenuItem value="title">Title</MenuItem>
        </Select>
      </FormControl>

      <FormControl style={{ marginRight: "10px", width: "20%" }}>
        <InputLabel id="order-label">Order</InputLabel>
        <Select
          value={order}
          onChange={(event) => setOrder(event.target.value as string)}
          displayEmpty
          label="Order"
          variant="standard"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Navbar;
