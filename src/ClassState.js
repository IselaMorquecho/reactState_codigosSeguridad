import React from "react";
import { Loading } from "./Loading";

const SECURITY_CODE = "paradigma"

class ClassState extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: '',
            error:false,
            loading: false
        }
    }
    
    componentDidUpdate(){
        if(this.state.loading){
            setTimeout(()=>{
                if(this.state.value !== SECURITY_CODE){
                    this.setState({error: true, loading:false})
                }else{
                    this.setState({loading:false, error: false});
                }
                
            }, 3000);
        }
    }

    render(){

        return(
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor escribe el código de seguridad</p>
                {(this.state.error && !this.state.loading) && (<p>El código es incorrecto</p>)}
                {this.state.loading && <Loading/>}
                <input placeholder="Código de seguridad"
                    value= {this.state.value}
                    onChange={(event) => {
                        this.setState({value: event.target.value})
                    }}
                    />
                <button
                    onClick={()=> this.setState({loading:true})}
                >Comprobar</button>
            </div>
        );
    }
}

export{ClassState};