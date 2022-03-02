import Blockies from 'react-blockies';
import Jazzicon, {jsNumberForAddress} from 'react-jazzicon'

export const CustomBlockies = ({seed, scale}) => (
    <Blockies
      seed={seed}
      scale={scale || 3} 
      className="identicon" 
    />
)

export const JazzIcon = ({seed}) => {
  return(
    <Jazzicon
        diameter={40}
        seed={jsNumberForAddress(seed)}
    />
  )
}