import { Button, Card, Form } from "react-bootstrap";
import { loginEmailPassword } from "../store/slices/userLogged";
import { Formik } from "formik";
import { useDispatch } from "react-redux";



const Login = () => {
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
          <div >
            <div className="d-flex justify-content-center mt-5">
              <Card style={{ width: "30rem", backgroundColor: "#EAEDED" }} >
                <Card.Body>
                  <div className="d-flex justify-content-center p-5">
                    <div className="shadow rounded">
                      <Card style={{ width: "25rem" }}>
                        <Card.Header className="bg-secundary text-dark">
                          <h1 className="text-center">LOGIN</h1>
                        </Card.Header>
                        <Card.Body>
                          <Form className="formlogin" onSubmit={handleSubmit}>
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label>Ingrese su usuario o email:</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Ingresa tu email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />

                              {touched.email && errors.email && (
                                <div className="text-danger">{errors.email}</div>
                              )}
                            </Form.Group>

                            <Form.Group
                              className="mb-3"
                              controlId="formBasicPassword"
                            >
                              <Form.Label>Ingrese su contraseña:</Form.Label>
                              <Form.Control
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </Form.Group>
                            <hr className="mt-4" />
                            <div className="d-grid gap-2 mt-3">
                              <Button variant="primary" type="submit">
                                Iniciar Sesión
                              </Button>
                            </div>
                          </Form>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        )}
      </Formik>

    </>
  );
};

export default Login;
