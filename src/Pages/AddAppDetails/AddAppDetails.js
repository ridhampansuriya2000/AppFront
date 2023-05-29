import React from 'react';
import CustomForm from "../../Components/CustomForm";

const AddAppDetails = ({isEdit = false}) =>{

    return (
        <CustomForm isEdit={isEdit}/>
    )
}

export default AddAppDetails;
