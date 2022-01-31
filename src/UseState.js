import React from "react";

const SECURITY_CODE = "paradigma"

function UseState({ name }) {
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    });

    const onConfirm = () => {
        setState({
            ...state,
            loading: false,
            confirmed: true
        })
    }

    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false,
        });
    }

    const onWrite = (event) => {
        setState({ ...state, value: event.target.value });
    }

    const onCheck = () => {
        setState({ ...state, loading: true })
    }

    const onDelete = () => {
        setState({
            ...state,
            deleted: true
        });
    }

    const onReset = () => {
        setState({
            ...state,
            confirmed: false,
            deleted: false,
            value: '',
            error: false
        });
    }
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
                    onChange={(event) => {
                        onWrite(event)
                    }}
                />
                <button onClick={() => onCheck()}>Comprobar</button>
            </div>
        );
    } else if (state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>¿Desea eliminar?</p>
                <button onClick={() => {
                    onDelete()
                }}>Sí, eliminar
                </button>
                <button onClick={() => {
                   onReset();
                }}>No.</button>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <h2>UseState eliminado con éxito</h2>
                <button onClick={() => {
                    onReset();
                }}>Volver</button>
            </React.Fragment>
        );
    }

}

export { UseState };