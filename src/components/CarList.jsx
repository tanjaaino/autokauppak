import { useEffect, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";
import {Snackbar} from "@mui/material";

export default function CarList(){

    //states
    const [cars, setCars]  = useState([]);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msgSnackbar, setMsgSnackbar] = useState("");

    // col defs for grid
    const [columnDefs, setColumnDefs] = useState([
        {field: "brand"},
        {field: "model"},
        {cellRenderer: (params) =>
                <Button
                    onClick={() => deleteCar(params)}
                    size="small"
                    color="error"
                >Delete</Button>
            , width: 120
        }
    ]);

    // useEffect
    useEffect(() => getCars(), [])  // fetch after the first rendering

    // functions
    // getCars
    const getCars = () => {
        fetch("https://carrestservice-carshop.rahtiapp.fi/cars")
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(responsedata =>{
            console.log(responsedata._embedded.cars);
            setCars(responsedata._embedded.cars);
        })
        .catch(error => console.error(error));
    }
    // deleteCar 
    const deleteCar = (params) => {
    console.log(params.data._links.car.href);
       if (window.confirm("Are you sure?")){
           fetch(params.data._links.car.href, { method: 'DELETE' })
           .then(response => {
                   if (response.ok) {
                       // snackbar viesti
                       setMsgSnackbar("The car was deleted successfully!")
                       setOpenSnackbar(true);
                       getCars(); // haetaan päivittynyt autotilanne tietokannasta 
                   } else {
                       setMsgSnackbar("Something goes wrong with deleting.")
                       setOpenSnackbar(true);
                   }
               })
            .catch(error => console.error(error))
       }
    }



    //return
    return (
        <>
            <div className="ag-theme-material" style={{ width: 700, height: 500 }}>
                <AgGridReact
                 rowData={cars}
                 columnDefs={columnDefs}
                 pagination={true}
                 paginationPageSize={10}
                >
                </AgGridReact>
            </div>
            <Snackbar
             open={openSnackbar}
             message={msgSnackbar}
             autoHideDuration={3000}
             onClose={()=>{
                setOpenSnackbar(false);
                setMsgSnackbar("")}}>
            </Snackbar>
            
        </>
    );
}