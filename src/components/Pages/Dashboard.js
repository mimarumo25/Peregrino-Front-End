import { Icon } from "@iconify/react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { url } from "../../helpers/auth-token";


export const Dashboard = () => {
    const [data, setSata] = useState({});
useEffect(() => {
    const cardardatos =async()=>{
        try {
            const { data } = await axios.get(`${url}totales`);
           setSata(data)
          } catch (error) {
            console.log(error);
          }
    }
    cardardatos();
}, []);
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-xl-3">
                        <div className="card bg-c-blue order-card">
                            <div className="card-block">
                                <b><h6 className="m-b-20 text-center">RECLUSOS REGISTRADOS</h6></b>
                                <h2 className="d-flex justify-content-around">
                                    <Icon icon="bi:file-person" width="50" />
                                    <span>{data.recluso}</span>
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-xl-3">
                        <div className="card bg-c-green order-card">
                            <div className="card-block">
                                <h6 className="m-b-20 text-center">TOTAL MATRICULAS</h6>
                                <h2 className="d-flex justify-content-around">
                                    <Icon icon="material-symbols:play-lesson" width="50" />
                                    <span> {data.matricula}</span>
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-xl-3">
                        <div className="card bg-c-yellow order-card">
                            <div className="card-block">
                                <h6 className="m-b-20 text-center">TOTAL SALIDAS</h6>
                                <h2 className="d-flex justify-content-around">
                                    <Icon icon="fluent:picture-in-picture-exit-24-regular" width="48" />
                                    <span>{data.salida}</span>
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-xl-3">
                        <div className="card bg-c-pink order-card">
                            <div className="card-block">
                                <h6 className="m-b-20 text-center">TOTAL GRADUADOS</h6>
                                <h2 className=" d-flex justify-content-around">
                                    <Icon icon="fa6-solid:user-graduate" width="50" />
                                    <span>{data.graduado}</span>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
