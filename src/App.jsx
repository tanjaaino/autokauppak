
//import './App.css'

import { AppBar, Toolbar, Typography } from "@mui/material"
import CarList from "./components/CarList"

function App() {
 
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Car Shop
          </Typography>
        </Toolbar>
      </AppBar>
      <CarList />
    </>
  )
}

export default App
