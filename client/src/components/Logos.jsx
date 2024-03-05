import NCAA from '../../public/assets/NCAA_logo.png'
import JUCO from '../../public/assets/njcaa.png'
import NAIA from '../../public/assets/naia.svg.png'

const logos = [{ logo: NCAA }, { logo: JUCO }, { logo: NAIA }]

const Logos = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {logos.map((item, i) => {
        return (
          <div
            className="flex justify-center items-center w-[100%] mt-5"
            key={i}
          >
            <img className="h-[200px] w-[200px]" src={item.logo}></img>
          </div>
        )
      })}
    </div>
  )
}

export default Logos
