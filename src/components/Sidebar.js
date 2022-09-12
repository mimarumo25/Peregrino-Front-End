import React from 'react'
import { NavLink} from 'react-router-dom'
import { Icon } from '@iconify/react';
const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <NavLink  to="/"className="text-dark rounded py-2 w-100 d-inline-block p-2">
                    <Icon icon="clarity:dashboard-solid-badged" width="20" /> Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink  to="usuarios" className="text-dark rounded py-2 w-100 d-inline-block p-2" >
                    <Icon icon="bi:person-circle" width="20" /> Usuarios
                    </NavLink>
                </li>
                <li>
                    <NavLink  to="internos" className="text-dark rounded py-2 w-100 d-inline-block p-2" >
                    <Icon icon="bi:file-person" width="20" /> Internos
                    </NavLink>
                </li>
                <li>
                    <NavLink  to="programas" className="text-dark rounded py-2 w-100 d-inline-block p-2" >
                    <Icon icon="ic:baseline-class" width="20" /> Programas
                    </NavLink>
                </li>
                <li>
                    <NavLink  to="lecciones" className="text-dark rounded py-2 w-100 d-inline-block p-2" >
                    <Icon icon="material-symbols:play-lesson" width="20" /> Lecciones
                    </NavLink>
                </li>
                <li>
                    <NavLink  to="matriculas" className="text-dark rounded py-2 w-100 d-inline-block p-2" >
                    <Icon icon="material-symbols:play-lesson" width="20" /> Matricular
                    </NavLink>
                </li>
                <li>
                    <NavLink  to={"informes"} className="text-dark rounded py-2 w-100 d-inline-block p-2 ">
                    <Icon icon="carbon:report" width="20" /> Informes
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}
export default Sidebar