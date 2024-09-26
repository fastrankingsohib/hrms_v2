import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateModules } from '../../redux/reducers/auth_slice';

function UserModule(props) {
    const [crudVisibility, setCrudVisibility] = useState(false);
    const dispatch = useDispatch()
    const [selectionCrud, setSelectionCrud] = useState({
        moduleName: props.name,
        moduleSelected: false,
        c: false,
        r: false,
        u: false,
        d: false
    });
    

    useEffect(() => {
        dispatch(updateModules(selectionCrud))
    }, [selectionCrud])
    return (
        <div className="flex">
            <div className="px-4 h-12 border flex gap-4 justify-between items-center mt-10 bg-gray-100">
                <label htmlFor={props.id} className="inline-block min-w-40">{props.name}</label>
                <input id={props.id} type="checkbox" 
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
                    <label htmlFor="Administrator_create">Create</label> 
                    <input id={`${props.id}-c`} type="checkbox" 
                        onChange={() => {
                            // hanldeState()
                            setSelectionCrud((cruds) => ({...cruds, c: !selectionCrud.c}))
                        }}
                    />
                </div>


                <div className="p-4 inline-flex items-center gap-4">
                    <label htmlFor="Administrator_read">Read</label> 
                    <input id={`${props.id}-r`} type="checkbox"
                        onChange={() => {
                            // hanldeState()
                            setSelectionCrud((cruds) => ({...cruds, r: !selectionCrud.r}))
                        }} 
                    />
                </div>

                
                <div className="p-4 inline-flex items-center gap-4">
                    <label htmlFor="Administrator_update">Update</label> 
                    <input id={`${props.id}-u`} type="checkbox" 
                        onChange={() => {
                            // hanldeState()
                            setSelectionCrud((cruds) => ({...cruds, u: !selectionCrud.u}))
                        }}
                    />
                </div>

                
                <div className="p-4 inline-flex items-center gap-4">
                    <label htmlFor="Administrator_delete">Delete</label> 
                    <input id={`${props.id}-d`} type="checkbox" 
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