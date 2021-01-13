import { createGlobalStyle } from 'styled-components'

// TODO convert to proper styled-components. spinner taken from https://tobiasahlin.com/spinkit/
const SpinnerStyles = createGlobalStyle`
.fullbeaker-spinner {
  display: inline-block;
  width: 3rem;
  height: 0.875rem;
  text-align: center;
  font-size: 10px;
}

.fullbeaker-spinner > div {
  background-color: #ffffff;
  height: 100%;
  width: 6px;
  margin: 0 2px;
  display: inline-block;
  -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
  animation: sk-stretchdelay 1.2s infinite ease-in-out;
}

.fullbeaker-spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}

.fullbeaker-spinner .rect3 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

.fullbeaker-spinner .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.fullbeaker-spinner .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

@-webkit-keyframes sk-stretchdelay {
  0%, 40%, 100% { -webkit-transform: scaleY(0.4) }
  20% { -webkit-transform: scaleY(1.0) }
}

@keyframes sk-stretchdelay {
  0%, 40%, 100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% {
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
}

`

type SpinnerProps = {
  isVisible?: boolean
}

export const Spinner: React.FC<SpinnerProps> = ({ isVisible = true }) => {
  if (!isVisible) return null

  return (
    <>
      <SpinnerStyles />
      <div className="fullbeaker-spinner">
        <div className="rect1" />
        <div className="rect2" />
        <div className="rect3" />
        <div className="rect4" />
      </div>
    </>
  )
}
