import { loginEmailPassword } from "../store/slices/userLogged";
import { Formik } from "formik";
import { useDispatch } from "react-redux";



export const Login = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(valores) => {
          let errores = {};

          if (!valores.email) {
            errores.email = "Por favor ingresa un email";
          }
          return errores;

          //Validación Password
        }}
        onSubmit={(valores, { resetForm }) => {
          dispatch(loginEmailPassword(valores.email, valores.password));
          resetForm()
        }}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          handleBlur,
        }) => (
          <div className="container w-75 mt-5 rounded shadow">
            <div className="row align-items-stretch">
              <div className="col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded">

              </div>
              <div className="col bg-white p-5 rounded-end">
                <div className="text-end">
                  <img
                    width='48'
                    src="https://previews.123rf.com/images/melpomen/melpomen1610/melpomen161000628/64984435-cursos-concepto-en-l%C3%ADnea-con-una-tableta-en-el-fondo-azul.jpg" alt="Logo" />
                </div>

                <h2 className="fw-bold text-center py-5">Bienvenido</h2>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                    <input type="email"
                      className="form-control"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.email && errors.email && (
                      <div className="text-danger">{errors.email}</div>
                    )}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" className="form-control"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      Iniciar Sesión
                    </button>
                  </div>

                  <div className="my-3">
                    <span><a href="#">Recuperar Password</a></span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default Login;