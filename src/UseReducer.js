import React  from "react";

const SECURITY_CODE = 'paradigma';

const actionTypes = {
    CONFIRM: 'CONFIRM',
    ERROR: 'ERROR',
    WRITE: 'WRITE',
    CHECK: 'CHECK',
    RESET: 'RESET',
    DELETE: 'DELETE'
}
const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
};


const reducerObject = (state, payload) => ({
    [actionTypes.ERROR]: {
        ...state,
                error: true,
                loading: false
    },
    [actionTypes.CHECK]:{ ...state, loading: true },
    [actionTypes.CONFIRM]:{
        ...state,
        loading: false,
        confirmed: true
    },
    [actionTypes.DELETE]:{
        ...state,
        deleted: true
    },
    [actionTypes.RESET]: {
        ...state,
        confirmed: false,
        deleted: false,
        value: '',
        error: false
    },
    [actionTypes.WRITE]:{
        ...state,
        value: payload
    }

});

const reducer = (state, action) => {
    if(reducerObject(state)[action.type]){
        return reducerObject(state, action.payload)[action.type];
    }else{
        return state;
    }
}

function UseReducer({ name }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const onConfirm = () => {
        dispatch({type: actionTypes.CONFIRM});
    }
    
    const onError = () => {
        dispatch({type: actionTypes.ERROR})
    }
    
    const onWrite = (event) => {
        dispatch({type: actionTypes.WRITE, payload: event.target.value})
    }
    
    const onCheck = () => {
        dispatch({type: actionTypes.CHECK})
    }
    
    const onDelete = () => {
        dispatch({type: actionTypes.DELETE})
    }
    
    const onReset = () => {
        dispatch({type: actionTypes.RESET})
    }
    
    /*
    const onWrite = (event) => {
        setState({ ...state, value: event.target.value });
    }
    */

    React.useEffect(() => {
        if (state.loading) {
            setTimeout(() => {
                if (state.value !== SECURITY_CODE) {
                    onError();
                } else {
                    onConfirm();
                }
            }, 3000);
        }
    }, [state.loading]);

if (!state.deleted && !state.confirmed) {
    return (
        <div>
            <h2>Eliminar {name}</h2>
            <p>Por favor escribe el código de seguridad</p>
            {(state.error && !state.loading) && (<p>El código es incorrecto</p>)}
            {state.loading && (<p>...cargando</p>)}
            <input placeholder="Código de seguridad"
                value={state.value}
                onChange={onWrite}
            />
            <button onClick={onCheck}>Comprobar</button>
        </div>
    );
} else if (state.confirmed && !state.deleted) {
    return (
        <React.Fragment>
            <p>¿Desea eliminar?</p>
            <button onClick={onDelete}>Sí, eliminar
            </button>
            <button onClick={onReset}>No.</button>
        </React.Fragment>
    )
} else {
    return (
        <React.Fragment>
            <h2>UseState eliminado con éxito</h2>
            <button onClick={onReset}>Volver</button>
        </React.Fragment>
    );
}

}


export {UseReducer};

//Forma básica
/*
const reducer = (state, action) => {
    if(action.type === 'ERROR'){
        return {
            ...state,
            error: true,
            loading: false
        }
    } else if(action.type === 'CHECK'){
        return {
            ...state,
            loading: true
        }
    }else{
        return {
            ... initialState
        }
    }
}
*/
/*
const reducer = (state, action) => {
    switch (action.type){
        case 'ERROR':
            return {
                ...state,
                error: true,
                loading: false
            }
        case 'CHECK':
            return {
                ...state,
                loading: true
            }
        default:
            return {
                ... initialState
            }

    }
}
*/