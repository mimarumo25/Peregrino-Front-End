import { Icon } from "@iconify/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getReclusoAll, searchReclusos } from "../store/slices/recluso/reclusoSlices";

export const Search = ({ term = '' }) => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const handleSearch = ( e ) => {
      setValue( e.target.value );
      if ( e.target.value <= 0 ) {
        dispatch( getReclusoAll() );
      }
  }

  const handleSubmit = ( e ) => {
    e.preventDefault();
    dispatch( searchReclusos( value ) );
  }

  return (
    <form style={{
        width: '320px',
        padding: '0 1rem'
    }} className="form" onSubmit={ handleSubmit }>
    <div className="input-group">
      <input
        type="search"
        className="form-control"
        onChange={ handleSearch }
        placeholder={`Buscar ${ term } por Cedula`}
        value={ value }
        aria-label="Buscar..."
        aria-describedby="search-addon"
      />
      <button className="input-group-text border-0" id="search-addon">
        <Icon icon="akar-icons:search" color="white" width="20" />
      </button>
    </div>
    </form>
  );
};
