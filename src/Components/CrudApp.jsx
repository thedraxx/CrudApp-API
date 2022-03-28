import React, { useState } from 'react'
import { CrudForm } from './CrudForm';
import { CrudTable } from './CrudTable';


export const CrudApp = () => {
    const initialDb = [
        {
            id: 1,
            name: 'Seiya',
            constellation: 'Pegaso',
        },
        {
            id: 2,
            name: 'Shiryu',
            constellation: 'Dragon',
        },
        {
            id: 3,
            name: 'Hyoga',
            constellation: 'Cisne',
        },
        {
            id: 4,
            name: 'Shun',
            constellation: 'Andromeda',
        },
        {
            id: 5,
            name: 'Ikki',
            constellation: 'Fenix',
        },
    ];

    const [db, setDb] = useState(initialDb);

    const [dataToEdit, setDataToEdit] = useState(null)

    const createData = (data) => {
        data.id = Date.now();
        setDb([...db, data])
    }

    const updateData = (data) => {
        let NewData = db.map(el => el.id === data.id ? data : el);
        setDb(NewData);
    }

    const deleteData = (id) => {
        let isDelete = window.confirm(
            'Esta seguro de eliminar el registro?'
        );

        if (isDelete) {
            let newData = db.filter(el => el.id !== id);
            setDb(newData);
        }

        else {
            return;
        }
    }

    return (
        <>
            <h2>CrudApp</h2>
            <article className='grid-1-2'>
                
                <CrudForm
                    createData={createData}
                    updateData={updateData}
                    dataToEdit={dataToEdit}
                    setDataToEdit={setDataToEdit}
                />

                <CrudTable
                    data={db}
                    setDataToEdit={setDataToEdit}
                    deleteData={deleteData}
                />
            </article>
        </>
    )
}
