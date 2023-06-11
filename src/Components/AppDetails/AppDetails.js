import React from "react";
import TextField from "../../Common/View/TextField";
import Button from "../../Common/View/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './AppDetails.module.css';
import Grid from "@mui/material/Grid";


import IosSwitch from "../../Common/View/IosSwitch";
import Select from "../../Common/View/Select";

const AppDetails = ({appData, data, setAppData, currentPage, setIsNextDisabled, setDetailsTitle, detailsTitle, sectionData, setSectionData, pageData, setPageData}) =>{
    // const [detailsTitle,setDetailsTitle] = React.useState('');
    // const [pageData,setPageData] = React.useState(data?.fields);
    // const [sectionData,setSectionData] = React.useState(data?.sections ?? []);
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
        setAppData((preState)=>{
            let arr = preState;
            arr.splice(currentPage,1,{...preState[currentPage], fields:pageData, sections:sectionData, detailsTitle:detailsTitle, fieldType : event.target.value});
            console.log("log in app Details",[...arr]);
            return [...arr];
        })
    };

    const disableCheacker = () =>{
        let obj = { title : false, addField : false, addSection : false}
        if(!detailsTitle || appData.some((elm,index)=> appData.some((elm2,index2)=> (elm2?.detailsTitle === elm?.detailsTitle) && index2 !== index))) obj.title = true;
        if(
            pageData?.some((item)=>item[0] === '') ||
            pageData?.some((filed,index)=> ( pageData.some((filed2,index2) => filed2[0] === filed[0] && index !== index2)))
        ) obj.addField = true;
        if(
            sectionData?.some((item,i)=> item?.title === '' || sectionData?.some((item2,i2)=> (item2?.title === item?.title) && i !== i2) || item?.fields.some((field)=>field[0] === '')) ||
            sectionData?.some((filed,i)=>  sectionData[i]?.fields?.some((elm,i2)=> sectionData[i]?.fields?.some((elm2,i3)=> (elm2[0] === elm[0]) && i2 !== i3)))
        ) obj.addSection = true;
        if(Object.keys(obj).some((item)=> obj[item])) obj.allSomeDisabled = true; else obj.allSomeDisabled = false;
        return obj
    }

    React.useEffect(()=>{
        setAppData((preState)=>{
            let arr = preState;
            arr.splice(currentPage,1,{...preState[currentPage], fields:pageData, sections:sectionData, detailsTitle:detailsTitle, fieldType : 'string'});
            console.log("log in app Details",[...arr]);
            return [...arr];
        })
        if(
            disableCheacker().allSomeDisabled
        ){
            setIsNextDisabled(true);
        }else setIsNextDisabled(false);
    },[pageData,sectionData,detailsTitle]);

    React.useEffect(()=>{
        setPageData(()=>data?.fields);
        setSectionData(()=>data?.sections ?? []);
        setDetailsTitle(()=>data?.detailsTitle);
    },[currentPage,appData.length ]);

    return(
    <div className={styles.mainContainer}>

        <Grid container>
        <Grid
            xl={4} lg={4} md={6} sm={12} xs={12} item
        >
            <div className={styles.childObj}>
            <TextField
                label="1st Child Obj key"
                fullWidth
                disabled={!currentPage}
                value={detailsTitle}
                onChange={(e)=>setDetailsTitle((e.target.value).replace(' ',''))}
                error={appData.some((item,index)=> appData.some((item2,index2)=> (item?.detailsTitle === item2?.detailsTitle) && index2 !== index))}
                helperText={ appData.some((item,index)=> appData.some((item2,index2)=> (item?.detailsTitle === item2?.detailsTitle) && index2 !== index)) ? `Key  ${detailsTitle} is already Exist` : '' }
            />
            </div>
        </Grid>
        </Grid>
        {pageData?.map((item,index)=>(
            <Grid spacing={1} container sx={{display:'flex',alignItems:'flex-start', marginTop:'5px'}}>
                <Grid
                    className={styles.fieldsBox}
                    xl={4} lg={4} md={6} sm={12} xs={12} item
                >
                <TextField
                    label="Key"
                    fullWidth
                    value={item[0]}
                    disabled={!currentPage}
                    onChange={(e)=>setPageData((preState)=>{
                        let val = e.target.value?.replace(' ','');
                        let arr = preState;
                        arr.splice(index, 1, [val,preState[index][1],preState[index][2]]);
                        return [...arr];
                    })}
                    error={pageData.some((filed,i)=> (filed[0] === item[0]) && i !== index)}
                    helperText={ pageData.some((filed,i)=> (filed[0] === item[0]) && i !== index) ? `Key ${item[0]} is already Exist` : '' }
                />
                </Grid>
                <Grid
                    xl={4} lg={4} md={6} sm={12} xs={12} item
                >
                { pageData[index][2] === 'string' ?
                    <TextField
                    label="Value"
                    fullWidth
                    value={item[1]}
                    onChange={(e)=>setPageData((preState)=>{
                        let arr = preState;
                        arr.splice(index, 1, [preState[index][0],e.target.value,preState[index][2]]);
                        return [...arr];
                    })}
                /> :
                    pageData[index][2] === 'number' ?
                    <TextField
                        label="Value"
                        type="number"
                        // variant="standard"
                        fullWidth
                        value={item[1]}
                        onChange={(e)=>setPageData((preState)=>{
                            let val = parseInt((e.target.value).replace(/[^0-9]/g, ''));
                            let arr = preState;
                            arr.splice(index, 1, [preState[index][0],val,preState[index][2]]);
                            return [...arr];
                        })}
                    /> :
                <IosSwitch
                    checked={item[1]}
                    inputProps={{ 'aria-label': 'controlled' }}
                    onChange={(e)=>setPageData((preState)=>{
                        let arr = preState;
                        arr.splice(index, 1, [preState[index][0],e.target.checked,preState[index][2]]);
                        return [...arr];
                    })}
                />
                }
                </Grid>
                {currentPage > 0 && <Grid
                    xl={4} lg={4} md={6} sm={12} xs={12} item
                >
                <DeleteIcon
                    color='error'
                    onClick={()=>{
                        setPageData((preState)=>{
                            let arr = preState;
                            arr.splice(index,1);
                            return [...arr];
                        })
                    }}
                />
                </Grid>}
            </Grid>
        ))}

        <Grid container sx={{margin:'10px 0px 20px 0px'}}>
            <Grid
                xl={4} lg={4} md={6} sm={12} xs={12} item
            >
        <Button
            disabled={disableCheacker()?.addField || !currentPage}
            onClick={()=>setPageData((preState)=>([...preState,['',appData[currentPage]?.fieldType === "boolean" ? false : '',appData[currentPage]?.fieldType]]))}
        > Add field</Button>
            </Grid>
            <Grid
                xl={4} lg={4} md={6} sm={12} xs={12} item
            >
                <Select
                    value={appData[currentPage]?.fieldType}
                    label="Field Type"
                    onChange={handleChange}
                    options={[{value:'', optionTitle :"Field Type"},{value:'string', optionTitle :"String"},{value:'boolean', optionTitle :"Boolean"},{value:'number', optionTitle :"Number"}]}
                />
            </Grid>
        </Grid>

        {sectionData?.map((item,sectionIndex)=>(
            <div style={{borderRight:'2px solid #515989', margin : '10px 0px'}}>
                <div className={styles.sectionBox}>
                    <Grid container>
                        <Grid
                            xl={4} lg={4} md={6} sm={12} xs={12} item
                        >
                    <TextField
                        label='2nd Child object key'
                        fullWidth
                        value={item?.title}
                        onChange={(e)=>setSectionData((preState)=>{
                            let val = e.target.value?.replace(' ','')
                            let arr = preState;
                            arr.splice(sectionIndex, 1, {...preState[sectionIndex], title : val});
                            return [...arr];
                        })}
                        error={sectionData.some((filed,i)=> (filed?.title === item?.title) && i !== sectionIndex)}
                        helperText={sectionData.some((filed,i)=> (filed?.title === item?.title) && i !== sectionIndex) ? `Key ${item?.title} is already Exist` : '' }
                    />
                        </Grid>
                            <Grid
                                xl={4} lg={4} md={6} sm={12} xs={12} item
                                sx={{display:'flex',justifyContent:'flex-end'}}
                            >
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon color='error'/>}
                        onClick={()=>{
                            setSectionData((preState)=>{
                                let arr = preState;
                                arr.splice(sectionIndex,1);
                                return [...arr];
                            })
                        }}
                    >Delete Section</Button>
                            </Grid>
                    </Grid>
                </div>
                <div >
                    {item?.fields?.map((elm,fieldIndex)=>(
                        <Grid container sx={{display:'flex',alignItems:'flex-start', marginTop:'5px'}} spacing={1}>
                            <Grid
                                className={styles.fieldsBox}
                                xl={4} lg={4} md={6} sm={12} xs={12} item
                            >
                            <TextField
                                label='Key'
                                fullWidth
                                value={elm[0]}
                                onChange={(e)=>setSectionData((preState)=>{
                                    let val = e.target.value?.replace(' ','')
                                    let arr = preState;
                                    arr.splice(sectionIndex, 1, {
                                        ...preState[sectionIndex],
                                        fields : (()=>{
                                            let tempArr = preState[sectionIndex]?.fields;
                                            tempArr.splice(fieldIndex,1,[val,elm[1],elm[2]])
                                            // [...preState[sectionIndex],e.target.value,preState[sectionIndex][fieldIndex][1]]
                                            return [...tempArr]
                                        })()
                                    });
                                    return [...arr];
                                })}
                                error={item?.fields?.some((filed,i)=> (filed[0] === elm[0]) && i !== fieldIndex)}
                                helperText={item?.fields?.some((filed,i)=> (filed[0] === elm[0]) && i !== fieldIndex) ? `Key ${elm[0]} is already Exist` : '' }
                            />
                            </Grid>
                            <Grid
                                className={styles.fieldsBox}
                                xl={4} lg={4} md={6} sm={12} xs={12} item
                            >
                        { item?.fields[fieldIndex][2] === 'string' ?
                            <TextField
                                label='value'
                                fullWidth
                                value={elm[1]}
                                onChange={(e)=>setSectionData((preState)=>{
                                    let arr = preState;
                                    arr.splice(sectionIndex, 1, {
                                        ...preState[sectionIndex],
                                        fields : (()=>{
                                            let tempArr = preState[sectionIndex]?.fields;
                                            tempArr.splice(fieldIndex,1,[elm[0],e.target.value,elm[2]])
                                            return [...tempArr]
                                        })()
                                    });
                                    return [...arr];
                                })}
                            /> :
                            item?.fields[fieldIndex][2] === 'number' ?
                                <TextField
                                    label="Value"
                                    type="number"
                                    // variant="standard"
                                    fullWidth
                                    value={elm[1]}
                                    onChange={(e)=>setSectionData((preState)=>{
                                        let val = parseInt((e.target.value).replace(/[^0-9]/g, ''));
                                        let arr = preState;
                                        arr.splice(sectionIndex, 1, {
                                            ...preState[sectionIndex],
                                            fields : (()=>{
                                                let tempArr = preState[sectionIndex]?.fields;
                                                tempArr.splice(fieldIndex,1,[elm[0],val,elm[2]])
                                                return [...tempArr]
                                            })()
                                        });
                                        return [...arr];
                                    })}
                                /> :
                            <IosSwitch
                                checked={elm[1]}
                                inputProps={{ 'aria-label': 'controlled' }}
                                onChange={(e)=>setSectionData((preState)=>{
                                    let arr = preState;
                                    arr.splice(sectionIndex, 1, {
                                        ...preState[sectionIndex],
                                        fields : (()=>{
                                            let tempArr = preState[sectionIndex]?.fields;
                                            tempArr.splice(fieldIndex,1,[elm[0],e.target.checked,elm[2]])
                                            return [...tempArr]
                                        })()
                                    });
                                    return [...arr];
                                })}
                            />}
                            </Grid>
                            <Grid
                                className={styles.fieldsBox}
                                xl={4} lg={4} md={6} sm={12} xs={12} item
                            >
                            <DeleteIcon color='error' onClick={()=>{
                                setSectionData((preState)=>{
                                    let arr = preState;
                                    arr.splice(sectionIndex, 1, {
                                        ...preState[sectionIndex],
                                        fields : (()=>{
                                            let tempArr = preState[sectionIndex]?.fields;
                                            tempArr.splice(fieldIndex,1)
                                            return [...tempArr]
                                        })()
                                    });
                                    return [...arr];
                                })
                            }} />
                            </Grid>
                        </Grid>
                    ))}

                    <Grid container sx={{margin:'10px 0px 20px 0px'}}>
                        <Grid
                            xl={4} lg={4} md={6} sm={12} xs={12} item
                        >
                            <div className={styles.addFieldBtn}>
                                <Button
                                    disabled={
                                        sectionData[sectionIndex]?.fields?.some((item)=>item[0] === '') ||
                                        sectionData[sectionIndex]?.fields?.some((filed,i)=>  sectionData[sectionIndex]?.fields?.some((elm,index)=> (elm[0] === filed[0])  && i !== index))
                                    }
                                    onClick={()=>setSectionData((preState)=>{
                                        let arr = preState;
                                        arr.splice(sectionIndex, 1,
                                            {...item,
                                                fields: (()=>[...item?.fields,['',appData[currentPage]?.sections[sectionIndex]?.fieldType === "boolean" ? false : '',appData[currentPage]?.sections[sectionIndex]?.fieldType]])()
                                            })
                                        return[...arr];
                                    })}
                                > Add field</Button>
                            </div>
                        </Grid>
                        <Grid
                            xl={4} lg={4} md={6} sm={12} xs={12} item
                        >
                            <Select
                                label="Field Type"
                                value={appData[currentPage]?.sections[sectionIndex]?.fieldType}
                                onChange={(event)=>{
                                    setSectionData((preState)=>{
                                        let arr = preState;
                                        arr.splice(sectionIndex, 1,
                                            {...item,
                                                fieldType : event.target.value,
                                            })
                                        return[...arr];
                                    });
                                }}
                                options={[{value:'', optionTitle :"Field Type"},{value:'string', optionTitle :"String"},{value:'boolean', optionTitle :"Boolean"},{value:'number', optionTitle :"Number"}]}
                            />
                        </Grid>
                    </Grid>

                </div>
            </div>
        ))}
        <div className={styles.addSection}>
        <Button
            disabled={disableCheacker()?.addSection}
            onClick={()=>setSectionData((preState)=>([...preState,{title:'',fields:[['','','string']], fieldType: 'string'}]))}
        > Add Section</Button>
        </div>
    </div>
    )
}

export default AppDetails;