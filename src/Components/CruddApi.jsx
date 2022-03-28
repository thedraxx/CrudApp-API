import React, { useEffect, useState } from 'react'
import { helpHttp } from '../helpers/helpHttp';
import { CrudForm } from './CrudForm';
import { CrudTable } from './CrudTable';
import { Message } from './Message';
import { Loader } from './Loader';



export const CruddApi = () => {
    // const initialDb = [
    //     {
    //         id: 1,
    //         name: 'Seiya',
    //         constellation: 'Pegaso',
    //     },
    //     {
    //         id: 2,
    //         name: 'Shiryu',
    //         constellation: 'Dragon',
    //     },
    //     {
    //         id: 3,
    //         name: 'Hyoga',
    //         constellation: 'Cisne',
    //     },
    //     {
    //         id: 4,
    //         name: 'Shun',
    //         constellation: 'Andromeda',
    //     },
    //     {
    //         id: 5,
    //         name: 'Ikki',
    //         constellation: 'Fenix',
    //     },
    // ];

    const [db, setDb] = useState(null);
    const [dataToEdit, setDataToEdit] = useState(null);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    let api = helpHttp();
    let url = "http://localhost:5000/santos";

    useEffect(() => {
        setLoading(true);
        api.get(url)
            .then((res) => {
                // console.log(res);
                if (!res.err) {
                    setDb(res);
                    setError(null);
                }
                else {
                    setDb(null);
                    setError(res);
                }
                setLoading(false);
            });
    }, [url]);

    const createData = (data) => {
        data.id = Date.now();

        let options = {
            body: data,
            headers: { "content-type": "application/json" },
        };

        api.post(url, options).then((res) => {
            console.log(res)
            if (!res.err) {
                setDb(...db, res)
            } else {
                setError(res)
            }
        });
    };

    const updateData = (data) => {
        let endpoint = `${url}/${data.id}`;

        data.id = Date.now();

        let options = {
            body: data,
            headers: { "content-type": "application/json" },
        };

        api.put(endpoint, options).then((res) => {
            console.log(res)
            if (!res.err) {
                let NewData = db.map(el => el.id === data.id ? data : el);
                setDb(NewData);
            } else {
                setError(res)
            }
        });
    }

    const deleteData = (id) => {
        let endpoint = `${url}/${id}`;
        let options = {
            headers: { "content-type": "application/json" },
        };

        api.del(endpoint,options).then((res) => {
            if (!res.err) {
                let newData = db.filter(el => el.id !== id);
                setDb(newData);
                
            } else {
                setError(res)
            }
        });

    }

    return (
        <>
            <h2>CrudApi</h2>
            <article className='grid-1-2'>

                <CrudForm
                    createData={createData}
                    updateData={updateData}
                    dataToEdit={dataToEdit}
                    setDataToEdit={setDataToEdit}
                />

                {loading && <Loader />}
                {error && <Message msg={`Error ${error.status}: ${error.statusText}`} bgColor="#DC3545" />}

                {db && <CrudTable
                    data={db}
                    setDataToEdit={setDataToEdit}
                    deleteData={deleteData}
                />}



            </article>
        </>
    )
}
