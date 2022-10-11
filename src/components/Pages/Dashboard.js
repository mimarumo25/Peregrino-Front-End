import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";

export const Dashboard = () => {
    const { list: reclusos, total } = useSelector(store => store.reclusoList);
    const { list: matriculas } = useSelector((store) => store.matriculaList);
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-xl-3">
                        <div className="card bg-c-blue order-card">
                            <div className="card-block">
                                <h6 className="m-b-20">Reclusos Registrados</h6>
                                <h2 className="text-right"><Icon icon="bi:file-person" width="50" /> {reclusos.length}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 col-xl-3">
                        <div className="card bg-c-green order-card">
                            <div className="card-block">
                                <h5 className="m-b-20">Total Matriculas</h5>
                                <h2 className="text-right"><Icon icon="material-symbols:play-lesson" width="50" /> {matriculas.length}</h2>
                               
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 col-xl-3">
                        <div className="card bg-c-yellow order-card">
                            <div className="card-block">
                                <h6 className="m-b-20">Orders Received</h6>
                                <h2 className="text-right"><i className="fa fa-refresh f-left"></i><span>486</span></h2>
                                <p className="m-b-0">Completed Orders<span className="f-right">351</span></p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 col-xl-3">
                        <div className="card bg-c-pink order-card">
                            <div className="card-block">
                                <h6 className="m-b-20">Orders Received</h6>
                                <h2 className="text-right"><i className="fa fa-credit-card f-left"></i><span>486</span></h2>
                                <p className="m-b-0">Completed Orders<span className="f-right">351</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
