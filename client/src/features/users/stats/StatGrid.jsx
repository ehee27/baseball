import BattingAverage from './BattingAverage'
import OBP from './OBP'
import SLG from './SLG'
import OPS from './OPS'
import RBIs from './RBIs'
import Runs from './Runs'
import SBs from './SBs'
import AtBats from './AtBats'

const StatGrid = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-8 gap-1 rounded-md bg-black/40">
      <AtBats stats={stats} />
      <Runs stats={stats} />
      <RBIs stats={stats} />
      <SBs stats={stats} />
      <BattingAverage stats={stats} />
      <OBP stats={stats} />
      <SLG stats={stats} />
      <OPS stats={stats} />
    </div>
  )
}

export default StatGrid
