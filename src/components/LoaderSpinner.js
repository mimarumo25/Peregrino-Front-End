import { TailSpin } from "react-loader-spinner"

export const LoaderSpinner = () => {
  return (
    <TailSpin
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{
            width: '100%',
            height: '200px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}
        wrapperClass=""
        visible={true}
    />
  )
}
