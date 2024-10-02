import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchInvalidation_modules, updateModules } from '../../redux/reducers/auth_slice';

function UserModule(props) {
    const dispatch = useDispatch();
    const warnDefault = useSelector((state) => state.moduleSelection.invalid);

    const initialSelectionCrud = {
        module_name: props.name || '',
        moduleSelected: props.checked,
        c: props.create || false,
        r: props.read || false,
        u: props.update || false,
        d: props.delete || false
    };

    const [selectionCrud, setSelectionCrud] = useState(initialSelectionCrud);
    const [warningMessage, setWarningMessage] = useState(false);

    useEffect(() => {
        dispatch(switchInvalidation_modules({status: warningMessage, module: initialSelectionCrud.module_name}))
    }, [warningMessage])

    useEffect(() => {
        dispatch(updateModules(selectionCrud));
    }, [selectionCrud, dispatch]);

    const handleModuleChange = (e) => {
        const isChecked = e.target.checked;
        // dispatch(switchInvalidation_modules(warningMessage));


        // If the main module is checked, check if at least one internal option is selected
        if (isChecked) {
            setSelectionCrud({
                ...selectionCrud,
                moduleSelected: isChecked,
            });

            // Check for internal options
            if (!selectionCrud.c && !selectionCrud.r && !selectionCrud.u && !selectionCrud.d) {
                setWarningMessage(true);
            } else {
                setWarningMessage(false); // Clear warning if at least one option is selected
            }
        } else {
            // If the main module is unchecked, clear the selections and warning message
            setSelectionCrud({
                ...selectionCrud,
                moduleSelected: false,
                c: false,
                r: false,
                u: false,
                d: false
            });
            setWarningMessage(false); // Clear warning if module is unchecked;
        }
    };

    const handleInternalChange = (key) => {
        // dispatch(switchInvalidation_modules(warningMessage));


        setSelectionCrud((cruds) => {
            const updatedCrud = { ...cruds, [key]: !cruds[key] };

            // Check if at least one internal option is selected
            const hasInternalOptionSelected = updatedCrud.c || updatedCrud.r || updatedCrud.u || updatedCrud.d;
            if (!hasInternalOptionSelected) {
                setWarningMessage(true);
            } else {
                setWarningMessage(false);
            }

            return updatedCrud;
        });
    };

    return (
        <div className="flex select-none relative">
            {warningMessage && (
                <div className="text-red-500 absolute top-24 text-sm">{warningMessage == true ? "Please select at least one Operational Permission" : ''} for <strong className='text-sm'>{props.name}</strong></div>
            )}
            <div className="px-4 h-12 border flex gap-4 justify-between items-center mt-10 bg-gray-100">
                <label htmlFor={props.id} className="inline-block min-w-40">
                    {props.name} {props.checked}
                </label>
                <input
                    disabled={props.editable}
                    id={props.id}
                    type="checkbox"
                    checked={selectionCrud.moduleSelected}
                    onChange={handleModuleChange}
                />
            </div>
            <div
                className="p-4 h-12 border flex gap-4 justify-between items-center mt-10 bg-white"
                style={{ display: selectionCrud.moduleSelected ? 'flex' : 'none' }}
            >
                <div className="p-4 inline-flex items-center gap-4">
                    <label htmlFor={`${props.id}-c`}>Create</label>
                    <input
                        disabled={props.editable}
                        id={`${props.id}-c`}
                        type="checkbox"
                        checked={selectionCrud.c}
                        onChange={() => handleInternalChange('c')}
                    />
                </div>

                <div className="p-4 inline-flex items-center gap-4">
                    <label htmlFor={`${props.id}-r`}>Read</label>
                    <input
                        disabled={props.editable}
                        id={`${props.id}-r`}
                        type="checkbox"
                        checked={selectionCrud.r}
                        onChange={() => handleInternalChange('r')}
                    />
                </div>

                <div className="p-4 inline-flex items-center gap-4">
                    <label htmlFor={`${props.id}-u`}>Update</label>
                    <input
                        disabled={props.editable}
                        id={`${props.id}-u`}
                        type="checkbox"
                        checked={selectionCrud.u}
                        onChange={() => handleInternalChange('u')}
                    />
                </div>

                <div className="p-4 inline-flex items-center gap-4">
                    <label htmlFor={`${props.id}-d`}>Delete</label>
                    <input
                        disabled={props.editable}
                        id={`${props.id}-d`}
                        type="checkbox"
                        checked={selectionCrud.d}
                        onChange={() => handleInternalChange('d')}
                    />
                </div>
            </div>
        </div>
    );
}

export default UserModule;