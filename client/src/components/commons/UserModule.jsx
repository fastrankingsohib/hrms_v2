import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateModules } from '../../redux/reducers/auth_slice';

function UserModule(props) {
    const [crudVisibility, setCrudVisibility] = useState(false);
    const dispatch = useDispatch()
    const [selectionCrud, setSelectionCrud] = useState({
        module_name: props.name || '',
        moduleSelected: props.checked,
        c: props.create || false,
        r: props.read || false,
        u: props.update || false,
        d: props.delete || false
    });

     console.log(`${props.name} ${props.checked}`)
    
    useEffect(() => {
        dispatch(updateModules(selectionCrud));
        console.log("called")
    }, [selectionCrud])
    return (
        <div className="flex select-none">
            <div className="px-4 h-12 border flex gap-4 justify-between items-center mt-10 bg-gray-100">
                <label htmlFor={props.id} className="inline-block min-w-40">{props.name} {props.checked}</label>
                <input id={props.id} type="checkbox"
                    checked={selectionCrud.moduleSelected} 
                    onChange={
                        (e) => {
                            // hanldeState()
                            setSelectionCrud((cruds) => ({...cruds, moduleSelected: !selectionCrud.moduleSelected}));
                        } 
                    }
                />
            </div>
            <div className="p-4 h-12 border flex gap-4 justify-between items-center mt-10 bg-white" style={{ display: selectionCrud.moduleSelected ? 'flex' : 'none' }}>
                <div className="p-4 inline-flex items-center gap-4">
                    <label htmlFor={`${props.id}-c`}>Create</label> 
                    <input id={`${props.id}-c`} type="checkbox" 
                        checked={selectionCrud.c} 
                        onChange={() => {
                            // hanldeState()
                            setSelectionCrud((cruds) => ({...cruds, c: !selectionCrud.c}))
                        }}
                    />
                </div>


                <div className="p-4 inline-flex items-center gap-4">
                    <label htmlFor={`${props.id}-r`}>Read</label> 
                    <input id={`${props.id}-r`} type="checkbox"
                        checked={selectionCrud.r}
                        onChange={() => {
                            // hanldeState()
                            setSelectionCrud((cruds) => ({...cruds, r: !selectionCrud.r}))
                        }} 
                    />
                </div>

                
                <div className="p-4 inline-flex items-center gap-4">
                    <label htmlFor={`${props.id}-u`}>Update</label> 
                    <input id={`${props.id}-u`} type="checkbox" 
                        checked={selectionCrud.u}
                        onChange={() => {
                            // hanldeState()
                            setSelectionCrud((cruds) => ({...cruds, u: !selectionCrud.u}))
                        }}
                    />
                </div>

                
                <div className="p-4 inline-flex items-center gap-4">
                    <label htmlFor={`${props.id}-d`}>Delete</label> 
                    <input id={`${props.id}-d`} type="checkbox"
                        checked={selectionCrud.d} 
                        onChange={() => {
                            // hanldeState()
                            setSelectionCrud((cruds) => ({...cruds, d: !selectionCrud.d}))
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default UserModule