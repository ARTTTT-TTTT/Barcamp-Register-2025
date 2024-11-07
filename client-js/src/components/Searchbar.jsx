import PropTypes from "prop-types"; // ต้องเพิ่มการใช้งาน PropTypes
import { InputAdornment, TextField, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Searchbar = ({ placeholder, onChange }) => {
    return (
        <Box>
            <TextField
                fullWidth
                color="secondary"
                placeholder={placeholder}
                onChange={onChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    style: {
                        backgroundColor: "white",
                        borderRadius: "2rem",
                        boxShadow: "5px 5px 10px #888888",
                        marginTop: "0.5rem",
                    },
                }}
            />
        </Box>
    );
};

// เพิ่ม PropTypes สำหรับการตรวจสอบ props
Searchbar.propTypes = {
    placeholder: PropTypes.string.isRequired, 
    onChange: PropTypes.func.isRequired, 
};

export default Searchbar;
