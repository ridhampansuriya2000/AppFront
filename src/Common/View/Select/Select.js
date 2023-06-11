import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectFieldView = ({...props}) =>{
    return(
        <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-customized-select-label" sx={{color : '#bdbdbd'}}>Field Type</InputLabel>
            <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                {...props}
                sx={{
                    '& .MuiSelect-placeholder': {
                        color: 'red',
                    },
                }}
            >

                {props?.options?.map((item)=>(
                    <MenuItem
                        value={item.value}
                        sx={{'&.MuiMenuItem-root':{
                                color :'#000000'
                            }}}
                    >
                        {item.optionTitle}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default SelectFieldView;